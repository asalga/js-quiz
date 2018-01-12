/*
    Andor Saga
    Jan 2018
*/

import {createEl} from './utils.js';

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

            let ansContainer = $('<div>');
            // ansContainer.className = "answers";
            ansContainer.html(answer.note);

            qContainer.appendChild(ansContainer[0]);

            // Not all answer have code examples, so we only want to
            // add a textarea if needed.
            if (answer.code) {
                let textarea = $('<textarea>');
                textarea.addClass('answer');
                textarea.html(answer.code.join(''));

                qContainer.appendChild(textarea[0]);
                qContainer.appendChild($('<br/>')[0]);

                CodeMirror.fromTextArea(textarea[0], { lineNumbers: true, readOnly: true });
            }
        });
    }

    let showBtn = $('<a>');
    console.log(showBtn[0].className = 'show');
    showBtn.html('answer');
    showBtn.click(function(){
    });

    qContainer.appendChild(showBtn[0]);
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