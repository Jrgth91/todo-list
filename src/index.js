import {displayProjects, globalStatus, setEvents  } from "./div";
import { projects, tasksList } from "./content";

setEvents()
displayProjects(globalStatus.getStatus().style)