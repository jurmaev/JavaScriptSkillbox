function GetRandomNumber(n, m) {
    let rand = Math.round(Math.random() * (Math.max(n, m) - Math.min(n, m)));
    return rand + Math.min(n, m);
}

function GenerateRandomArray(n, m, count) {
    let array = [];
    for (let i = 0; i < count; i++) {
        array.push(GetRandomNumber(n, m));
    }
    return array;
}

console.log(GenerateRandomArray(50, 100, 50));