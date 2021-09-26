"use strict";
let _currentId = 100;

const currentTasks_container = document.querySelector("#currentTasks"),
    completedTasks_container = document.querySelector("#completedTasks");

const priorities = {
    h: "High",
    m: "Medium",
    l: "Low"
};

const themes = {
    default: {
        color: "#000",
        background: "#fff"
    },
    blue: {
        color: "#3D88F6",
        background: "#C3D7F6"
    },
    red: {
        color: "#E96862",
        background: "#E9B6B3"
    },
    green: {
        color: "#68B146",
        background: "#9CB192"
    },
    purple: {
        color: "#8C50BF",
        background: "#E8D9F6"
    }
};

class Task {
    constructor(title, text, isCompleted = false, priority = "l", theme = "default", date = new Date()) {
        this.id = _currentId++;
        this.title = title;
        this.text = text;
        this.priority = priority;
        this.theme = theme;
        this.date = date;
        this.isCompleted = isCompleted;
    }

    render() {
        const html = document.createElement("li");
        html.classList.add("list-group-item", "d-flex", "w-100", "mb-2");

        const btnHtml = this.isCompleted ?
            `
            <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                <button type="button" class="btn_completeTask btn btn-success w-100" data-id=${this.id}>Not Complete</button>
                <button type="button" class="btn_deleteTask btn btn-danger w-100 my-2" data-id=${this.id}>Delete</button>
            </div>
            `
            :
            `
            <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                <button type="button" class="btn_completeTask btn btn-success w-100" data-id=${this.id}>Complete</button>
                <button type="button" class="btn_editTask btn btn-info w-100 my-2" data-id=${this.id} data-toggle="modal" data-target="#editModal">Edit</button>
                <button type="button" class="btn_deleteTask btn btn-danger w-100" data-id=${this.id}>Delete</button>
            </div>
        `;

        html.style.cssText = `
            color: ${themes[this.theme].color};
            background-color: ${themes[this.theme].background};
        `;

        html.innerHTML = `
            <div class="w-100 mr-2">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${this.title}</h5>
                    <div>
                        <small class="mr-2">${priorities[this.priority]} priority</small>
                        <small>${formatDate(this.date)}</small>
                    </div>

                </div>
                <p class="mb-1 w-100">${this.text}</p>
            </div>
            <div class="dropdown m-2 dropleft">
                <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
                ${btnHtml}
            </div>
        `;
        return html;
    }
}


function renderTasks() {

    showTasks = getTasksToShow(tasks);

    currentTasks_container.innerHTML = "";
    completedTasks_container.innerHTML = "";

    showTasks.forEach(task => {
        if (!task.isCompleted) {
            currentTasks_container.append(task.render())
        } else {
            completedTasks_container.append(task.render());
        }
    });

    update_events();
}


function formatDate(date) {

    let hh = date.getHours();
    if (hh < 10) hh = '0' + hh;

    let min = date.getMinutes();
    if (min < 10) min = '0' + min;

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear();

    return hh + ":" + min + " " + dd + '.' + mm + '.' + yy;
}
