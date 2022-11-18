(function () {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.disabled = true;
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(task) {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        if (task.done) {
            item.classList.add('list-group-item-success')
        }
        item.textContent = task.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    function updateStorage(tasks, storageKey) {
        window.localStorage.setItem(storageKey, JSON.stringify(tasks));
    }

    function getTasksFromStorage(storageKey) {
        return JSON.parse(window.localStorage.getItem(storageKey));
    }

    function addListenersToItem(todoItem, storageKey) {
        let task = { name: todoItem.item.firstChild.textContent, done: todoItem.item.classList.contains('list-group-item-success') };

        todoItem.doneButton.addEventListener('click', function () {
            let tasks = getTasksFromStorage(storageKey);
            let index = tasks.findIndex(x => x.name === task.name);
            todoItem.item.classList.toggle('list-group-item-success');
            console.log(tasks);
            tasks[index].done = todoItem.item.classList.contains('list-group-item-success');
            console.log(tasks);
            updateStorage(tasks, storageKey);
        });

        todoItem.deleteButton.addEventListener('click', function () {
            if (confirm('Вы уверены?')) {
                let tasks = getTasksFromStorage(storageKey);
                tasks = tasks.filter(x => x.name != task.name);
                updateStorage(tasks, storageKey);
                todoItem.item.remove();
            }
        });
    }

    function createTodoApp(container, title = 'Список дел', tasks, storageKey) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        if (tasks != null) {
            for (let task of tasks) {
                let todoItem = createTodoItem(task);
                todoList.append(todoItem.item);
                addListenersToItem(todoItem, storageKey);
            }
        } else {
            tasks = [];
        }

        todoItemForm.input.addEventListener('input', function () {
            todoItemForm.button.disabled = todoItemForm.input.value === '';
        })

        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }

            let myTask = { name: todoItemForm.input.value, done: false };
            let todoItem = createTodoItem(myTask);

            addListenersToItem(todoItem, storageKey);

            todoList.append(todoItem.item);
            tasks.push(myTask);
            updateStorage(tasks, storageKey);

            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true;
        })
    }

    window.createTodoApp = createTodoApp;
})();