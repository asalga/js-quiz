/*
    Andor Saga
*/

function createEl(tag) {
    return document.createElement(tag);
}

function addQuestion(container, v) {
    let qContainer = createEl('div');
    qContainer.className = "qContainer";

    let q = createEl('div');
    q.className = "question";
    q.innerHTML = v.q;

    let a = createEl('div');
    a.className = "answer";
    a.innerHTML = v.a;

    let showBtn = createEl('a');
    showBtn.className = 'show';
    showBtn.innerHTML = 'show';
    showBtn.onclick = function() {};

    qContainer.appendChild(q);
    qContainer.appendChild(showBtn);
    qContainer.appendChild(a);
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