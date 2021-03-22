class todoProject {
    constructor (projectName) {
        this.projectName = projectName;
        this.toDoList = [];
    }
}

class todoItem {
    constructor (title, dueDate, project, priority) {
        this.title = title || 'No title';
        this.dueDate = dueDate || 'none';
        this.project = project || 'defaultProject';
        this.priority = priority || 'none';
        this.todoID = 'TDID:' + makeID(16);
        this.notes = '';
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

const buildDefaultProject = (() => {
    const projectSetup = () => {
        let defaultProject = new todoProject ('All Projects');
        
        // ! Remove these in the future
        for (let i = 0; i < 3; i++) {
            const exampleToDo = new todoItem ();
            exampleToDo.project = defaultProject;
            
            defaultProject.toDoList.push(exampleToDo);
        }
        projectList.addNew(defaultProject);
    }

    return {
        projectSetup,

    }
})();

//Module for functions which manipulate the project list
const projectList = (() => {
    
    const addNew = (newProject) => {
        console.log(allProjects.list);
        const checkForName = allProjects.list.filter((project) => project.projectName === newProject.projectName);

        if (checkForName.length === 0){
            allProjects.list.push(newProject);
        }
        
        console.log(allProjects.list);
        console.log('-|-add new over-|-');
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


export {todoItem as item, todoProject as project, buildDefaultProject, projectList, allProjects}