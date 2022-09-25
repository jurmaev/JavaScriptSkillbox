function squareX(a, b, c){
    let d = b ** 2 - 4 * a * c;
    if(d < 0){
        return [];
    }
    else{
        if(d == 0){
            return [-b / (2 * a)]
        }
        let dRoot = Math.sqrt(d);
        return [(-b + dRoot) / (2 * a), (-b - dRoot) / (2 * a)];
    }
}