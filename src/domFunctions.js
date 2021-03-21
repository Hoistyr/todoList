import {format} from 'date-fns';

const createIninitalPageStructure = () => {
    const content = document.querySelector('#content');
    const todoList = document.createElement('div');
    todoList.id = 'todoList';
    const todoInformation = document.createElement('div');
    todoInformation.id='todoInformation';
    content.append(todoList, todoInformation);

    //Todo list
    createTodoListStructure();
    
    //Todo information
    createTodoInformationStructure();
}

const createTodoListStructure = () => {
    //Creates the divs
    const todoList = document.querySelector('#todoList');
    const todoListNav = document.createElement('div');
    todoListNav.id = 'todoListNav';
    
    const todoListTodosHolder = document.createElement('div');
    todoListTodosHolder.id = 'todoListTodosHolder';
    todoList.append(todoListNav, todoListTodosHolder);
    
    //Runs the functions that populate the divs
    populateTodoListNav();
    populateTodoListTodosHolder();
    populateTodoListTodosHolder();
    populateTodoListTodosHolder();
}

const populateTodoListNav = () => {
    const todoListNav = document.getElementById('todoListNav');
    
    const hamburgerNavIcon = document.createElement('img');
    hamburgerNavIcon.classList.add('hamburgerNavIcon');
    hamburgerNavIcon.src = '../src/images/icons/hamburgerNavIcon.svg'
    todoListNav.appendChild(hamburgerNavIcon);
    
    const todoListProjectName = document.createElement('h1');
    todoListProjectName.id = 'todoListProjectName';
    todoListProjectName.textContent = `All ToDo's`;
    todoListNav.appendChild(todoListProjectName);

    const newTodoInput = document.createElement('input');
    newTodoInput.id = 'newTodoInput';
    newTodoInput.type = 'search';
    newTodoInput.name = 'newTodoInput'
    newTodoInput.defaultValue = 'Enter a new ToDo item'
    todoListNav.appendChild(newTodoInput);

    newTodoInput.addEventListener('click', removeDefaultInput);

}

const removeDefaultInput = () => {
    const newTodoInput = document.getElementById('newTodoInput');
    let inputText = newTodoInput.value;
    if (inputText === 'Enter a new ToDo item') {
        console.log('clearing input');
        newTodoInput.value = ''
        newTodoInput.removeEventListener('click', removeDefaultInput);
    }
}

const populateTodoListTodosHolder = () => {
    //Eventually this will import from an array from todo logic and populate the task list based on that array
    
    const todoListTodosHolder = document.getElementById('todoListTodosHolder');
    
    const exampleTodo = document.createElement('div');
    exampleTodo.classList.add('todo');
    const todoText = document.createElement('p');
    todoText.classList.add('todoText');
    todoText.textContent = 'This is an example todo';
    exampleTodo.appendChild(todoText);

    const currentDate = format(new Date(), 'MM/dd/yyyy');
    console.log(currentDate);
    const dueDate = document.createElement('p');
    dueDate.classList.add('todoText', 'todoDueDate');
    dueDate.textContent = currentDate;
    exampleTodo.appendChild(dueDate);

    console.log('by remove x');
    const removeX = document.createElement('img');
    removeX.src = '../src/images/icons/removeX.svg';
    removeX.classList.add('removeX');
    exampleTodo.appendChild(removeX);

    todoListTodosHolder.appendChild(exampleTodo)
}



const createTodoInformationStructure = () => {
    const todoInformation = document.querySelector('#todoInformation');
    
}

export { createIninitalPageStructure }