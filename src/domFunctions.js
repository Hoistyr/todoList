import {format} from 'date-fns';
import * as toDo from './todoLogic.js'

const createIninitalPageStructure = () => {
    const content = document.querySelector('#content');
    
    const projectSideList = document.createElement('div');
    projectSideList.id = 'projectSideList';

    const todoList = document.createElement('div');
    todoList.id = 'todoList';
    
    const todoInformation = document.createElement('div');
    todoInformation.id='todoInformation';
    
    content.append(projectSideList, todoList, todoInformation);

    //Hidden project sidebar
    createProjectSideListStructure();
    
    //Todo list
    createTodoListStructure();
    
    //Todo information
    createTodoInformationStructure();
}

const createProjectSideListStructure = () => {
    const projectSideList = document.getElementById('projectSideList');
    
    const sideBarList = document.createElement('ul');
    sideBarList.id = 'sideBarList';
    projectSideList.appendChild(sideBarList);
    
    populateProjectSideList();
}

const populateProjectSideList = () => {
    //Will eventually take an array of projects and add them to the list
    const sideBarList = document.getElementById('sideBarList');
    
    const projectListAllToDos = document.createElement('h1');
    projectListAllToDos.id = 'projectListAllToDos';
    projectListAllToDos.classList.add('projectListText', 'projectListTitle', 'sideBarList');
    projectListAllToDos.textContent = `All ToDo's`;
    sideBarList.appendChild(projectListAllToDos);
    
    const projectListTitle = document.createElement('h1');
    projectListTitle.classList.add('projectListText', 'projectListTitle', 'sideBarList');
    projectListTitle.textContent = 'Projects';
    sideBarList.appendChild(projectListTitle);

    const projectList = document.createElement('ul');
    projectList.id = 'projectList';
    sideBarList.appendChild(projectList);

    populateProjectList();
}

const hideProjectSideList = () => {
    const projectSideList = document.getElementById('projectSideList');
    projectSideList.classList.remove('visibleSideBar');
    projectSideList.classList.add('hiddenSideBar');

    console.log('removeeventlistener')
    const hamburgerNavIcon = document.querySelector('.hamburgerNavIcon');
    hamburgerNavIcon.removeEventListener('click', hideProjectSideList);
    hamburgerNavIcon.addEventListener('click', revealProjectSideList);
}

const revealProjectSideList = () => {
    const projectSideList = document.getElementById('projectSideList');
    projectSideList.classList.remove('hiddenSideBar');
    projectSideList.classList.add('visibleSideBar');

    const hamburgerNavIcon = document.querySelector('.hamburgerNavIcon');
    hamburgerNavIcon.removeEventListener('click', revealProjectSideList);
    hamburgerNavIcon.addEventListener('click', hideProjectSideList);
}

//Builds the side project list using the allProjects array in todoLogic.js
const populateProjectList = () => {
    const projectList = document.querySelector('#projectList');
    
    
    
    toDo.allProjects.list.forEach((project) => {
        const sideBarProject = document.createElement('li');
        sideBarProject.classList.add('projectListItem');
        sideBarProject.textContent = `${project.projectName}`;
        projectList.appendChild(sideBarProject);
    })

    const newProjectButtonHolder = document.createElement('li');
    newProjectButtonHolder.id = 'newProjectButtonHolder';
    projectList.appendChild(newProjectButtonHolder);
    
    const newProjectButton = document.createElement('div');
    newProjectButton.id = 'newProjectButton';
    newProjectButton.innerHTML = `<p class='buttonText'>New Project</p>`;
    newProjectButtonHolder.appendChild(newProjectButton);

    newProjectButton.addEventListener('click', openNewProjectCreator);
}

const openNewProjectCreator = () => {
    const newProjectButtonHolder = document.getElementById('newProjectButtonHolder');
    const newProjectButton = document.getElementById('newProjectButton');
    newProjectButton.removeEventListener('click', openNewProjectCreator);
    newProjectButton.innerHTML = `<p class='buttonText'>Add Project</p>`;
    
    const newProjectCreator = document.createElement('div');
    newProjectCreator.id = 'newProjectCreator';
    newProjectCreator.innerHTML = `<input id='newProjectNameInput' value='Enter project name'></input>`
    newProjectButtonHolder.insertAdjacentElement('beforebegin', newProjectCreator);

    const newProjectNameInput = document.getElementById('newProjectNameInput');
    newProjectNameInput.addEventListener('focus', removeDefaultProjectInput);
    newProjectNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && (newProjectNameInput.value !== '' && newProjectNameInput.value !== 'Enter project name')) {
            addNewProject();
        }
        
        
    })
    newProjectButton.addEventListener('click', addNewProject);

}

const addNewProject = () => {
    const projectName = getNewProjectValue();
    console.log(projectName);
    let newProject = new toDo.project(projectName);
    console.log(newProject);
    toDo.projectList.addNew(newProject);
    
    resetNewProjectButton();
    populateProjectList();
    
    
    
}

const resetNewProjectButton = () => {
    
}

const removeDefaultProjectInput = () => {
    const newProjectNameInput = document.getElementById('newProjectNameInput');
    let inputText = newProjectNameInput.value;
    if (inputText === 'Enter project name') {
        console.log('clearing input');
        newProjectNameInput.value = ''
        newProjectNameInput.removeEventListener('focus', removeDefaultProjectInput);
    }
}

const getNewProjectValue = () => {
    console.log('made it');
    const newProjectNameInput = document.getElementById('newProjectNameInput');
    const projectName = newProjectNameInput.value;
    return projectName;
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

    hamburgerNavIcon.addEventListener('click', hideProjectSideList);
    
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
    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && (newTodoInput.value !== '' && newTodoInput.value !== 'Enter a new ToDo item')) {
            getNewTodoInputValue();
        }
        
        
    })

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

const getNewTodoInputValue = () => {
    console.log('made it');
    const newTodoInput = document.getElementById('newTodoInput');
    const toDoTitle = newTodoInput.value;
    console.log(toDoTitle);
    newTodoInput.value = '';
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