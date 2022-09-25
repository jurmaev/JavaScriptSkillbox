let days = Array.from({length: 31}, (_, i) => i + 1)
let weekdays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье']

function printDateAndWeekday(firstDay) {
    let weekday = weekdays.indexOf(firstDay);
    for (let day of days) {
        console.log(`${day} января, ${weekdays[(weekday++) % 7]}`);
    }
}

printDateAndWeekday('вторник');