class todoProject {
    constructor (projectName) {
        this.projectName = projectName;
        this.toDoList = [];
        this.doneList = [];
        this.projectID = 'pID:' + makeID(16);
    }
}

class todoItem {
    constructor (title, dueDate, project, projectID, priority) {
        this.title = title || 'No title';
        this.dueDate = dueDate || 'none';
        this.project = project || 'Inbox';
        this.projectID = projectID || 'none';
        this.priority = priority || 'None';
        this.todoID = 'tdID:' + makeID(16);
        this.notes = '';
        this.state = 'notDone';
    }
}

const makeID = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let todoID = '';
    for (let i = 1; i <= length; i++ ) {
        todoID += characters.charAt(Math.floor(Math.random() * charactersLength));
        if (i % 4 === 0 && i !== length) {
            todoID += '-';
        }
    }
    return todoID;
    
}

const buildInbox = (() => {
    const create = () => {
        let inbox = new todoProject ('Inbox');
        
        // ! Remove these in the future
        for (let i = 0; i < 3; i++) {
            const exampleToDo = new todoItem ('Example todo');
            exampleToDo.project = inbox;
            exampleToDo.projectID = inbox.projectID;
            exampleToDo.notes = 'Hello there. General Kenobi, ah what a pleasant surprise. *cough cough*';
            exampleToDo.priority = 'Low';
            console.log(inbox.toDoList);
            inbox.toDoList.push(exampleToDo);
            
        }
        projectList.addNew(inbox);
        toDoList.updateList();
    }
    return {
        create,
    }
})();

//Module for functions which manipulate the project list
const projectList = (() => {
    const addNew = (newProject) => {
        console.log(allProjects.list);
        const checkForProjectID = allProjects.list.filter((project) => project.projectID === newProject.projectID);

        if (checkForProjectID.length === 0){
            allProjects.list.push(newProject);
        }
        
        
        console.log(allProjects.list);
        console.log('-|-add new over-|-');
    }
    return {
        addNew,
    }
})();

const toDoList = (() => {
    const updateList = () => {
        allTodos.list = [];
        allProjects.list.forEach(project => {
            project.toDoList.forEach(toDo => {
                const existCheck = allTodos.list.filter(currentToDo => currentToDo.todoID === toDo.todoID);
                if (existCheck.length === 0) {
                    allTodos.list.push(toDo);
                }
            })
        })
    }
    
    //No longer in use
    const addNew = (newToDo) => {
        const checkForToDoID = allTodos.list.filter((toDo) => toDo.todoID === newToDo.todoID);

        if (checkForToDoID.length === 0) {
            allTodos.list.push(newToDo);
        }

    }
    return {
        updateList,
        addNew,
    }

})();

//Master list of all the projects
const allProjects = (() => {
    let list = [];
    return {
        list,
    }
})();

//Master list of all the todos
const allTodos = (() => {
    let list = [];
    return {
        list,
    }
})();

const onPageLoad = (() => {
    console.log('logiconpageload');
    const getStoredProjects = (() => {
        if (window.localStorage.getItem('storageObject')) {
            console.log('storageExists');
            const storageObject = JSON.parse(window.localStorage.getItem('storageObject'));
            console.log('storageObject:');
            console.log(storageObject);

            if (storageObject.allProjects.length === 0) {
                buildInbox.create();
            }

            storageObject.allProjects.forEach(project => {
                if (allProjects.list.filter(checkProject => checkProject.projectID === project.projectID).length === 0) {
                    const addProject = new todoProject (project.projectName);
                    addProject.toDoList = project.toDoList;
                    addProject.doneList = project.doneList;
                    addProject.projectID = project.projectID;
                    allProjects.list.push(addProject);
                }
                
            })

            allProjects.list.forEach(project => {
                storageObject.allTodos.forEach(task => {
                    if (task.projectID === project.projectID) {
                        const addTask = new todoItem (task.title, task.dueDate, project, project.projectID, task.priority);
                        addTask.todoID = task.todoID;
                        addTask.notes = task.notes;
                        addTask.state = task.state;
                        if (addTask.state === 'done' && project.doneList.filter(task => task.todoID === addTask.todoID).length === 0) {
                            project.doneList.push(addTask);
                        } else if (addTask.state === 'notDone' && project.toDoList.filter(task => task.todoID === addTask.todoID).length === 0) {
                            project.toDoList.push(addTask);
                        }

                        allTodos.list.push(addTask);
                    }
                })
            })
        } else {
            buildInbox.create();
        }
    })();
})();

export {todoItem as item, todoProject as project, projectList, toDoList, allProjects, allTodos, onPageLoad}