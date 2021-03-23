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
    // ! Will eventually take an array of projects and add them to the list
    const sideBarList = document.getElementById('sideBarList');
    
    const projectListAllToDos = document.createElement('h1');
    projectListAllToDos.id = 'projectListAllToDos';
    projectListAllToDos.classList.add('projectListText', 'projectListTitle', 'sideBarList', 'viewingContent');
    projectListAllToDos.textContent = `All ToDo's`;
    sideBarList.appendChild(projectListAllToDos);
    
    const projectListTitle = document.createElement('h1');
    projectListTitle.id = 'projectsListTitle'
    projectListTitle.classList.add('projectListText', 'projectListTitle', 'sideBarList');
    projectListTitle.textContent = '> Projects';
    sideBarList.appendChild(projectListTitle);

    projectListTitle.addEventListener('click', showProjectList);

    const projectList = document.createElement('ul');
    projectList.id = 'projectList';
    projectList.classList.add('hidden');
    sideBarList.appendChild(projectList);

    populateProjectList();
}

//Logic for hiding or showing the sidebar
    //Shows the sidebar
const hideProjectSideList = () => {
    const projectSideList = document.getElementById('projectSideList');
    projectSideList.classList.remove('visibleSideBar');
    projectSideList.classList.add('hiddenSideBar');

    console.log('removeeventlistener')
    const hamburgerNavIcon = document.querySelector('.hamburgerNavIcon');
    hamburgerNavIcon.removeEventListener('click', hideProjectSideList);
    hamburgerNavIcon.addEventListener('click', revealProjectSideList);
}
    //Hides the sidebar
const revealProjectSideList = () => {
    const projectSideList = document.getElementById('projectSideList');
    projectSideList.classList.remove('hiddenSideBar');
    projectSideList.classList.add('visibleSideBar');

    const hamburgerNavIcon = document.querySelector('.hamburgerNavIcon');
    hamburgerNavIcon.removeEventListener('click', revealProjectSideList);
    hamburgerNavIcon.addEventListener('click', hideProjectSideList);
}

//Logic for hiding or showing the projectList
    //Hides the projectList
const hideProjectList = () => {
    const projectList = document.getElementById('projectList');
    projectList.classList.add('hidden');
    
    const projectsListTitle = document.getElementById('projectsListTitle');
    projectsListTitle.textContent = '> Projects'
    projectsListTitle.removeEventListener('click', hideProjectList);
    projectsListTitle.addEventListener('click', showProjectList);
    
}
    //Shows the projectList
const showProjectList = () => {
    const projectList = document.getElementById('projectList');
    projectList.classList.remove('hidden');

    const projectsListTitle = document.getElementById('projectsListTitle');
    projectsListTitle.textContent = 'V Projects';
    projectsListTitle.addEventListener('click', hideProjectList);
}



//Builds the side project list using the allProjects array in todoLogic.js
const populateProjectList = () => {
    const projectList = document.querySelector('#projectList');
    
    //Gets the list of allProjects from todoLogic and creates the sidebar list from that
    toDo.allProjects.list.forEach((project) => {
        const sideBarProject = document.createElement('li');
        sideBarProject.classList.add('projectListItem');
        sideBarProject.id = `${project.projectName}`
        sideBarProject.textContent = `${project.projectName}`;
        projectList.appendChild(sideBarProject);

        sideBarProject.addEventListener('click', viewProject.bind());
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

//Creates the structure in the sidebar to add a new project
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

//Creates and new project and adds it to the sidebar and toDoLogic allProjects list
const addNewProject = () => {
    const projectName = getNewProjectValue();
    console.log(projectName);
    let newProject = new toDo.project(projectName);
    console.log(newProject);
    toDo.projectList.addNew(newProject);
    refreshProjectList();
    populateProjectList(); 
}

//Removes all the list items in projectList
const refreshProjectList = () => {
    const projectList = document.getElementById('projectList');
    removeAllChildNodes(projectList);
}

//Removes all the childNodes of an element
const removeAllChildNodes = (parent) => {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//Removes the prompt text from the project input
const removeDefaultProjectInput = () => {
    const newProjectNameInput = document.getElementById('newProjectNameInput');
    let inputText = newProjectNameInput.value;
    if (inputText === 'Enter project name') {
        console.log('clearing input');
        newProjectNameInput.value = ''
        newProjectNameInput.removeEventListener('focus', removeDefaultProjectInput);
    }
}

//Collects the name of the new project
const getNewProjectValue = () => {
    console.log('made it');
    const newProjectNameInput = document.getElementById('newProjectNameInput');
    const projectName = newProjectNameInput.value;
    return projectName;
}

const viewProject = (projectClicked) => {
    const projectDiv = projectClicked.target;
    console.log(projectDiv.id);
    
    
    resetViewingContent();
    changeViewingContent(projectDiv);
    updateToDoNavProjectName();
    populateProjectToDoList(projectDiv.id);
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
    viewAllTodos();
}

//Creates the elements of the todoListNav
const populateTodoListNav = () => {
    const todoListNav = document.getElementById('todoListNav');
    
    const hamburgerNavIcon = document.createElement('img');
    hamburgerNavIcon.classList.add('hamburgerNavIcon');
    hamburgerNavIcon.src = '../src/images/icons/hamburgerNavIcon.svg'
    todoListNav.appendChild(hamburgerNavIcon);

    hamburgerNavIcon.addEventListener('click', hideProjectSideList);
    
    const todoListProjectName = document.createElement('h1');
    todoListProjectName.id = 'todoListProjectName';
    
    const currentSideBarSelection = document.querySelector('.viewingContent').textContent;

    todoListProjectName.textContent = currentSideBarSelection;
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

//Removes the viewingContent class from all sidebar projects
const resetViewingContent = () => {
    if (document.querySelector('.viewingContent')) {
        const currentSideBarSelection = document.querySelector('.viewingContent');
        currentSideBarSelection.classList.remove('viewingContent');
    }
    
}

//Adds the viewingContent class to the clicked project
const changeViewingContent = (projectToView) => {
    projectToView.classList.add('viewingContent');
}

//Changes the name of the project in the todoListNav
const updateToDoNavProjectName = () => {
    const todoListProjectName = document.getElementById('todoListProjectName');
    const currentSideBarSelection = document.querySelector('.viewingContent').textContent;
    todoListProjectName.textContent = currentSideBarSelection;
}

//
const updateToDoNavInput = () => {
    const newTodoInput = document.getElementById('newTodoInput');
    
    newTodoInput.defaultValue
}

//Removes the default text in the new task input
const removeDefaultInput = () => {
    const newTodoInput = document.getElementById('newTodoInput');
    let inputText = newTodoInput.value;
    if (inputText === 'Enter a new ToDo item') {
        console.log('clearing input');
        newTodoInput.value = ''
        newTodoInput.removeEventListener('click', removeDefaultInput);
    }
}

//Collects the value of the new todo item
const getNewTodoInputValue = () => {
    console.log('made it');
    const newTodoInput = document.getElementById('newTodoInput');
    const toDoTitle = newTodoInput.value;
    console.log(toDoTitle);
    newTodoInput.value = '';
}

//
const viewAllTodos = () => {
    const todoListTodosHolder = document.getElementById('todoListTodosHolder');
    toDo.allProjects.list.forEach((project) => {
        buildToDoList(project);

        const toDoListProjectDiv = document.querySelector(`#${project.projectName}Div`)
        const projectDivName = document.createElement('p');
        projectDivName.textContent = `${project.projectName}`;
        projectDivName.classList.add('projectDivName');
        toDoListProjectDiv.appendChild(projectDivName);
        toDoListProjectDiv.insertAdjacentElement('beforebegin', projectDivName);
    })   
}

const populateProjectToDoList = (projectName) => {
    const todoListTodosHolder = document.querySelector('#todoListTodosHolder');
    removeAllChildNodes(todoListTodosHolder);
    
    let projectArray = toDo.allProjects.list.filter((project) => project.projectName === projectName);
    projectArray.forEach((project) => buildToDoList(project)) 
}

const buildToDoList = (project) => {
    console.log('in buildToDoList');
    const todoListTodosHolder = document.querySelector('#todoListTodosHolder');
    const toDoListProjectDiv = document.createElement('div');
    toDoListProjectDiv.id = `${project.projectName}Div`;
    todoListTodosHolder.appendChild(toDoListProjectDiv);
    
    const currentToDoList = document.createElement('div');
    currentToDoList.id = `${project.projectName}ToDoList`
    toDoListProjectDiv.appendChild(currentToDoList);
    
    project.toDoList.forEach((task) => buildTodoItem(task, project)); 
}

const buildTodoItem = (task, project) => {
    const currentToDoList = document.querySelector(`#${project.projectName}Div`);
    
    const currentTodo = document.createElement('div');
    currentTodo.classList.add('todo');
    const todoText = document.createElement('p');
    todoText.classList.add('todoText');
    todoText.textContent = task.title;
    currentTodo.appendChild(todoText);
    const dueDate = task.dueDate;
    if (!dueDate === 'none') {
        // const currentDate = format(new Date(), 'MM/dd/yyyy');
        // console.log(currentDate);
        // const dueDate = document.createElement('p');
        // dueDate.classList.add('todoText', 'todoDueDate');
        // dueDate.textContent = currentDate;
        // currentTodo.appendChild(dueDate);
    }
    const removeX = document.createElement('img');
    removeX.src = '../src/images/icons/removeX.svg';
    removeX.classList.add('removeX');
    currentTodo.appendChild(removeX);
    currentToDoList.appendChild(currentTodo);
} 



const createTodoInformationStructure = () => {
    const todoInformation = document.querySelector('#todoInformation');
    
}

export { createIninitalPageStructure }