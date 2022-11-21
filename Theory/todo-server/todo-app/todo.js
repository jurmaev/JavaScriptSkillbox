
import { createTodoApp } from '../todo-app/view.js';
import {
    getTodoList as getTodoListApi,
    createTodoItem as createTodoItemApi,
    switchTodoItemDone as switchTodoItemDoneApi,
    deleteTodoItem as deleteTodoItemApi
} from '../todo-app/api.js';
import {
    createTodoItem as createTodoItemLS,
    switchTodoItemDone as switchTodoItemDoneLS,
    deleteTodoItem as deleteTodoItemLS,
    changeStorageKey
} from '../todo-app/localStorage.js';

async function createTodoAppApi(owner) {
    const todoList = await getTodoListApi(owner);
    createTodoApp(document.getElementById('todo-app'), {
        title: 'Мои дела',
        owner,
        todoItemList: todoList,
        onCreateFormSubmit: createTodoItemApi,
        onDoneClick: switchTodoItemDoneApi,
        onDeleteClick: deleteTodoItemApi
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const methodBtn = document.getElementById('method');
    changeStorageKey(methodBtn.dataset.person);
    methodBtn.addEventListener('click', () => {
        if(methodBtn.dataset.method === 'localStorage') {
            createTodoAppApi(methodBtn.dataset.person);
            methodBtn.dataset.method = 'Api';
        }
        else if (methodBtn.dataset.method === 'Api') {
            createTodoApp(document.getElementById('todo-app'), {
                title: 'Мои дела',
                owner,
                todoItemList: todoList,
                onCreateFormSubmit: createTodoItemLS,
                onDoneClick: switchTodoItemDoneLS,
                onDeleteClick: deleteTodoItemLS
            });
        }
    })
}) 