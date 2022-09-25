let userName = 'arTemIy';
let userSurname = 'Belieav';
let newUserName = userName.substring(0, 1).toUpperCase() + userName.substring(1).toLowerCase();
let newUserSurname = userSurname.substring(0, 1).toUpperCase() + userSurname.substring(1).toLowerCase();

console.log(newUserName, newUserSurname);
userName === newUserName ? console.log('Имя не поменялось') : console.log('Имя поменялось');
userSurname === newUserSurname ? console.log('Фамилия не поменялась') : console.log('Фамилия поменялась');
