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
        sideBarProject.id = `${project.projectID}`
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
    console.log(projectDiv.textContent);
    const projectListAllToDos = document.getElementById('projectListAllToDos');
    projectListAllToDos.addEventListener('click', viewAllTodos);

    resetViewingContent();
    changeViewingContent(projectDiv);
    updateToDoNavProjectName();
    updateToDoNavInputText(projectDiv.textContent);
    populateProjectToDoList(projectDiv.textContent);
    
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

    newTodoInput.addEventListener('click', removeInputText);
    newTodoInput.addEventListener('keyup', checkIfEnter);
        

}

//Removes the viewingContent class from all sidebar projects
const resetViewingContent = () => {
    if (document.querySelector('.viewingContent')) {
        const currentSideBarSelection = document.querySelector('.viewingContent');
        currentSideBarSelection.classList.remove('viewingContent');
    }
    
}

//Resets the todo item input text to it's default
const defaultNewTodoInput = () => {
    const newTodoInput = document.getElementById('newTodoInput');
    newTodoInput.defaultValue = 'Enter a new ToDo item';
}


const defaultTodoListProjectName = () => {
    const todoListProjectName = document.getElementById('todoListProjectName');
    const viewingContent = document.querySelector('.viewingContent');
    todoListProjectName.textContent = viewingContent.textContent;

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
const updateToDoNavInputText = (projectName) => {
    const newTodoInput = document.getElementById('newTodoInput');
    const currentSideBarSelection = document.querySelector('.viewingContent').textContent;
    
    newTodoInput.defaultValue = `Enter a new ToDo item in ${currentSideBarSelection}`;
}

//Removes the default text in the new task input
const removeInputText = () => {
    const newTodoInput = document.getElementById('newTodoInput');
    console.log('clearing input');
    newTodoInput.value = ''
    newTodoInput.removeEventListener('click', removeInputText);
    
    const inputPageBackground = document.createElement('div');
    inputPageBackground.id = 'inputPageBackground';
    const content = document.querySelector('#content');
    content.appendChild(inputPageBackground);

    inputPageBackground.addEventListener('click', leaveInput);
}

const leaveInput = () => {
    const inputPageBackground = document.querySelector('#inputPageBackground');
    inputPageBackground.remove();
    const newTodoInput = document.getElementById('newTodoInput');
    if (newTodoInput.value === '') {
        newTodoInput.value = 'Enter a new ToDo item';
        newTodoInput.addEventListener('click', removeInputText);
    } 

    
}

//Collects the value of the new todo item
const getNewTodoInputValue = () => {
    const newTodoInput = document.getElementById('newTodoInput');
    const toDoTitle = newTodoInput.value;
    newTodoInput.value = '';
    
    console.log(toDoTitle);
    return toDoTitle;
}

//Checks if the key pressed is enter
const checkIfEnter = (e) => {
    if (e.key === 'Enter' && (newTodoInput.value !== '')) {
        const taskName = getNewTodoInputValue();
        addNewToDo(taskName);
    }
}

//Creates a new ToDo
const addNewToDo = (taskName) => {
    console.log('in addNewToDo');
    
    let currentProject = document.querySelector('.viewingContent').textContent;
    
    if (currentProject === `All ToDo's`) {
        currentProject = 'Inbox';
    }
    console.log(currentProject);

    toDo.allProjects.list.forEach((project) => {
        
        if (project.projectName === currentProject) {
            console.log('in adding to projects');
            const newTask = new toDo.item(taskName, '', project);
            project.toDoList.push(newTask);
            toDo.toDoList.addNew(newTask);
            
            console.log(toDo.allProjects);
            console.log(toDo.allTodos);
        }

    })
    
    const todoListTodosHolder = document.querySelector('#todoListTodosHolder');
    let projectType = document.querySelector('.viewingContent').classList;
    console.log(projectType);
    if (projectType.contains('projectListItem')) {
        console.log('projectListItem');
        removeAllChildNodes(todoListTodosHolder);
        populateProjectToDoList(currentProject);
    } else if (projectType.contains('sideBarList')) {
        console.log('sideBarList');
        removeAllChildNodes(todoListTodosHolder);
        populateAllTodos();
    }
    console.log(toDo.allProjects.list);

    
}

//Loads all the todos, sorted by project
const viewAllTodos = () => {
    const projectListAllToDos = document.getElementById('projectListAllToDos');
    
    projectListAllToDos.removeEventListener('click', viewAllTodos);
    resetViewingContent();
    
    projectListAllToDos.classList.add('viewingContent');
    
    defaultTodoListProjectName();
    defaultNewTodoInput();

    const todoListTodosHolder = document.querySelector('#todoListTodosHolder');
    removeAllChildNodes(todoListTodosHolder);
    populateAllTodos();
     
}

//Builds the toDoList with all the todos
const populateAllTodos = () => {
    toDo.allProjects.list.forEach((project) => {
        buildToDoList(project);

        if (project.toDoList.length !== 0) {
            const toDoListProjectDiv = document.querySelector(`#${project.projectName}ListDiv`);
            toDoListProjectDiv.classList.add('projectToDoList');
            console.log(toDoListProjectDiv);
            
            const projectDivName = document.createElement('p');
            projectDivName.textContent = `${project.projectName}`;
            projectDivName.classList.add('projectDivName');
            toDoListProjectDiv.appendChild(projectDivName);
            toDoListProjectDiv.insertAdjacentElement('afterbegin', projectDivName);

            projectDivName.addEventListener('click', viewProject.bind());
        }
    })  
}

//Builds the todolist with the todos from the selected project
const populateProjectToDoList = (projectName) => {
    const todoListTodosHolder = document.querySelector('#todoListTodosHolder');
    removeAllChildNodes(todoListTodosHolder);
    
    let projectArray = toDo.allProjects.list.filter((project) => project.projectName === projectName);
    projectArray.forEach((project) => buildToDoList(project)) 
}

//Creates the page elements of the todolist
const buildToDoList = (project) => {
    console.log('in buildToDoList');
    const todoListTodosHolder = document.querySelector('#todoListTodosHolder');
    const toDoListProjectDiv = document.createElement('div');
    toDoListProjectDiv.id = `${project.projectName}ListDiv`;
    todoListTodosHolder.appendChild(toDoListProjectDiv);
    
    const currentToDoList = document.createElement('div');
    currentToDoList.id = `${project.projectName}ToDoList`
    toDoListProjectDiv.appendChild(currentToDoList);
    
    project.toDoList.forEach((task) => buildTodoItem(task, project)); 
}

//Creates the todo elements
const buildTodoItem = (task, project) => {
    const currentToDoList = document.querySelector(`#${project.projectName}ToDoList`);
    
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