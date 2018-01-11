function createEl(tag) {
    return document.createElement(tag);
}

function populateDOM(json) {
    var el = document.getElementById('questions');

    json.questions.forEach((v, i, a) => {
        let div = createEl('div');
        div.className = "question";
        div.innerHTML = v.q;

        el.appendChild(div);
    });
}

var json = fetch('data/test.json')
    .then(resp => resp.json())
    .then(data => populateDOM(data));