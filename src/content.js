//IF ERROR ON taskStatus NULL its because i changed everything from "strings" to bool true or false
export let projects = [];
export const tasksList = [""]
export const completedTasksList = [""]

export let newProject = {
    projectName: "New Project",
    projectTasks: [
        {name: "Task Name", description: "Task Description", status: false},
    ],
    projectIndex: "new"
}

let contentOne  = {
    projectName: "Test Project 1",
    projectTasks: [
        {name: "Task 1", description: "Task Description 1", status: false},
        {name: "Task  2", description: "Task Description 2", status: false}
    ],
    projectIndex: 1
}

let contentTwo = {
    projectName: "Test Project 2",
    projectTasks: [{
        name: "Task 1", description: "Task Description 1", status: false
    }],
    projectIndex: 2
} 

projects.push(contentOne)
projects.push(contentTwo)
