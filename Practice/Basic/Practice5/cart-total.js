function calculatePrice (total, products, promocode=null) {
    let word = '';
    let discount = '';
    if (promocode != null) {
        for (let ch of promocode) {
            if (isNaN(ch)) {
                word += ch;
            }
            else {
                discount += ch;
            }
        } 
    }

    discount = parseInt(discount);

    if (promocode != null && word === 'ДАРИМ') {
        total = total - discount < 0 ? 0 : total - discount;
    }
    if (products >= 10) {
        total = total * 0.95;
    }
    if (total > 50000) {
        total = 50000 + (total - 50000) * 0.8;
    }
    if (promocode != null && word === 'СКИДКА' && total >= 20000) {
        total = total * (1 - discount / 100);
    }
    return total;
}

console.log(calculatePrice(56600, 11));
console.log(calculatePrice(500, 5, 'ДАРИМ300'));
console.log(calculatePrice(500, 5, 'ДАРИМ700'));
console.log(calculatePrice(31000, 6, 'СКИДКА20'));
console.log(calculatePrice(123000, 13, 'СКИДКА10'));