import { defineDivStyles, updateListsDisplay, toggleColor, viewAllProjects, toggleDisplayVisibility, tasksBar, tasksContent, updateContent, 
addToProjects, removeClickEvents, projectsContent, projectsBar, statusUpdates, startEvent } from "./div";
import { projects, tasksList } from "./content";

toggleDisplayVisibility()
toggleColor(projectsBar, "rgb(69, 136, 115)", "rgb(104, 209, 176)");
defineDivStyles();
updateListsDisplay(projects, projectsContent)
updateListsDisplay(tasksList, tasksContent);
statusUpdates.setViewAll(true);
updateContent();
startEvent();
viewAllProjects();
