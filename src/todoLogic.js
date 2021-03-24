class todoProject {
    constructor (projectName) {
        this.projectName = projectName;
        this.toDoList = [];
        this.doneList = [];
        this.projectID = 'pID:' + makeID(16);
    }
}

class todoItem {
    constructor (title, dueDate, project, priority) {
        this.title = title || 'No title';
        this.dueDate = dueDate || 'none';
        this.project = project || 'Inbox';
        this.priority = priority || 'none';
        this.todoID = 'tdID:' + makeID(16);
        this.notes = '';
        this.state = 'notDone';
    }

    makeNotes(noteText) {
        this.notes = noteText;
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
            console.log(inbox.toDoList);
            inbox.toDoList.push(exampleToDo);
        }
        projectList.addNew(inbox);
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
    const addNew = (newToDo) => {
        const checkForToDoID = allTodos.list.filter((toDo) => toDo.todoID === newToDo.todoID);

        if (checkForToDoID.length === 0) {
            allTodos.list.push(newToDo);
        }

    }
    return {
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


export {todoItem as item, todoProject as project, buildInbox, projectList, toDoList, allProjects, allTodos}