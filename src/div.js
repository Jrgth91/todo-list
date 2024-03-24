// NOTES
// To show a single project call this updateSingleProjectView(index)  index of the project to update display

import { projects, tasksList, newProject,} from "./content"

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

let setViewAll = false;
let hasClickedSave = false;

const CreateDiv = function(divClassName, innerTxt, id, key) {
    const div = document.createElement("div")
    div.className = divClassName
    div.innerHTML = innerTxt
    div.id = id
    div.dataset.key = key
    return div
}

const EditInput = function(divClassName, innerTxt, id, key, data) {
    const input = document.createElement("input")
    input.className = divClassName
    input.innerHTML = innerTxt
    input.type = "text"
    input.name = data
    input.id = id
    input.dataset.key = key
    return input
}

const userSection = function() {
    const content = CreateDiv("user-bar", "User Bar")
    return content
}

const containerUtilities = {
    clearMainContainer() {
        mainContainer.innerHTML = ""
    },
    clearListContainer(content) {
        content.innerHTML = ""
    }
}


const addNewProject = function() {
    containerUtilities.clearMainContainer()
    const newDiv = CreateDiv("project-edit","","new-project", "" )
    const editProjectContainer = CreateDiv("project-title-container", "","","")
    const editProjectTitle = EditInput("project-title", newProject.projectName,"edit-title" )
    const saveButton = CreateDiv("save-button", "Save", "save-button", "")
    const addTaskButton = CreateDiv("add-task-button", "Add Task", "add-task")
    saveButton.dataset.key = 2
    editProjectTitle.innerHTML = `<input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />`
    editProjectTitle.value = newProject.projectName
    // const deleteProject = CreateDiv("delete-project-button", "X", "delete-project", index)
    saveButton.addEventListener("click", function(e) {
        hasClickedSave = true;
            saveProject(newProject)
    })

    addTaskButton.addEventListener("click", function() {
        newProject.projectTasks.push("New Task")
        addNewProject()
    })
    editProjectContainer.appendChild(editProjectTitle)
    editProjectContainer.appendChild(addTaskButton)
    editProjectContainer.appendChild(saveButton)
    newDiv.appendChild(editProjectContainer);
    editProjectTasks(newProject, newDiv,)
    mainContainer.appendChild(newDiv)

}

const clearObject = function(object) {
    object.projectName = "New Project"
    object.projectTasks = ["New Task"]
    object.projectIndex = "new"
}

const saveProject = function(project) {
    const name = document.getElementById("edit-title").value
    project.projectName = name
    // console.log("Saved Project Title")
   for (let i = 0; i < project.projectTasks.length; i++) {
    project.projectTasks[i] = document.getElementById(`task${i}`).value
    }

    if (project.projectIndex === "new") {
        const obj = {...newProject};
        obj.projectIndex = projects.length + 1
        projects.push(obj)
        clearObject(newProject);
        console.log(projects)
    }

    updateListsDisplay(projects, projectsContent)
    updateContent();
    hasClickedSave = false;

}


const editProjectTasks = function(project, newDiv, subContainer) {
    let index = 0
    project.projectTasks.forEach(task => {
        const taskDiv = document.createElement("input")
        const taskDescriptionContainer = document.createElement("div")
        const taskDescription = document.createElement("div")
        const taskX = document.createElement("div")

        taskDescriptionContainer.id = "task-description-bar"
        taskDescription.innerHTML = `Task ${index + 1}`
        taskX.innerHTML = "X"
        taskX.id = index
        taskX.dataset.key = project.projectIndex - 1
        taskDiv.innerHTML = `<input type="text" name="task${index}" required minlength="4" maxlength="40" size="15" />`
        taskDiv.id = `task${index}`
        taskDiv.value = task
        if (hasClickedSave) {
            project.projectTasks[index] = taskDiv.value
        }

        taskX.addEventListener("click", function() {
            removeTask(project, task, index)
            console.log(project.projectTasks)
            editProject(project, newDiv, subContainer, project.projectName, index);
        })

        taskDescriptionContainer.appendChild(taskDescription)
        taskDescriptionContainer.appendChild(taskX)
        newDiv.appendChild(taskDescriptionContainer)
        newDiv.appendChild(taskDiv)
        index++
    })
    
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
        addNewProject()
    })
}
export const updateContent = function() {
    // console.log("View All Boolean = " + setViewAll)
    if (!setViewAll) {
        if (hasClickedSave) {
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
                updateSingleProjectView(e.target.dataset.key)
            }
        })
    } else {
        mainContainer.addEventListener("click", function(e){
            if (e.target.id === "save-button") {
                console.log(e.target.dataset.key)
                updateSingleProjectView(e.target.dataset.key)
            }
        })
    }

}

const updateSingleProjectView = function(target) {
    setViewAll = false;
            const index = target
            viewAll.style.backgroundColor = "rgb(104, 209, 176)"
            containerUtilities.clearMainContainer()
            const mainDiv = CreateDiv("project-grid","",index, "" )
            const projectTitleContainer = CreateDiv("project-title-container", "","","")
            const projectTitle = CreateDiv("project-title", projects[index].projectName )
            const deleteProject = CreateDiv("delete-project-button", "X", "delete-project", index)
            const editButton = CreateDiv("edit-button", "Edit", "edit", index)

            projectTitleContainer.appendChild(projectTitle)
            projectTitleContainer.appendChild(editButton)
            projectTitleContainer.appendChild(deleteProject)
            mainDiv.appendChild(projectTitleContainer);
            deleteProject.addEventListener('click', () => {
                removeProject(projects[index].projectIndex);
            })

            editButton.addEventListener("click", function() {
                editProject(projects[index], mainDiv, projectTitleContainer, projects[index].projectName, index);
            })

            updateProjectTasks(projects[index], mainDiv);
            
            mainContainer.appendChild(mainDiv)
}

const projectsSection = function() {
    const content = CreateDiv("projects-bar", "Projects Bar")
    return content
}

export const defineDivStyles = function() {
    projectsContent.style.display = "none"
    projectsBar.style.backgroundColor = "rgb(104, 209, 176)"
}

export const toggleDisplayClickEvent = function(button, content) {
    button.addEventListener("click", function() {
        if (content.style.display === "none") {
            content.style = 'display:';
        } else {
            content.style.display = "none"
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
        const mainDiv = CreateDiv("project-grid","",index, "" )
        const projectTitleContainer = CreateDiv("project-title-container", "","","")
        const projectTitle = CreateDiv("project-title", project.projectName, )
        const deleteProject = CreateDiv("delete-project-button", "X", "delete-project", index)
        const editButton = CreateDiv("edit-button", "Edit", "edit", index)

        projectTitleContainer.appendChild(projectTitle)
        projectTitleContainer.appendChild(editButton)
        projectTitleContainer.appendChild(deleteProject)
        mainDiv.appendChild(projectTitleContainer);
        deleteProject.addEventListener('click', () => {
            removeProject(project.projectIndex);
        })

        editButton.addEventListener("click", function() {
            editProject(project, mainDiv, projectTitleContainer, project.projectName, deleteProject.dataset.key);
        })

        updateProjectTasks(project, mainDiv);
        
        viewAll.style.backgroundColor = "rgb(69, 136, 115)";
        mainContainer.appendChild(mainDiv)
        index++;
});
// console.log("After View All Projects Display Was Updated")
}

export function viewAllProjects() {
    viewAll.addEventListener("click", function() {
        setViewAll = true;
        updateContent();

    })
}


function editProject(project, mainCont, subContainer, projectName, index) {
    // editProject(projects[index].projectIndex, mainDiv, projectTitleContainer, projects[index].projectName);
    containerUtilities.clearMainContainer()
    const newDiv = CreateDiv("project-edit","",project, "" )
    const editProjectContainer = CreateDiv("project-title-container", "","","")
    const editProjectTitle = EditInput("project-title", projectName,"edit-title" )
    const saveButton = CreateDiv("save-button", "Save", "save-button", index)
    const addTaskButton = CreateDiv("add-task-button", "Add Task", "add-task")
    // console.log(index)
    saveButton.dataset.key = project.projectIndex - 1
    editProjectTitle.innerHTML = `<input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />`
    editProjectTitle.value = projectName
    // const deleteProject = CreateDiv("delete-project-button", "X", "delete-project", index)
    saveButton.addEventListener("click", function(e) {
        hasClickedSave = true;
            saveProject(project)
    })

    addTaskButton.addEventListener("click", function() {
        project.projectTasks.push("New Task")
        editProject(project, mainCont, subContainer, projectName, index);
    })

    editProjectContainer.appendChild(editProjectTitle)
    editProjectContainer.appendChild(addTaskButton)
    editProjectContainer.appendChild(saveButton)
    newDiv.appendChild(editProjectContainer);
    editProjectTasks(project, newDiv, editProjectContainer)
    mainContainer.appendChild(newDiv)

}

const updateProjectTasks = function(project, mainContainer) 
{
    if (project.projectTasks !== undefined) {
        project.projectTasks.forEach(task => {
            const taskDiv = document.createElement("div")
            taskDiv.innerHTML = task
            mainContainer.appendChild(taskDiv)
        });
    }

}

