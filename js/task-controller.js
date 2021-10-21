import Task from "./task-tracker.js";

export default class TaskController {

    constructor(storage, current = "#currentTasks", completed = "#completedTasks", editForm = "#edit_form", addForm = "#addForm") {
        this.currentTasks_container = document.querySelector(current);
        this.completedTasks_container = document.querySelector(completed);
        this.editModalForm = document.querySelector(editForm);
        this.addModalForm = document.querySelectorAll(addForm);
        this.storage = storage;
        this.tasks = this.storage.getStorageTasks();
        this.renderTasks(this.storage.getStorageSorting());
    }

    _tasks = [];

    set tasks(newTasks) {
        this._tasks = newTasks;
    }

    get tasks() {
        return this._tasks;
    }

    createTask(title, text, priority) {
        return new Task(title, text, false, priority);
    }

    addTask(task) {
        const newTasks = this.tasks;
        newTasks.push(task);
        this.tasks = newTasks;
    }

    updateTask(props) {
        const currentTasks = this.tasks;
        const { id, title, text, priority } = props;
        const newTasks = currentTasks.map(task => {
            if (task.id == id) {
                task.title = title;
                task.text = text;
                task.priority = priority;
            }
            return task;
        });

        this.tasks = newTasks;
    }

    completeTask(id) {
        const currentTasks = this.tasks;
        const newTasks = currentTasks.map(task => {
            if (task.id == id) {
                task.isCompleted = !task.isCompleted;
            }
            return task;
        });

        this.tasks = newTasks;
    }

    deleteTask(id) {
        const currentTasks = this.tasks;
        const newTasks = currentTasks.filter(task => task.id != id);
        this.tasks = newTasks;
    }

    renderTasks(sort = 0) {
        const tasks = this.tasks;
        const sortedTasks = this.sortTasks(tasks, sort);
        this.currentTasks_container.innerHTML = "";
        this.completedTasks_container.innerHTML = "";

        sortedTasks.forEach(task => {
            if (!task.isCompleted) {
                this.currentTasks_container.append(task.render())
            } else {
                this.completedTasks_container.append(task.render());
            }
        });

        this.setHeaders();
    }

    sortTasks(arr, sort) {
        const sortArr = arr.sort(this._sortByDate);
        return !sort ? sortArr : sortArr.reverse();
    };

    _sortByDate(a, b) {
        return new Date(b.date) - new Date(a.date);
    };

    updateEditModal(id) {
        const currentTasks = this.tasks;
        const taskIndex = currentTasks.findIndex(task => task.id == id);
        const form = this.editModalForm;
        form.elements.task_id.value = id;
        form.inputTitle.value = currentTasks[taskIndex].title;
        form.inputText.value = currentTasks[taskIndex].text;
        form.priorityRadios.value = currentTasks[taskIndex].priority;
    }

    setHeaders() {
        const toDo = this.tasks.filter(task => !task.isCompleted).length;
        const completed = this.tasks.length - toDo;

        document.querySelector("#toDo").innerHTML = `ToDo (${toDo})`;
        document.querySelector("#completed").innerHTML = `Completed (${completed})`;
    }
}