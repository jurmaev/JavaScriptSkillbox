// export async function getTodoList(owner) {
//     const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
//     return await response.json();
// }

export let  STORAGE_KEY = '';

function updateStorage(tasks, storageKey) {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function getTasksFromStorage(storageKey) {
    return JSON.parse(window.localStorage.getItem(storageKey));
}

export function changeStorageKey(newKey) {
    STORAGE_KEY = newKey;
}

export function createTodoItem({ owner, name }) {
    const myTask = { name: name, done: false };
    console.log(STORAGE_KEY)
    const tasks = getTasksFromStorage(STORAGE_KEY) || [];
    tasks.push(myTask);
    updateStorage(tasks, STORAGE_KEY);
    return myTask;
}

export function switchTodoItemDone({ todoItem, element }) {
    const tasks = getTasksFromStorage(STORAGE_KEY);
    const index = tasks.findIndex(x => x.name === todoItem.name);
    tasks[index].done = !tasks[index].done;
    updateStorage(tasks, STORAGE_KEY);
}

export function deleteTodoItem({ element, todoItem }) {
    if (confirm('Вы уверены?')) {
        const tasks = getTasksFromStorage(STORAGE_KEY);
        tasks = tasks.filter(x => x.name != element.name);
        updateStorage(tasks, STORAGE_KEY);
        todoItem.item.remove();
    }
}