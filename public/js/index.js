/*
    Andor Saga
    Jan 2018
*/

function createEl(tag) {
    return document.createElement(tag);
}

function addQuestion(container, v) {

    // Question container that holds the the question along
    // with the answer and code
    let qContainer = createEl('div');
    qContainer.className = "qContainer";
    container.appendChild(qContainer);

    let q = createEl('div');
    q.className = "question";
    q.innerHTML = v.q;
    qContainer.appendChild(q);

    //
    if (v.a) {
        // A question may have a number of answers
        v.a.forEach((answer, i) => {
            let ansContainer = createEl('div');
            // ansContainer.className = "answers";
            ansContainer.innerHTML = answer.note;

            qContainer.appendChild(ansContainer);

            // Not all answer have code examples, so we only want to
            // add a textarea if needed.
            if (answer.code) {
                let textarea = createEl('textarea');
                textarea.className = "answer";
                textarea.innerHTML = answer.code.join('');

                qContainer.appendChild(textarea);
                qContainer.appendChild(createEl('br'));

                CodeMirror.fromTextArea(textarea, { lineNumbers: true, readOnly: true });
            }
        });
    }

    let showBtn = createEl('a');
    showBtn.className = 'show';
    showBtn.innerHTML = 'show';
    showBtn.onclick = function() {};

    qContainer.appendChild(showBtn);
    container.appendChild(qContainer);
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