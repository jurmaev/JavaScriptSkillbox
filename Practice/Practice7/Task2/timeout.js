document.addEventListener('DOMContentLoaded', function () {
    let input = document.getElementById('input');
    let text = document.getElementById('text');
    let myTimeout;

    input.addEventListener('input', typeText);

    function typeText() {
        clearTimeout(myTimeout);
        myTimeout = setTimeout(updateText, 300);
    }

    function updateText() {
        text.textContent = input.value;
    }
})