import { defineDivStyles, updateListsDisplay, toggleColor, viewAllProjects, toggleDisplayClickEvent, tasksBar, tasksContent, updateContent, addToProjects, removeClickEvents, projectsContent, projectsBar } from "./div";
import { projects, tasksList } from "./content";


toggleDisplayClickEvent(tasksBar, tasksContent);
toggleDisplayClickEvent(projectsBar, projectsContent); 
toggleColor(projectsBar, "rgb(69, 136, 115)", "rgb(104, 209, 176)");
defineDivStyles();
updateListsDisplay(projects, projectsContent)
updateListsDisplay(tasksList, tasksContent);
updateContent();
viewAllProjects();
