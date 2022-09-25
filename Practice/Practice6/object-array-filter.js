let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Иван', surname: 'Васильев' },
    { name: 'Пётр', surname: 'Петров' }
];

function filter(objects, propertyName, propertyValue) {
    let result = [];
    for (let object of objects) {
        if (propertyName in object && Object.values(object).includes(propertyValue))
            result.push(object);
    }
    return result;
}

let result = filter(objects, 'name', 'Иван');
console.log(result);