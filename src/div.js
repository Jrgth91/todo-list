import { projects, tasksList} from "./content"

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
let setViewAll = false;
let clickSave = false;

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
}

const updateSingleProjectView = function(target) {
    setViewAll = false;
            const index = target
            viewAll.style.backgroundColor = "rgb(104, 209, 176)"
            containerUtilities.clearMainContainer()
            const mainDiv = CreateDiv("project-grid","",index, "" )
            const projectTitleContainer = CreateDiv("project-title-container", "","","")
            const projectTitle = CreateDiv("project-title", projects[index].projectName, )
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
                updateSingleProjectView(e.target.dataset.key)
            }
        })
    }

}

function viewSingleProject(action) {
    containerUtilities.clearMainContainer();
    viewAll.style.backgroundColor = "rgb(104, 209, 176)"
    viewSingleProjectEvListener(action);
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

const updateViewAllProjects = function(index) {
    containerUtilities.clearMainContainer();
    projects.forEach(project => {
        const mainDiv = CreateDiv("project-grid","",index, "" )
        const projectTitleContainer = CreateDiv("project-title-container", "","","")
        const projectTitle = CreateDiv("project-title", project.projectName, )
        const deleteProject = CreateDiv("delete-project-button", "X", "delete-project", index)
        projectTitleContainer.appendChild(projectTitle)
        projectTitleContainer.appendChild(deleteProject)
        mainDiv.appendChild(projectTitleContainer);
        deleteProject.addEventListener('click', () => {
            removeProject(project.projectIndex);
        })

        updateProjectTasks(project, mainDiv);
        
        viewAll.style.backgroundColor = "rgb(69, 136, 115)";
        mainContainer.appendChild(mainDiv)
        index++;
        console.log(index)
});
}

export function viewAllProjects() {
    viewAll.addEventListener("click", function() {
        setViewAll = true;
        updateContent();

    })
}

export const updateContent = function() {
    console.log(setViewAll)
    if (!setViewAll) {
        if (clickSave) {
            viewSingleProject("save");
        } else {
            viewSingleProject("view");
        }
        
    } else {
        updateViewAllProjects(0);
    }
}


function editProject(name, mainCont, subContainer, projectName, index) {
    // editProject(projects[index].projectIndex, mainDiv, projectTitleContainer, projects[index].projectName);
    containerUtilities.clearMainContainer()
    const newDiv = CreateDiv("project-grid","",name, "" )
    const editProjectContainer = CreateDiv("project-title-container", "","","")
    const editProjectTitle = EditInput("project-title", projectName, )
    const saveButton = CreateDiv("save-button", "Save", "save-button", index)
    saveButton.dataset.key = index
    editProjectTitle.innerHTML = `<input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />`
    editProjectTitle.value = projectName
    console.log(editProjectTitle)
    // const deleteProject = CreateDiv("delete-project-button", "X", "delete-project", index)
    saveButton.addEventListener("click", function(e,) {
        clickSave = true;
        saveProject(projects[index], newDiv, editProjectTitle)

    })
    editProjectContainer.appendChild(editProjectTitle)
    editProjectContainer.appendChild(saveButton)
    newDiv.appendChild(editProjectContainer);
    editProjectTasks(name, newDiv,)
    mainContainer.appendChild(newDiv)

}

const saveProject = function(project, mainDiv, inputOne) {

    project.projectName = inputOne.value

   for (let i = 0; i < project.projectTasks.length; i++) {
    project.projectTasks[i] = document.getElementById(`task${i}`).value
    }
    
    editProjectTasks(project, mainDiv)
    updateListsDisplay(projects, projectsContent)
    updateContent();
    clickSave = false;

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

const editProjectTasks = function(project, newDiv, form) {
    let index = 0
    project.projectTasks.forEach(task => {
        const taskDiv = document.createElement("input")
        const taskDescription = document.createElement("div")
        taskDescription.innerHTML = `Task ${index + 1}`
        taskDiv.innerHTML = `<input type="text" name="task${index}" required minlength="4" maxlength="40" size="15" />`
        taskDiv.id = `task${index}`
        taskDiv.value = task
        if (clickSave) {
            project.projectTasks[index] = taskDiv.value
        }
        newDiv.appendChild(taskDescription)
        newDiv.appendChild(taskDiv)
        console.log(taskDiv.value)
        index++
    })
    
}

