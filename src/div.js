import { projects, newProject } from "./content"
const PROJECT_TEMPLATE = document.getElementById("projectTemplate")
const TASK_TEMPLATE = document.getElementById("taskTemplate")
const projectsContainer = document.querySelector(".projects-container")
const completedTasksContainer = document.querySelector(".completed-tasks-container")


//// THIS MAKES NO SENSE ITS MOVING EVERYTHING TO THE TASK CONTAINER!? 
function updateCompletedTasksList() {
    completedTasksContainer.innerHTML = ""
    for (const project of projects) {
        const projectListContainer = document.createElement("div")
        const projectNameDiv = document.createElement("div")
        const tasksContainerDiv = document.createElement("div")

        projectListContainer.className = "tasks-list-container"

        projectNameDiv.className = "completed-task-project-name"

        projectNameDiv.id = projects.indexOf(project)
        projectNameDiv.innerHTML = project.projectName

        for (const task of project.projectTasks) {
            if (task.status === true) {
                const taskDiv = document.createElement("div")
                taskDiv.innerHTML = task.name
                tasksContainerDiv.appendChild(taskDiv)
                let selector = `${project.projectName}`
                selector = selector.replace(/ /g,"_");

                console.log(selector)

                if (!document.getElementById(selector)) {
                    projectListContainer.appendChild(projectNameDiv)
                    projectListContainer.appendChild(tasksContainerDiv)
                    completedTasksContainer.appendChild(projectListContainer)

                } else {
                    projectListContainer.appendChild(tasksContainerDiv)
                    completedTasksContainer.appendChild(projectListContainer)
                }

            }
        }

    }
}

function addNewProject() {
    const obj = structuredClone(newProject)
    projects.push(obj)
    const newIndex = projects.length - 1

    displayProjects("edit", "single", newIndex)
}

export function setEvents() {
    const viewAllProjectsButton = document.querySelector("#view-all-button")
    const addNewProjectButton = document.querySelector("#add-new-project-button")
    viewAllProjectsButton.addEventListener("click", () => {
        globalStatus.view = "all"
        globalStatus.style = "view"
        displayProjects("view")
    })
    addNewProjectButton.addEventListener("click", () => {
        addNewProject()
    })
}

function removeTask(task, projectIndex) {
    projects[projectIndex].projectTasks = projects[projectIndex].projectTasks.filter(object => object !== task)
}

function removeProject(project) {
    projects = projects.filter(obj => obj !== project)
}


function updateProjectsList() {
    const projectsListContainer = document.querySelector(".projects-list-container")
    projectsListContainer.innerHTML = ""
    for (let project of projects) {
        const list = document.createElement("button")
        list.innerText = project.projectName
        list.id = projects.indexOf(project)
        list.dataset.buttons = "list-buttons"
        list.className = "project-buttons"
        list.addEventListener("click", () => {

            displayProjects("view", "single", list.id)
        })
        projectsListContainer.appendChild(list)
    }
}

function changeTaskStatus(element, taskStatus, task) {
    if (task.status === true) {
        element.style.backgroundColor = "rgb(235 209 178)"
        element.classList.add("strike")
        taskStatus.checked = true
        updateCompletedTasksList()
    } else {
        element.style.backgroundColor = "rgb(255, 244, 230"
        taskStatus.checked = false
        element.classList.remove("strike")
        updateCompletedTasksList()
    }
}

export const globalStatus = {
    view: "all",
    style: "view",
    getStatus: function() {
        // Return an object with the current status
        return {
            view: this.view,
            style: this.style
        };
    }
};

function addNewTask(project) {
    const obj = {
        name: `Task ${project.projectTasks.length + 1}`,
        description: `Task Description ${project.projectTasks.length + 1}`,
        status: false
    }
    project.projectTasks.push(obj)
}

function saveProject(element, project) {
        project.projectName = element.projectName.value
        let index = 0
        for (let task of project.projectTasks) {

            task.name = document.querySelector(`#name${index}`).value
            task.description = document.querySelector(`#description${index}`).value
            index++
        }
}
function createProjectElement(style) {
    const mainContainer = document.createElement(`div`)
    const projectNameContainer = document.createElement("div")
    if (style === "view") {
        const projectName = document.createElement(`div`)
        const editProjectButton =  document.createElement("button")
        const deleteProjectButton = document.createElement("button")
        return{
            mainContainer,
            projectNameContainer,
            projectName,
            editProjectButton,
            deleteProjectButton
        }
    } else {
        const projectName = document.createElement(`input`)
        const addTaskButton = document.createElement("button")
        const saveButton = document.createElement("button")
        const deleteProjectButton = document.createElement("button")
        return {
            mainContainer,
            projectNameContainer,
            projectName,
            addTaskButton,
            saveButton,
            deleteProjectButton
        }
    }
}

function setProjectElement(element, style, project, index) {
    element.mainContainer.className = "project-container"
    element.projectNameContainer.className = "project-name-container"
    element.projectName.className = "project-name"
    if (style === "view") {
        element.editProjectButton.className = "add-task-button"
        element.editProjectButton.innerText = "Edit Project"
        element.editProjectButton.id = index;
        element.deleteProjectButton.className = "delete-project-button"
        element.deleteProjectButton.innerText = "Delete Project"
        element.projectName.innerText = project.projectName;

        element.editProjectButton.addEventListener("click", () => {
            displayProjects("edit", "single", index)
        })

        element.deleteProjectButton.addEventListener("click", () => {
            removeProject(project)
            updateCompletedTasksList()
            displayProjects("view", "all")
        })

        element.projectNameContainer.appendChild(element.projectName)
        element.projectNameContainer.appendChild(element.editProjectButton)
        element.projectNameContainer.appendChild(element.deleteProjectButton)
        element.mainContainer.appendChild(element.projectNameContainer)
        
        return element.mainContainer

    } else {

        element.projectName.value = project.projectName
        element.addTaskButton.className = "add-task-button"
        element.addTaskButton.innerText = "Add New Task"
        element.saveButton.className = "save-button"
        element.saveButton.innerText = "Save"
        element.deleteProjectButton.className = "delete-project-button"
        element.deleteProjectButton.innerText = "Delete Project"
        element.projectName.innerText = project.projectName

        element.addTaskButton.addEventListener("click", () => {
            addNewTask(project)
            displayProjects("edit", "single", index)

        })

        element.saveButton.addEventListener("click", () => {
            saveProject(element, project)
            displayProjects(globalStatus.getStatus().style, globalStatus.getStatus().view, index)
        })

        element.projectNameContainer.appendChild(element.projectName)
        element.projectNameContainer.appendChild(element.addTaskButton)
        element.projectNameContainer.appendChild(element.saveButton)
        element.mainContainer.appendChild(element.projectNameContainer)
        
        return element.mainContainer


    }
} 
// THIS IS NEXT!!!!
function setTaskElement(element, style, task, index, projectIndex) {

        element.taskContainer.className = "task-container"
        element.taskNameContainer.className = "task-name-container"
        element.taskDescriptionContainer.className = "task-description-container"

    if (style === "view") {
        element.taskName.className = "task-name"
        element.taskName.innerText = task.name
        element.taskName.id = `name${index}`
        element.taskStatus.type = "checkbox"

        // Need to add "Complete" and "Not Complete" strings to the left of checkbox
        element.taskStatus.innerHTML = "Not Complete"
        element.taskStatus.innerText = task.status
        element.taskStatus.id = `status${index}`
        element.taskDescription.id = `description${index}`

        element.taskDescription.className = "task-description"
        element.taskDescription.innerText = task.description

        element.taskStatus.addEventListener("change", () => {
            if (element.taskStatus.checked === true) {
                task.status = true
            } else {
                task.status = false
            }
            changeTaskStatus(element.taskContainer, element.taskStatus, task)
        })

        changeTaskStatus(element.taskContainer,element.taskStatus, task)

        element.taskNameContainer.appendChild(element.taskName)
        element.taskNameContainer.appendChild(element.taskStatus)
        element.taskContainer.appendChild(element.taskNameContainer)
        element.taskDescriptionContainer.appendChild(element.taskDescription)
        element.taskContainer.appendChild(element.taskDescriptionContainer)

        return element.taskContainer
    } else {

        element.taskName.className = "task-name"
        element.taskName.value = task.name
        element.taskName.id = `name${index}`
        element.taskDescription.id = `description${index}`
      
        element.deleteTaskButton.className = "delete-task-button"
        element.deleteTaskButton.innerText = "X"
        element.taskDescription.className = "task-description"
        element.taskDescription.value = task.description

        element.deleteTaskButton.addEventListener("click", () => {
            removeTask(task, projectIndex)
            updateCompletedTasksList()
            displayProjects("edit", "single", projectIndex)
        })
        
        element.taskNameContainer.appendChild(element.taskName)
        element.taskNameContainer.appendChild(element.deleteTaskButton)
        element.taskContainer.appendChild(element.taskNameContainer)
        element.taskDescriptionContainer.appendChild(element.taskDescription)
        element.taskContainer.appendChild(element.taskDescriptionContainer)

        return element.taskContainer
    }
}

function createTaskElement(style) {
    const taskContainer = document.createElement("div")
    const taskNameContainer = document.createElement("div")
    const taskDescriptionContainer = document.createElement("div")

    if (style === "view") {
        const taskName = document.createElement("div")
        const taskStatus = document.createElement("input")
        const taskDescription = document.createElement("div")
        return {
            taskContainer,
            taskNameContainer,
            taskName,
            taskStatus,
            taskDescriptionContainer,
            taskDescription
        }
    } else {
        const taskName = document.createElement("input")
        const deleteTaskButton = document.createElement("button")
        const taskDescription = document.createElement("input")
        return {
            taskContainer,
            taskNameContainer,
            taskName,
            deleteTaskButton,
            taskDescriptionContainer,
            taskDescription
        }
    }
}

function clearContainer(element) {
    element.innerHTML = ""
}

export function displayProjects(style, view, projectIndex) {
    updateProjectsList()
    clearContainer(projectsContainer)
    if (view === "single") {
        const container = document.createElement("div")
        container.className = "main-container"
        const projectElement = createProjectElement(style)
        const projectSet = setProjectElement(projectElement, style, projects[projectIndex], projectIndex)

        container.appendChild(projectSet)
        let index = 0
        for (let task of projects[projectIndex].projectTasks) {
            const taskElement = createTaskElement(style)
            const taskSet = setTaskElement(taskElement, style, task, index, projectIndex)
            container.appendChild(taskSet)
            index++
        }
        projectsContainer.appendChild(container)
            
        } else {
        
        for (let project of projects) {
            const container = document.createElement("div")
            container.className = "main-container"
            const projectElement = createProjectElement(style)
            const projectSet = setProjectElement(projectElement, style, project, projects.indexOf(project))

            container.appendChild(projectSet)
            let index = 0
            for (let task of project.projectTasks) {
                const taskElement = createTaskElement(style)
                const taskSet = setTaskElement(taskElement, style, task,)
                container.appendChild(taskSet)
                index++
            }

            projectsContainer.appendChild(container)

        } 

        }
}

