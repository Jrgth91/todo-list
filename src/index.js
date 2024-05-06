import {displayProjects, globalStatus, setEvents,  } from "./div";
import { projects, tasksList, readLocalStorage } from "./content";

setEvents()
readLocalStorage()
displayProjects(globalStatus.getStatus().style)