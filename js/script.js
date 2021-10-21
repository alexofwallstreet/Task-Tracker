import Storage from "./storage.js";
import TaskController from "./task-controller.js";
import ThemeSwitcher from "./theme-switcher.js";
import Sorting from "./sorting.js";
import BtnController from "./btn-controller.js";

const storage = new Storage();
const taskController = new TaskController(storage);
const sorting = new Sorting(taskController, storage);
const themeSwitcherClass = new ThemeSwitcher(storage);
const btnController = new BtnController(taskController, storage);

document.querySelector("#dropdown .dropdown-menu").addEventListener("click", e => {
    e.stopPropagation();
})