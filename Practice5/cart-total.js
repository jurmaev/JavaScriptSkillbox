function calculatePrice (total, products, promo=null) {
    let word = '';
    let number = '';
    if (promo != null) {
        for (let ch of promo) {
            if (isNaN(ch)) {
                word += ch;
            }
            else {
                number += ch;
            }
        } 
    }

    number = parseInt(number);

    if (promo != null && word === 'ДАРИМ') {
        return total - number < 0 ? 0 : total - number;
    }
    else if (products >= 10) {
        return total * 0.95;
    }
    else if (total > 50000) {
        return 50000 + (total - 50000) * 0.8;
    }
    else if (promo != null && word === 'СКИДКА' && total >= 20000) {
        return total * (1 - number);
    }
}

console.log(calculatePrice(500, 5, 'ДАРИМ300'));