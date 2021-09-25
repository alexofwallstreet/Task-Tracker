"use strict";

const priorities = {
    h: "High",
    m: "Medium",
    l: "Low"
}

class Task {

    constructor(title, text, priority, color, date = new Date()) {
        this.title = title;
        this.text = text;
        this.priority = priority;
        this.color = color;
        this.date = date;
        this.isCompleted = false;



    }

    render() {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <li class="list-group-item d-flex w-100 mb-2">
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
                <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                    <button type="button" class="btn btn-success w-100">Complete</button>
                    <button type="button" class="btn btn-info w-100 my-2">Edit</button>
                    <button type="button" class="btn btn-danger w-100">Delete</button>
                </div>
            </div>
        </li>
        `;
        return newDiv;
    }
}

const task = new Task("Main", "sdfadfsdf", "h", "any");
document.querySelector("#currentTasks").append(task.render());
document.querySelector("#currentTasks").append(task.render());
document.querySelector("#currentTasks").append(task.render());
document.querySelector("#currentTasks").append(task.render());
document.querySelector("#currentTasks").append(task.render());
document.querySelector("#currentTasks").append(task.render());
document.querySelector("#currentTasks").append(task.render());



function formatDate(date) {

    console.log(date.getMinutes());

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
