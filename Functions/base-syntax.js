function printWeekday() {
    let dayIndex = new Date().getDay();
    let days = [
        'воскресенье', 
        'понедельник' , 
        'вторник',
        'среда',
        'четверг', 
        'пятница', 
        'суббота',
    ];

    console.log(`Сегодня ${days[dayIndex]}`);
}

printWeekday();


function functionName() {
    console.log('Вызвана функция');
}

functionName();

let functionVariable  = function () {
    console.log('вызвана функция из переменной');
}

functionVariable();