import { displayProjects } from "./div";
import { format } from "date-fns";
export let projects = [];
export const tasksList = [""]
export const completedTasksList = [""]

export function addNewTask(project) {
    const obj = {
        name: `Task ${project.projectTasks.length + 1}`,
        description: `Task Description ${project.projectTasks.length + 1}`,
        status: false,
        date: format(new Date(), "MMMM do, yyyy h:mm aa")
    }
    project.projectTasks.push(obj)
}

function getCurDate() {
    return format(new Date(), "MMMM do, yyyy h:mm aa")
}

export function removeTask(task, projectIndex) {
    projects[projectIndex].projectTasks = projects[projectIndex].projectTasks.filter(object => object !== task)
}

export function removeProject(project) {
    projects = projects.filter(obj => obj !== project)
}


export function addNewProject() {
    const obj = structuredClone(newProject)
    projects.push(obj)
    const newIndex = projects.length - 1

    displayProjects("edit", "single", newIndex)
}

export function saveLocalStorage(obj) {
    let objString = JSON.stringify(obj)
    localStorage.setItem("Projects", objString)
}

export function readLocalStorage() {
    if (localStorage.getItem("Projects")) {
        projects = JSON.parse(localStorage.getItem("Projects"))
    } else {
        return
    }
}

export function clearLocalStorage() {
    localStorage.clear()
}

export function convertDate(type, dateString) {
    if (type === "edit") {
        const cleanString = dateString.replace(/(st|nd|rd|th),/, ',')
        const date = new Date(cleanString)
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // 04
        const day = ('0' + date.getDate()).slice(-2); // 28
        return `${year}-${month}-${day}`

    } else {
        const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const nth = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
        }
        }

        const dateParts = dateString.split('-');
        const year = dateParts[0];
        const monthIndex = parseInt(dateParts[1], 10) - 1;
        const day = parseInt(dateParts[2], 10);

        return `${months[monthIndex]} ${day}${nth(day)}, ${year}`;
    }
}


export let newProject = {
    projectName: "New Project",
    projectTasks: [
        {name: "Task Name", description: "Task Description", date: getCurDate(), status: false},
    ],
    projectIndex: "new"
}

let contentOne  = {
    projectName: "Test Project 1",
    projectTasks: [
        {name: "Task 1", description: "Task Description 1", date: "December 31st, 1999, 11:57 PM", status: false},
        {name: "Task  2", description: "Task Description 2", date: "December 31st, 1999, 11:57 PM", status: false}
    ],
    projectIndex: 1
}

let contentTwo = {
    projectName: "Test Project 2",
    projectTasks: [{
        name: "Task 1", description: "Task Description 1", date: "December 31st, 1999, 11:57 PM", status: false
    }],
    projectIndex: 2
} 

projects.push(contentOne)
projects.push(contentTwo)
