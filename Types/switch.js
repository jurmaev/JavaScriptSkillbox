let fruit = 'Apple';

switch (fruit){
    case 'Apple':
        console.log('It is apple');
        break;
    case 'Waterlmelon':
    case 'Strawberry':
        console.log('It is a berry, not a fruit');
        break;
    default:
        console.log('Unknown fruit');
        break;
}