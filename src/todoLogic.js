class todoProject {
    constructor (projectName) {
        this.projectName = projectName
    }
}

class todoItem {
    constructor (name, dueDate, project) {
        this.name = name;
        this.dueDate = dueDate;
        this.project = project;
    }

}

export {todoItem, todoProject}