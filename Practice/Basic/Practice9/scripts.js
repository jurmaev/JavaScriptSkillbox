(() => {
    const maxTime = 60;
    let timeLeft = maxTime;
    let isPlaying;
    let cardOne, cardTwo;
    let timer;
    let disableCards;
    let matchedCards;
    let gameSize;

    const container = document.getElementById('card-game');
    const restartButton = document.createElement('button');

    restartButton.addEventListener('click', () => createCards(gameSize));

    let timeText;


    function initTimer() {
        if (timeLeft <= 0) {
            clearInterval(timer);
            restartButton.disabled = false;
            return;
        }
        timeLeft--;
        timeText.innerText = 'Время: ' + timeLeft;
    }

    function createCardGameForm() {
        const startGame = document.getElementById('start-game');
        const formWrapper = document.createElement('div');
        const form = document.createElement('form');
        const input = document.createElement('input');
        const button = document.createElement('button');
        const timer = document.createElement('div')

        timeText = timer;

        timer.id = 'timer';

        startGame.classList.add('form__wrapper');
        formWrapper.classList.add('form__wrapper');

        input.placeholder = 'Введите количество карточек';
        input.type = 'number';
        input.min = 2;
        input.max = 10;
        input.classList.add('input');

        restartButton.disabled = true;
        restartButton.textContent = 'Начать заново';
        restartButton.classList.add('button');

        button.disabled = true;
        button.textContent = 'Начать игру';
        button.classList.add('button');

        form.append(input);
        form.append(button);
        formWrapper.append(timer);
        formWrapper.append(restartButton);
        startGame.append(form);

        return {
            formWrapper,
            form,
            button,
            input
        };
    }

    function fyShuffle(arr) {
        let i = arr.length;
        while (--i > 0) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
        }
        return arr;
    }

    function generateArray(length) {
        const array = [];
        for (let i = 0; i < 2; i++) {
            for (let j = 1; j <= length / 2; j++) {
                array.push(j);
            }
        }
        return array;
    }

    function flipCard(e) {
        const clickedCard = e.target;
        if (!isPlaying) {
            isPlaying = true;
            timer = setInterval(initTimer, 1000);
        }
        if (clickedCard != cardOne && !disableCards && timeLeft > 0) {
            clickedCard.classList.add('card--open');
            clickedCard.textContent = clickedCard.id;
            if (!cardOne) {
                cardOne = clickedCard
                return;
            }
            disableCards = true;
            cardTwo = clickedCard;
            matchCards(cardOne, cardTwo);
        }

    }

    function matchCards(card1, card2) {
        if (card1.id === card2.id) {
            matchedCards++;
            if (matchedCards === gameSize ** 2 / 2) {
                setTimeout(() => {
                    restartButton.disabled = false;
                    clearInterval(timer);
                }, 1000);
                return;
            }
            cardOne.removeEventListener('click', flipCard);
            cardTwo.removeEventListener('click', flipCard);
            cardOne = cardTwo = '';
            disableCards = false
            return;
        }

        setTimeout(() => {
            card1.classList.remove('card--open');
            card1.textContent = '?';
            card2.classList.remove('card--open');
            card2.textContent = '?';
            cardOne = cardTwo = '';
            disableCards = false
        }, 500);
    }

    function createCards(size) {
        const wrapper = document.getElementById('cards-wrapper');
        wrapper.innerHTML = '';
        gameSize = size;
        matchedCards = 0;
        cardOne = cardTwo = '';
        disableCards = isPlaying = false;
        timeLeft = maxTime;
        clearInterval(timer);
        restartButton.disabled = true;
        timeText.innerText = 'Время: ' + timeLeft;


        const array = fyShuffle(generateArray(gameSize ** 2));

        let counter = 0;
        for (let i = 0; i < gameSize; i++) {
            const cardRow = document.createElement('div');
            cardRow.classList.add('card__row');
            for (let j = 0; j < gameSize; j++) {
                const card = document.createElement('div');
                card.textContent = '?';
                card.classList.add('card');
                card.addEventListener('click', flipCard);
                card.id = array[counter++];
                const wrapperSize = (500 / gameSize - 10).toString() + 'px';

                card.style.height = wrapperSize;
                card.style.width = wrapperSize;
                cardRow.append(card);
            }
            wrapper.append(cardRow);
        }
        console.log();
    }


    function createCardGame() {
        const cardGameForm = createCardGameForm();
        container.append(cardGameForm.formWrapper);
        createCards(4);

        cardGameForm.input.addEventListener('input', function () {
            cardGameForm.button.disabled = cardGameForm.input.value === '';
        })


        cardGameForm.form.addEventListener('submit', e => {
            e.preventDefault();

            if (!cardGameForm.input.value) {
                return;
            }

            const size = parseInt(cardGameForm.input.value);

            if (size % 2 != 0)
                size = 4;

            createCards(size);

            cardGameForm.input.value = '';
            cardGameForm.button.disabled = true;
        })
    }

    document.addEventListener('DOMContentLoaded', () => createCardGame())
})()