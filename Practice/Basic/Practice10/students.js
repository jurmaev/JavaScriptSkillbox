(() => {
    const students = [{ fullName: 'Беляев Артемий Максимович', name:'Беляев', surname:'Артемий', middleName:'Максимович', faculty: 'Программная инженерия', birthDate: new Date('11.03.2003'), studied: '2021' },
    { fullName: 'Иванов Иван Иванович', name:'Иванов', surname:'Иван', middleName:'Иванович', faculty: 'Прикладная информатика', birthDate: new Date('11.03.2000'), studied: '2021' },
    { fullName: 'Скороходов Олег Владимирович', name:'Скороходов', surname:'Олег', middleName:'Владимирович', faculty: 'Физика', birthDate: new Date('11.03.2001'), studied: '2022' }];
    const rusToEngHeadings = { 'ФИО': 'fullName', 'Факультет': 'faculty', 'Дата рождения и возраст': 'birthDate', 'Год обучения и номер курса': 'studied' }
    const tableContainer = document.getElementById('table');

    function createTable(students, container) {
        const headings = ['ФИО', 'Факультет', 'Дата рождения и возраст', 'Год обучения и номер курса'];
        container.innerHTML = '';

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');

        headings.forEach(heading => {
            const th = document.createElement('th');
            th.textContent = heading;
            th.scope = 'col';
            th.classList.add('mask');
            th.addEventListener('click', () => {
                const field = rusToEngHeadings[th.textContent];
                students.sort((a, b) => (a[field] > b[field]) ? 1 : -1);
                createTable(students, tableContainer);
            })
            tr.append(th);
        })

        for (const student of students) {
            const tr = document.createElement('tr');
            const fullName = `${student.name} ${student.surname} ${student.middleName}`;
            student.fullName = fullName;
            const faculty = student.faculty;
            const birthDate = `${student.birthDate.ddmmyyyy()} (${new Date().getFullYear() - student.birthDate.getFullYear()} лет)`
            const course = new Date().getFullYear() - Number(student.studied) + 1 > 4 && new Date().getMonth() >= 8? 'закончил' : `${new Date().getFullYear() - Number(student.studied) + 1} курс`
            const studied = `${student.studied} - ${Number(student.studied) + 4} (${course})`
            for (const property of [fullName, faculty, birthDate, studied]) {
                const td = document.createElement('td');
                td.textContent = property;
                tr.append(td);
            }
            tbody.append(tr);
        }

        table.classList.add('table', 'table-bordered', 'table-hover');
        thead.classList.add('thead-light');

        thead.append(tr);
        table.append(thead);
        table.append(tbody);

        container.append(table);
    }

    Date.prototype.ddmmyyyy = function () {
        var mm = this.getMonth() + 1;
        var dd = this.getDate();
        return [(dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        this.getFullYear()
        ].join('.');
    };

    function checkInputAndAddStudent() {
        const name = document.querySelector('[name="name"]').value.trim();
        const surname = document.querySelector('[name="surname"]').value.trim();
        const middleName = document.querySelector('[name="middleName"]').value.trim();
        const birthDate = new Date(document.querySelector('[name="birthDate"').value);
        const studied = Number(document.querySelector('[name="studied"').value.trim());
        const faculty = document.querySelector('[name="faculty"]').value.trim();

        const checkDate = new Date('01.01.1900');

        if (name === '')
            alert('Неправильно введено имя!');
        else if (surname === '')
            alert('Неправильно введена фамилия!');
        else if (middleName === '')
            alert('Неправильно введено отчество!');
        else if (birthDate <= checkDate || birthDate > new Date() || birthDate == 'Invalid Date')
            alert('Неправильно введена дата рождения!');
        else if (2000 > studied || studied > new Date().getFullYear())
            alert('Неправильно введен год начала обучения!');
        else if (faculty === '')
            alert('Неправильно введен факультет!');
        else {
            students.push({
                name: name,
                surname: surname,
                middleName: middleName,
                faculty: faculty,
                birthDate: birthDate,
                studied: studied
            })
            createTable(students, tableContainer);
            return true;
        }
    }

    function filterTable(input) {
        let result = students;
        if (input.id === 'fullName' || input.id === 'faculty')
            result = students.filter(student => student[input.id].toLowerCase().includes(input.value.toLowerCase()));
        else if (input.id === 'startedStudying' && input.value !== '')
            result = students.filter(student => student.studied === input.value);
        else if (input.id === 'finishedStudying' && input.value !== '')
            result = students.filter(student => Number(student.studied) + 4 === Number(input.value))
        createTable(result, tableContainer);
    }

    function addInputListeners() {
        const fullNameInp = document.getElementById('fullName');
        const facultyInp = document.getElementById('faculty');
        const startEdInp = document.getElementById('startedStudying');
        const finishedEdInp = document.getElementById('finishedStudying');

        fullNameInp.addEventListener('input', () => filterTable(fullNameInp));
        facultyInp.addEventListener('input', () => filterTable(facultyInp));
        startEdInp.addEventListener('input', () => filterTable(startEdInp));
        finishedEdInp.addEventListener('input', () => filterTable(finishedEdInp));
    }

    document.addEventListener('DOMContentLoaded', () => {

        createTable(students, tableContainer)
        const form = document.getElementById('form');
        form.addEventListener('submit', e => {
            e.preventDefault();
            if(checkInputAndAddStudent())
                form.reset()
        })
        addInputListeners();
    })
})();