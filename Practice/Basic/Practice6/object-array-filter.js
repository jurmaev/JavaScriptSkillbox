let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Иван', surname: 'Васильев' },
    { name: 'Пётр', surname: 'Петров' },
];

function filter(objects, propertyName, propertyValue) {
    let filtered = [];
    for (let object of objects) {
        if (propertyName in object && Object.values(object).includes(propertyValue))
            filtered.push(object);
    }
    return filtered;
}


console.log(filter(objects, 'name', 'Иван'));