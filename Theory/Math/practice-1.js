let entrances = 4;
let floors = 9;
let flatsPerFloor = 4;

let flatsPerEntrance = flatsPerFloor * floors;
console.log('Количество квартир в подъезде', flatsPerEntrance);

let flats = flatsPerEntrance * entrances;
console.log('Всего квартир', flats)


let vodka = 50;
let tomatoJuice = 120;
let lemonJuice = 10;
let tabasco = 1;
let worcester = 1;

let volume = 500;
let coeff = (vodka + tomatoJuice + lemonJuice + tabasco + worcester) / volume;
console.log(vodka * coeff);


let a = 3;
let b = 5;
let c = 10;

let d = b * b - 4 * a * c;
let dRoot = Math.sqrt(d);
console.log('x1 = ', (-b + dRoot) / (2 * a));
console.log('x2 = ', (-b - dRoot) / (2 * a));


let n = 10;

let current = 0;
let prev = 1;
let prevPrev = 1;

while(n-- > 0){
    prevPrev = prev;
    prev = current;
    current += prevPrev;
    console.log(current);
}