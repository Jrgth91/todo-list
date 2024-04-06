// NOTES
// To show a single project call this updateSingleProjectView(index)  index of the project to update display

import { projects, tasksList, newProject,} from "./content"

//Declare Dom Elements
const body = document.body
const leftGrid = document.querySelector(".left")
const rightGrid = document.querySelector(".right")
const userBar = document.querySelector("#user-bar")
export const tasksBar = document.getElementById("tasks-bar")
export const projectsBar = document.getElementById("projects-bar")
export const tasksContent = document.getElementById("tasks-content")
const mainContainer = document.getElementById("main-container")
export const projectsContent = document.getElementById("projects-content")
export const viewAll = document.getElementById("view-all")
const addNewProjectButton = document.getElementById("add-new-project")

//One Line Div Creation Function
const CreateDiv = function(divClassName, innerTxt, id, key) {
    const div = document.createElement("div")
    div.className = divClassName
    div.innerHTML = innerTxt
    div.id = id
    div.dataset.key = key
    return div
}

//One Line Input Creating Function
const CreateInput = function(divClassName, innerTxt, id, key, data) {
    const input = document.createElement("input")
    input.className = divClassName
    input.innerHTML = innerTxt
    input.type = "text"
    input.name = data
    input.id = id
    input.dataset.key = key
    return input
}

//Clears Displays
const containerUtilities = {
    clearMainContainer() {
        mainContainer.innerHTML = ""
    },
    clearListContainer(content) {
        content.innerHTML = ""
    }
}

//Resets Object (newProject)
const clearObject = function(object) {
    object.projectName = "New Project"
    object.projectTasks = [
        {name: "Task Name", description: "Task Description", status: "Not Complete"},
    ]
    object.projectIndex = "new"
}

//Sets some conditional bools
export const statusUpdates = {
    viewAll: false,
    clickedSave: false,
    setViewAll(bool) {
        if (bool) {
            this.viewAll = true
        } else {
            this.viewAll = false
        }
    },
    setClickedSave(bool) {
        if (bool) {
            this.clickedSave = true
        } else {
            this.clickedSave = false
    }
}

}

//Creates and appends divs for viewing project or projects
const setDivsForDisplayUpdates = function(target) {
    const divElements = []
    const index = target
    const mainDiv = CreateDiv("project-grid","",index, "" )
    const projectTitleContainer = CreateDiv("project-title-container", "","","")
    const projectTitle = CreateDiv("project-title", projects[index].projectName )
    const deleteProject = CreateDiv("delete-project-button", "X", "delete-project", index)
    const editButton = CreateDiv("edit-button", "Edit", "edit", index)
    projectTitleContainer.appendChild(projectTitle)
    projectTitleContainer.appendChild(editButton)
    projectTitleContainer.appendChild(deleteProject)
    mainDiv.appendChild(projectTitleContainer);

    divElements.push(index)
    divElements.push(mainDiv)
    divElements.push(projectTitleContainer)
    divElements.push(projectTitle)
    divElements.push(deleteProject)
    divElements.push(editButton)
    
    return divElements
}

const addNewProject = function(index) {
    containerUtilities.clearMainContainer()
    const newDiv = CreateDiv("project-edit","","new-project", "" )
    const editProjectContainer = CreateDiv("project-title-container", "","","")
    const editProjectTitle = CreateInput("project-title", newProject.projectName,"edit-title" )
    const saveButton = CreateDiv("save-button", "Save", "save-button", "")
    const addTaskButton = CreateDiv("add-task-button", "Add Task", "add-task")
    saveButton.dataset.key = index
    editProjectTitle.innerHTML = `<input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />`
    editProjectTitle.value = newProject.projectName
    // const deleteProject = CreateDiv("delete-project-button", "X", "delete-project", index)
    saveButton.addEventListener("click", function(e) {
        statusUpdates.setClickedSave(true);
            saveProject(newProject)
    })

    addTaskButton.addEventListener("click", function() {
        let obj = {name: "Task Name", description: "Task Description", status: "Not Completed"}
        newProject.projectTasks.push(obj)
        //This allows us to save whatever tasks we edited when we add a new task. 
        // This cycles every project task minus the last one added (New Task) because
        // New Task doesnt have a div assigned to it yet as we havent called editProject yet. 
        const word = document.getElementById("edit-title").value
        newProject.projectName = word
        for (let i = 0; i < newProject.projectTasks.length - 1; i++) {
            newProject.projectTasks[i].name = document.getElementById(`taskName${i}`).value
            newProject.projectTasks[i].description = document.getElementById(`taskDescription${i}`).value
            }
        editProject(newProject, newDiv, editProjectContainer, newProject.projectName, 0, index);
    })
    editProjectContainer.appendChild(editProjectTitle)
    editProjectContainer.appendChild(addTaskButton)
    editProjectContainer.appendChild(saveButton)
    newDiv.appendChild(editProjectContainer);
    editProjectTasks(newProject, newDiv,)
    mainContainer.appendChild(newDiv)

}


export const updateListsDisplay = function(list, listContainer) {
    containerUtilities.clearListContainer(listContainer)
    let index = 0;
    list.forEach(task => {
            if (task.projectName) {
                let div = CreateDiv("list-buttons", task.projectName, "", index)
                listContainer.appendChild(div)
                index++
            } else {
                let div = CreateDiv("list-buttons", task, "", index)
                listContainer.appendChild(div)
                index++
            }
    });
    addNewProjectButton.style.backgroundColor = "rgb(104, 209, 176)"
    addNewProjectButton.addEventListener("click", function() {

        addNewProject(projects.length)
    })
}
export const updateContent = function() {
    // console.log("View All Boolean = " + setViewAll)
    if (!statusUpdates.viewAll) {
        if (statusUpdates.clickedSave) {
            viewSingleProject("save");
        } else {
            viewSingleProject("view");
        }
        
    } else {
        updateViewAllProjects(0);
    }
}

function viewSingleProject(action) {
    containerUtilities.clearMainContainer();
    viewAll.style.backgroundColor = "rgb(104, 209, 176)"
    viewSingleProjectEvListener(action);
}


const viewSingleProjectEvListener = function(action) {
    if (action === "view") {
        projectsContent.addEventListener("click", function(e){
            if (e.target.dataset.key !== undefined) {
                // console.log(e.target.dataset.key)
                updateSingleProjectView(e.target.dataset.key)
            }
        })
    } else {
        mainContainer.addEventListener("click", function(e){
            if (e.target.id === "save-button") {
                // console.log(e.target.dataset.key)
                updateSingleProjectView(e.target.dataset.key)
            }
        })
    }

}


const updateSingleProjectView = function(target) {
    statusUpdates.setViewAll(false);
            viewAll.style.backgroundColor = "rgb(104, 209, 176)"
            containerUtilities.clearMainContainer()
            const myDivs = setDivsForDisplayUpdates(target)
            myDivs[4].addEventListener('click', () => {
                removeProject(projects[target].projectIndex);
            })

            myDivs[5].addEventListener("click", function() {
                editProject(projects[target], myDivs[1], myDivs[2], projects[target].projectName, target, target);
            })

            updateProjectTasks(projects[target], myDivs[1]);
            
            mainContainer.appendChild(myDivs[1])
}

const projectsSection = function() {
    const content = CreateDiv("projects-bar", "Projects Bar")
    return content
}

export const defineDivStyles = function() {
    projectsContent.style.display = "none"
    projectsBar.style.backgroundColor = "rgb(104, 209, 176)"
}

export const toggleDisplayVisibility = function() {
    tasksBar.addEventListener("click", function() {
        if (tasksContent.style.display === "none") {
            tasksContent.style = 'display:';
        } else {
            tasksContent.style.display = "none"
        }
    })
    projectsBar.addEventListener("click", function() {
        if (projectsContent.style.display === "none") {
            projectsContent.style = 'display:';
        } else {
            projectsContent.style.display = "none"
        }
    })

}

export const toggleColor = function(button, colorOne, colorTwo) {
    button.addEventListener("click", function() {
        if (button.style.backgroundColor === colorOne) {
            button.style.backgroundColor = colorTwo;

        } else {
            button.style.backgroundColor = colorOne
        }
    })
}
    
function removeProject(name) {
    projects = projects.filter(project => project.projectIndex !== name)
    updateContent();
    updateListsDisplay(projects, projectsContent)
}

function removeTask(project, task, index) {
    const removeTask = project.projectTasks.indexOf(task)
    project.projectTasks.splice(removeTask, 1)

}

const updateViewAllProjects = function(index) {
    containerUtilities.clearMainContainer();
    projects.forEach(project => {
        const myDivs = setDivsForDisplayUpdates(index)
        myDivs[4].addEventListener('click', () => {
            removeProject(project.projectIndex);
        })

        myDivs[5].addEventListener("click", function() {
            editProject(project, myDivs[1], myDivs[2], project.projectName, myDivs[4].dataset.key, myDivs[4].dataset.key);
        })

        updateProjectTasks(project, myDivs[1], index);
        
        viewAll.style.backgroundColor = "rgb(69, 136, 115)";
        mainContainer.appendChild(myDivs[1])
        index++;
});
// console.log("After View All Projects Display Was Updated")
}

export function viewAllProjects() {
    viewAll.addEventListener("click", function() {
        statusUpdates.setViewAll(true);
        updateContent();
    })
}

const saveProject = function(project) {
    const name = document.getElementById("edit-title").value
    project.projectName = name
    // console.log("Saved Project Title")
   for (let i = 0; i < project.projectTasks.length; i++) {
    project.projectTasks[i].name = document.getElementById(`taskName${i}`).value
    project.projectTasks[i].description = document.getElementById(`taskDescription${i}`).value
    }

    if (project.projectIndex === "new") {
        const obj = {...newProject};
        obj.projectIndex = projects.length + 1
        projects.push(obj)
        clearObject(newProject);
        // console.log(projects)
    }

    updateListsDisplay(projects, projectsContent)
    updateContent();
    statusUpdates.clickedSave = false;

}

function editProject(project, mainCont, subContainer, projectName, index, targetId) {
    containerUtilities.clearMainContainer()
    const newDiv = CreateDiv("project-edit","",project, "" )
    const editProjectContainer = CreateDiv("project-title-container", "","","")
    const editProjectTitle = CreateInput("project-title", projectName,"edit-title" )
    const saveButton = CreateDiv("save-button", "Save", "save-button", index)
    const addTaskButton = CreateDiv("add-task-button", "Add Task", "add-task")


    saveButton.dataset.key = targetId
    editProjectTitle.innerHTML = `<input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />`
    editProjectTitle.value = projectName

    saveButton.addEventListener("click", function(e) {
        statusUpdates.setClickedSave(true);
            saveProject(project)
    })

    addTaskButton.addEventListener("click", function() {
        let obj = {name: "Task Name", description: "Task Description", status: "Not Completed"}
        project.projectTasks.push(obj)
        //This allows us to save whatever tasks we edited when we add a new task. 
        // This cycles every project task minus the last one added (New Task) because
        // New Task doesnt have a div assigned to it yet as we havent called editProject yet. 
        const word = document.getElementById("edit-title").value
        projectName = word
        for (let i = 0; i < project.projectTasks.length - 1; i++) {
            project.projectTasks[i].name = document.getElementById(`taskName${i}`).value
            project.projectTasks[i].description = document.getElementById(`taskDescription${i}`).value
            }
        project.projectName = document.getElementById("edit-title").value
        editProject(project, mainCont, subContainer, projectName, index, targetId);
    })

    editProjectContainer.appendChild(editProjectTitle)
    editProjectContainer.appendChild(addTaskButton)
    editProjectContainer.appendChild(saveButton)
    newDiv.appendChild(editProjectContainer);
    editProjectTasks(project, newDiv, editProjectContainer)
    mainContainer.appendChild(newDiv)

}

const updateProjectTasks = function(project, mainContainer,) 
{   
    if (project.projectTasks && Array.isArray(project.projectTasks)) {
        let index = 0;
        for (let task of project.projectTasks ) {
            const taskDiv = document.createElement("div")
            const titleDiv = document.createElement("div")
            const statusContainer = document.createElement("div")
            taskDiv.id = `taskDiv${index}`
            taskDiv.className = "taskContainer"
            titleDiv.className = "taskTitle"
            let taskStatusText = document.createElement("div")
            let taskName = document.createElement("div")
            let taskDescription = document.createElement("div")
            let taskStatus = document.createElement("input")
            taskStatusText.innerHTML = task.status
            taskStatus.id = index
            taskStatus.type = "checkbox"
            taskStatus.addEventListener("click", function(e){
                toggleStatus(project, e)
                if (statusUpdates.viewAll === true){
                        updateContent()
                } else {
                    updateSingleProjectView(project.projectIndex - 1)
                }
            })
            taskName.innerHTML = task.name
            taskDescription.innerHTML = task.description
            
            checkStatus(task, taskDiv)
            statusContainer.className = "statusContainer"
            statusContainer.appendChild(taskStatusText)
            statusContainer.appendChild(taskStatus)
            titleDiv.appendChild(taskName)
            titleDiv.appendChild(statusContainer)
            taskDiv.appendChild(titleDiv)
            taskDiv.appendChild(taskDescription)
            mainContainer.appendChild(taskDiv)
            index++
        };
    }

}

const editProjectTasks = function(project, newDiv, subContainer) {
    let index = 0
    for (let task of project.projectTasks ) {
        const taskDiv = document.createElement("input")
        const taskDescriptionContainer = document.createElement("div")
        const taskDescription = document.createElement("input")
        const taskX = document.createElement("div")        

        taskDescriptionContainer.id = "task-description-bar"
        taskDescription.innerHTML = `<input type="text" name="${task.name}" required minlength="4" maxlength="40" size="15" />`
        taskX.innerHTML = "X"
        taskX.id = index
        taskX.dataset.key = project.projectIndex - 1
        taskDiv.innerHTML = `<input type="text" name="task${index}" required minlength="4" maxlength="40" size="15" />`
        taskDiv.id = `taskDescription${index}`
        taskDiv.value = task.description
        taskDescription.value = task.name
        taskDescription.id = `taskName${index}`
        if (statusUpdates.clickedSave) {
            project.projectTasks.name = taskDescription.value
            project.projectTasks.description = taskDiv.value
            // console.log(project)
        }

        taskX.addEventListener("click", function() {
            removeTask(project, task, index)
            // console.log(project.projectTasks)
            editProject(project, newDiv, subContainer, project.projectName, index);
        })

        taskDescriptionContainer.appendChild(taskDescription)
        taskDescriptionContainer.appendChild(taskX)
        newDiv.appendChild(taskDescriptionContainer)
        newDiv.appendChild(taskDiv)
        index++
    }
    
}


const toggleStatus = function(project,e) {
    if (project.projectTasks[e.target.id].status === "Completed") {
        project.projectTasks[e.target.id].status = "Not Completed"
        // console.log(project.projectTasks[e.target.id])
    } else {
        project.projectTasks[e.target.id].status = "Completed"
    
    }

}

const checkStatus = function(task, div) {
    if (task.status === "Completed") {
        div.style.backgroundColor = "#f0b429"
    } else {
        div.style.backgroundColor = "rgb(224 202 125)"
    }
}

// Not Implemented Yet
const userSection = function() {
    const content = CreateDiv("user-bar", "User Bar")
    return content
}


export const startEvent = function() {
    projectsContent.addEventListener("click", function(e){
    if (e.target.dataset.key !== undefined) {
        // console.log(e.target.dataset.key)
        updateSingleProjectView(e.target.dataset.key)
    }
})}