//Imports
import Storage from "./storage.js";
import TaskController from "./task-controller.js";
import Task from "./task-tracker.js";
import appThemes from "./app-themes.js";

//Modules
const storage = new Storage();
const taskController = new TaskController();

//DOM Elements
const btn_asc = document.querySelector(".btn_sort_asc"),
    btn_desc = document.querySelector(".btn_sort_desc");
const form_add = document.querySelector("#add_form"),
    btn_addTask = document.querySelector("#btn_addTask"),
    input_title = document.querySelector("#inputTitle"),
    input_text = document.querySelector("#inputText");
const form_edit = document.querySelector("#edit_form"),
    btn_editTask = document.querySelector("#btn_editTask"),
    input_title_edit = document.querySelector("#inputTitle_edit"),
    input_text_edit = document.querySelector("#inputText_edit");
const themeSwitcher = document.querySelector("#slider");


taskController.setTasks(storage.getStorageTasks());
taskController.renderTasks(storage.getStorageSorting());

//------------------ Add Task Button Logic --------------------
btn_addTask.addEventListener("click", (e) => {
    e.preventDefault();

    const title = input_title.value,
        text = input_text.value,
        priority = document.querySelector("input[name=priorityRadios]:checked").value;


    if (title && text && priority) {

        const task = new Task(title, text, false, priority);

        taskController.addTask(task);
        storage.updateStorageTasks(taskController.getTasks());
        taskController.renderTasks(storage.getStorageSorting());

        resetForm(form_add, "#addModal");
    } else {
        alert("Please, input all fields!");
    }

});


//------------------ Edit Task Button Logic --------------------
btn_editTask.addEventListener("click", (e) => {
    e.preventDefault();

    const index = document.querySelector("#task_id_edit").value;
    const title = input_title_edit.value,
        text = input_text_edit.value,
        priority = document.querySelector("input[name=priorityRadios_edit]:checked").value;

    if (title && text && priority) {
        taskController.updateTask({ index, title, text, priority });
        storage.updateStorageTasks(taskController.getTasks());
        taskController.renderTasks(storage.getStorageSorting());

        resetForm(form_edit, "#editModal");
    } else {
        alert("Please, input all fields!");
    }


});


function resetForm(form, modal) {
    form.reset();
    $(modal).modal('hide');
}



//------------------ Complete/Edit/Delete Task Buttons Logic --------------------
document.querySelector(".main-content").addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("btn_completeTask")) {
        const taskId = target.dataset.id;
        taskController.completeTask(taskId);
        update();
    }
    else if (target.classList.contains("btn_editTask")) {
        const taskId = target.dataset.id;
        taskController.updateEditModal(taskId);
        update();
    }
    else if (target.classList.contains("btn_deleteTask")) {
        const taskId = target.dataset.id;
        taskController.deleteTask(taskId);
        update();
    }

    function update() {
        storage.updateStorageTasks(taskController.getTasks());
        taskController.renderTasks(storage.getStorageSorting());
    }
});


//------------------ Sorting Tasks Buttons Logic --------------------
if (storage.getStorageSorting() === 'asc') {
    tooglePrimaryBtn(btn_asc, btn_desc);
} else {
    tooglePrimaryBtn(btn_desc, btn_asc);
}

btn_asc.addEventListener("click", () => {
    storage.setStorageSorting(0);
    taskController.renderTasks(storage.getStorageSorting());
    tooglePrimaryBtn(btn_asc, btn_desc);
});

btn_desc.addEventListener("click", () => {
    storage.setStorageSorting(1);
    taskController.renderTasks(storage.getStorageSorting());
    tooglePrimaryBtn(btn_desc, btn_asc);
});

function tooglePrimaryBtn(btn_primary, btn_secondary) {
    btn_primary.classList.remove("btn-secondary");
    btn_primary.classList.add("btn-primary");

    btn_secondary.classList.remove("btn-primary");
    btn_secondary.classList.add("btn-secondary");
}


//------------------ Theme Switching Logic --------------------
if (storage.getStorageTheme() === 'light') {
    themeSwitcher.checked = false;
    setTheme("light");
} else {
    themeSwitcher.checked = true;
    setTheme("dark");
}

themeSwitcher.addEventListener("change", () => {
    const currentTheme = storage.getStorageTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    storage.setStorageTheme(newTheme);
    setTheme(newTheme);
});

function setTheme(theme) {
    const prevTheme = theme === "light" ? "dark" : "light";
    appThemes().forEach(elem => {
        document.querySelector(elem.selector).classList.remove(elem[prevTheme]);
        document.querySelector(elem.selector).classList.add(elem[theme]);
    })
}

//No-close Dropdown when the theme change
document.querySelector("#dropdown .dropdown-menu").addEventListener("click", e => {
    e.stopPropagation();
})

document.querySelector(".btn-add-task-modal").addEventListener("click", () => {
    resetForm(form_add, "#addModal");
})








