let x1 = 10;
let y1 = 2;

let x2 = -3;
let y2 = 3;

let cathetus1 = Math.abs(x1 - x2);
let cathetus2 = Math.abs(y1 - y2);
console.log(Math.sqrt(Math.pow(cathetus1, 2) + Math.pow(cathetus2, 2)));


let first = 0.1 + 0.2 + 0.033;
let second = 0.33334;
let precision = 3;
let firstNormalized = Math.round(Math.pow(10, precision) * first);
let secondNormalized = Math.round(Math.pow(10, precision) * second);
console.log('Исходные числа равны', first === second);
console.log('Числа равны', firstNormalized === secondNormalized);
console.log('Первое число больше', firstNormalized > secondNormalized);
console.log('Первое число меньше', firstNormalized < secondNormalized);


let n = -100;
let m = 350;

let range = Math.abs(m - n);
let numberInRange = Math.round(Math.random() * range);
let min = Math.min(n, m);
console.log(min + numberInRange);


precision = 3;
let number = 0x12f + .3 + .1;
console.log('Исходное число', number);
console.log('Целая часть', Math.floor(number));
console.log('Дробная часть', Math.round(number % 1 * Math.pow(10, precision)));