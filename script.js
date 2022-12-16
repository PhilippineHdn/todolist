//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//FONCTIONS
const addTodo = (event) => {
    event.preventDefault(); // éviter le rechargement intempestif dans les formulaires
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    saveInLocalStorage(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = ""; // pour que le champs redevienne vide
}

const checkOrDeleteTask = (event) => {
    const item = event.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeTodoInLocalStorage(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        })
    }

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

const filterToDo = (event) => {
    const todoAll = todoList.childNodes;
    todoAll.forEach(function(todo){
        switch(event.target.value) {
            case "all" : 
                todo.style.display = 'flex';
                break;
            case "completed" :
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted" : 
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

const saveInLocalStorage = (todo) => {
    let todoAll;
    if (localStorage.getItem('todoAll') === null) {
        todoAll = [];
    } else {
        todoAll = JSON.parse(localStorage.getItem('todoAll'));
    }
    todoAll.push(todo);
    localStorage.setItem('todoAll', JSON.stringify(todoAll));
}

const displayTodoList = () => {
    let todoAll;
    if (localStorage.getItem('todoAll') === null) {
        todoAll = [];
    } else {
        todoAll = JSON.parse(localStorage.getItem('todoAll'));
    }
    todoAll.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}

const removeTodoInLocalStorage = (todo) => {
    let todoAll;
    if (localStorage.getItem('todoAll') === null) {
        todoAll = [];
    } else {
        todoAll = JSON.parse(localStorage.getItem('todoAll'));
    }
    const todoIndex = todo.children[0].innerText;
    todoAll.splice(todoAll.indexOf(todoIndex), 1);
    localStorage.setItem('todoAll', JSON.stringify(todoAll));
}


// CALL FUNCTIONS
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkOrDeleteTask);
filterOption.addEventListener('input', filterToDo);
document.addEventListener('DOMContentLoaded', displayTodoList);
