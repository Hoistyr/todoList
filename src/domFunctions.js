const createIninitalPageStructure = () => {
    const content = document.querySelector('#content');
    const taskList = document.createElement('div');
    taskList.id = 'taskList';
    const taskInformation = document.createElement('div');
    taskInformation.id='taskInformation';

    content.append(taskList, taskInformation);
}

const createTaskListStructure = () => {
    console.log('intaskListStructure');
    const taskList = document.querySelector('#taskList');
    const taskListNav = document.createElement('div');
    taskListNav.id = 'taskListNav';
    
    taskList.appendChild(taskListNav);

    const hamburgerNavIcon = document.createElement('img');
    hamburgerNavIcon.classList.add('hamburgerNavIcon');
    hamburgerNavIcon.src = '../src/images/icons/hamburgerNavIcon.svg'

    taskListNav.appendChild(hamburgerNavIcon);
    
    
    //const hamburgerNavIcon
}

const createTaskInformationStructure = () => {
    const taskInformation = document.querySelector('#taskInformation');
    
}

export { createIninitalPageStructure, createTaskListStructure, createTaskInformationStructure }