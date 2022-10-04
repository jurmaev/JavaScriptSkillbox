document.addEventListener('DOMContentLoaded', function () {
    let input = document.getElementById('input');
    let button = document.getElementById('button');
    let countdown = document.getElementById('countdown');

    let myCounter;

    button.addEventListener('click', timer);

    let seconds;

    function decreaseTimer() {
        if (seconds <= 0) {
            clearInterval(myCounter);
        } else {
            seconds = parseInt(countdown.textContent) - 1;
            countdown.textContent = seconds;
        }
    }

    function timer() {
        clearInterval(myCounter);
        seconds = parseInt(input.value);
        countdown.textContent = seconds;
        myCounter = setInterval(decreaseTimer, 1000);
    };
});