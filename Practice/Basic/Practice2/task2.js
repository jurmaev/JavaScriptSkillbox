let a = 13.890123;
let b = 2.891564;
let n = 2;

a = (a % 1).toFixed(n) * 10 ** n;
b = (b % 1).toFixed(n) * 10 ** n;

console.log(a ,b);

console.log(a > b);
console.log(a < b);
console.log(a >= b);
console.log(a <= b);
console.log(a === b);
console.log(a != b);