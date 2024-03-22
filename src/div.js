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

const CreateDiv = function(divClassName, innerTxt, id, key) {
    const div = document.createElement("div")
    div.className = divClassName
    div.innerHTML = innerTxt
    div.id = id
    div.dataset.key = key
    return div
}

const EditInput = function(divClassName, innerTxt, id, key, name) {
    const input = document.createElement("input")
    input.className = divClassName
    input.innerHTML = innerTxt
    input.type = "text"
    input.name = name
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

function viewSingleProject() {
    containerUtilities.clearMainContainer();
    viewAll.style.backgroundColor = "rgb(104, 209, 176)"
    projectsContent.addEventListener("click", function(e){
        if (e.target.dataset.key !== undefined) {
            setViewAll = false;
            const index = e.target.dataset.key
            viewAll.style.backgroundColor = "rgb(104, 209, 176)"
            containerUtilities.clearMainContainer()
            const mainDiv = CreateDiv("project-grid","",index, "" )
            const projectTitleContainer = CreateDiv("project-title-container", "","","")
            const projectTitle = CreateDiv("project-title", projects[index].projectName, )
            const deleteProject = CreateDiv("delete-project-button", "X", "delete-project", index)
            const editButton = CreateDiv("edit-button", "Edit", "edit", index)

            projectTitleContainer.appendChild(projectTitle)
            // projectTitleContainer.appendChild(editButton)
            projectTitleContainer.appendChild(deleteProject)
            mainDiv.appendChild(projectTitleContainer);
            deleteProject.addEventListener('click', () => {
                removeProject(projects[index].projectIndex);
            })

            // editButton.addEventListener("click", function() {
            //     editProject(projects[index], mainDiv, projectTitleContainer, projects[index].projectName,);
            // })

            updateProjectTasks(projects[index], mainDiv);
            console.log(projects[index])
            
            mainContainer.appendChild(mainDiv)
        }
    })
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
        viewSingleProject();
    } else {
        updateViewAllProjects(0);
    }
}


function editProject(name, mainCont, subContainer, projectName) {
    // editProject(projects[index].projectIndex, mainDiv, projectTitleContainer, projects[index].projectName);
    containerUtilities.clearMainContainer()
    const newDiv = CreateDiv("project-grid","",name, "" )
    const editProjectContainer = CreateDiv("project-title-container", "","","")
    const editProjectTitle = CreateDiv("project-title", projectName, )
    // const deleteProject = CreateDiv("delete-project-button", "X", "delete-project", index)
    editProjectContainer.appendChild(editProjectTitle)
    newDiv.appendChild(editProjectContainer);
    updateProjectTasks(name, newDiv)
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