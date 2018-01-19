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

    // Not all questions are complete
    if (v.status === 'draft') { return; }

    // Question container that holds question along with answer and code
    let qContainer = $(`<div id=${v.id} class=qContainer>`);

    let idContainer = $(`<div class=questionID>${v.id}</a>`);
    qContainer.append(idContainer);

    container.append(qContainer);

    // question
    let q = $(`<div class=question>${v.q}</a>`)
    qContainer.append(q);

    let showStr = '[show]';
    let showBtn = $(`<a class=show>${showStr}</a>`)
        .click(function() {
            let text = $(this).html();

            // TODO: document!
            if (text === showStr) {
                $(this).siblings('.answer').show(100);
                $(this).html('[hide]');
            } else {
                $(this).siblings('.answer').hide(100);
                $(this).html('[show]');
            }
        });

    qContainer.append(showBtn);

    //
    if (v.a) {
        // A question may have a number of answers
        v.a.forEach((answer, i) => {

            let note = Array.isArray(answer.note) ? answer.note.join('') : answer.note;

            let ansContainer = $(`<div class=answer>${note}</div>`);
            qContainer.append(ansContainer);

            // Not all answer have code examples, so we only want to
            // add a textarea if needed.
            if (answer.code) {
                let textarea = $('<textarea class=answerCode>')
                    .html(answer.code.join('\n'));

                ansContainer.append(textarea, '<br/>');

                CodeMirror.fromTextArea(textarea[0], { lineNumbers: true, readOnly: true });
            }

            // Only after CodeMirror has finished its work, we can hide the code.     
            ansContainer.css({ 'display': 'none' });
        });
    }

    if (v.tags) {
        let str = v.tags.split(',').map(v => `#${v} `);
        let tags = $('<div>').addClass('tags').html(str);
        qContainer.append(tags);
    }

    if (v['see-also']) {
        let seeAlsoLinks = $('<div class=seeAlso>');
        qContainer.append(seeAlsoLinks);

        v['see-also'].split(',')
            .forEach((v) => {
                let a = $(`<a href=#${v}>${v}</a>`);
                seeAlsoLinks.append(a);
            });
    }

    container.append(qContainer);
}

function populateDOM(json) {
    var questionsDiv = document.getElementById('questions');

    json.questions.forEach((v, i, arr) => {
        addQuestion(questionsDiv, v);
    });
}

var json = fetch('data/test.json')
    .then(resp => resp.json())
    .then(data => populateDOM(data));