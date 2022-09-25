let roadMines =  [false, false, false, true, false, false, false, false, false, false] ;
let lives = 2;

for (let i = 0; i < roadMines.length; i++) { 
    if (roadMines[i]) {
        lives--; 
        if (lives === 1) {
            console.log(`танк поврежден, танк переместился на ${i+1}`);
        } 
        else if (lives === 0) {
            console.log(`танк переместился на ${i+1}, танк уничтожен`);
            break;
        } 
    }
    else {
        console.log(`танк переместился на ${i+1}`);
    }
}