let roadMines =  [true, true, true, true, true, true, true, true, true, true];
let hits = 0;
let isStreak = false;

for (let mine in roadMines) {
    if(roadMines[parseInt(mine)] && hits === 0) {
        process.stdout.write('танк поврежден, ');
        isStreak = false;
        hits++;
    }
    else if (roadMines[parseInt(mine)] && hits === 1) {
        process.stdout.write('танк уничтожен');
        break;
    }

    if (!isStreak) {
        process.stdout.write(`танк переместился на ${parseInt(mine) + 1}, `);
        isStreak = true;
    }
    else {
        process.stdout.write(`${parseInt(mine) + 1}, `);
    }
}