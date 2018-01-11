/*
    Andor Saga
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

    if (v.a && v.a[0].code) {
        //console.log(v.a);
        v.a.forEach(answers => {
            console.log(answers);

            let textarea = createEl('textarea');
            textarea.className = "answer";
            textarea.innerHTML = answers.code;
            qContainer.appendChild(textarea);

            qContainer.appendChild(createEl('br'));

            CodeMirror.fromTextArea(textarea, {
                lineNumbers: true,
                readOnly: true
            });
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