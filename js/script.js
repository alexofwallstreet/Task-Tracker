"use strict";

let tasks = getStorageTasks();

renderTasks(tasks);

document.querySelectorAll(".btn_completeTask").forEach(btn => {
    btn.addEventListener("click", () => {
        const taskId = btn.dataset.id;
        completeTask(taskId);
    });
});

document.querySelectorAll(".btn_deleteTask").forEach(btn => {
    btn.addEventListener("click", () => {
        const taskId = btn.dataset.id;
        deleteTask(taskId);
    });
});

document.querySelectorAll(".btn_editTask").forEach(btn => {
    btn.addEventListener("click", () => {
        const taskId = btn.dataset.id;
        updateEditModal(taskId);
    });
});

//Task information to Add
const btn_addTask = document.querySelector("#btn_addTask"),
    input_title = document.querySelector("#inputTitle"),
    input_text = document.querySelector("#inputText");


//Task information to Edit
const btn_editTask = document.querySelector("#btn_editTask"),
    input_title_edit = document.querySelector("#inputTitle_edit"),
    input_text_edit = document.querySelector("#inputText_edit");


btn_addTask.addEventListener("click", (e) => {
    const title = input_title.value,
        text = input_text.value,
        priority = document.querySelector("input[name=priorityRadios]:checked").value;

    const task = new Task(title, text, false, priority);
    tasks.push(task);
    updateStorageTasks(tasks);
});


btn_editTask.addEventListener("click", () => {
    const index = document.querySelector("#task_id_edit").value;
    const title = input_title_edit.value,
        text = input_text_edit.value,
        priority = document.querySelector("input[name=priorityRadios_edit]:checked").value;
    tasks[index].title = title;
    tasks[index].text = text;
    tasks[index].priority = priority;
    updateStorageTasks(tasks);
})


function completeTask(id) {
    const taskIndex = tasks.findIndex(task => task.id == id);
    tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
    updateStorageTasks(tasks);
    location.reload();
}

function updateEditModal(id) {
    const taskIndex = tasks.findIndex(task => task.id == id);
    document.querySelector("#task_id_edit").value = taskIndex;
    input_title_edit.value = tasks[taskIndex].title;
    input_text_edit.value = tasks[taskIndex].text;
    document.querySelector(`input[name=priorityRadios_edit][value=${tasks[taskIndex].priority}]`).checked = true;
}


function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id == id);
    tasks = [
        ...tasks.splice(0, taskIndex),
        ...tasks.splice(taskIndex + 1)
    ];
    updateStorageTasks(tasks);
    location.reload();
}


function getStorageTasks() {

    const tasks = [];

    let jsonTasks = [];
    //getting tasks from LocalStorage
    try {
        jsonTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    catch {
        jsonTasks = [
            new Task("Homework", "Do my homework", false, "h"),
            new Task("Breakfast", "Have a nice breakfast", false, "m"),
            new Task("Music", "Listen to music", false, "l")
        ]
    }
    finally {
        if (!jsonTasks) {
            jsonTasks = [
                new Task("Homework", "Do my homework", false, "h"),
                new Task("Breakfast", "Have a nice breakfast", false, "m"),
                new Task("Music", "Listen to music", false, "l")
            ]
        }
        jsonTasks.forEach(task => {
            tasks.push(new Task(task.title, task.text, task.isCompleted, task.priority, task.color, new Date(task.date)));
        });
    }

    return tasks;
}



function updateStorageTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

