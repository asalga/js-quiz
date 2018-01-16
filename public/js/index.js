/*
    Andor Saga
    Jan 2018
*/

/*
    container
    value
*/
function addQuestion(c, v) {
    let container = $(c);

    // Question container that holds the the question along
    // with the answer and code
    let qContainer = $('<div>').addClass('qContainer');

    let idContainer = $('<div>').html(v.id).addClass('questionID');
    qContainer.append(idContainer);

    container.append(qContainer);
    qContainer.attr('id', v.id);

    // question
    let q = $('<div>').addClass('question').html(v.q);
    qContainer.append(q);

    //
    if (v.a) {
        // A question may have a number of answers
        v.a.forEach((answer, i) => {

            // 
            let note = Array.isArray(answer.note) ? answer.note.join('') : answer.note;

            let ansContainer = $('<div>')
                .addClass('answer')
                .html(note);

            qContainer.append(ansContainer);

            // Not all answer have code examples, so we only want to
            // add a textarea if needed.
            if (answer.code) {
                let textarea = $('<textarea>')
                    .addClass('answerCode')
                    .html(answer.code.join('\n'));

                ansContainer.append(textarea);
                ansContainer.append($('<br/>'));

                // ansContainer.css({ 'visibility': 'hidden' })
                // ansContainer.css({'display': 'none'});

                CodeMirror.fromTextArea(textarea[0], { lineNumbers: true, readOnly: true });
            }
        });
    }

    let showBtn = $('<a>')
        .addClass('show')
        .html('show')
        .click(function() {
            let text = $(this).html();

            if (text === 'show') {
                $(this).siblings('.answer').css({ 'display': 'block' });
                $(this).html('hide');
            } else {
                $(this).siblings('.answer').css({ 'display': 'none' });
                $(this).html('show');
            }

        });

    qContainer.append(showBtn);
    container.append(qContainer);
}

function populateDOM(json) {
    var questionsDiv = document.getElementById('questions');

    json.questions.forEach((v, i, arr) => {
        addQuestion(questionsDiv, v);
    });

    // TODO: fix
    $('.answer').css({ 'display': 'none' });
}

var json = fetch('data/test.json')
    .then(resp => resp.json())
    .then(data => populateDOM(data));