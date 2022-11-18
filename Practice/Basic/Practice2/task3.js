function GetRandomNumber(n, m) {
    let rand = Math.round(Math.random() * (Math.max(n, m) - Math.min(n, m)));
    console.log(rand + Math.min(n, m));
}

GetRandomNumber(-5, 100);