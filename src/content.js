export let projects = [];
export const tasksList = [""]

export let newProject = {
    projectName: "New Project",
    projectTasks: [
        {name: "Task Name", description: "Task Description", status: "Not Complete"},
    ],
    projectIndex: "new"
}

let contentOne  = {
    projectName: "Test Project 1",
    projectTasks: [
        {name: "Task 1", description: "Task Description 1", status: "Not Complete"},
        {name: "Task  2", description: "Task Description 2", status: "Not Complete"}
    ],
    projectIndex: 1
}

let contentTwo = {
    projectName: "Test Project 2",
    projectTasks: [{
        name: "Task 1", description: "Task Description 1", status: "Not Complete"
    }],
    projectIndex: 2
} 

projects.push(contentOne)
projects.push(contentTwo)
