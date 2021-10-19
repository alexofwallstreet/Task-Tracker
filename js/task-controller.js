export default class TaskController {

    _tasks = [];

    currentTasks_container = document.querySelector("#currentTasks");
    completedTasks_container = document.querySelector("#completedTasks");

    setTasks(newTasks) {
        this._tasks = newTasks;
    }

    getTasks() {
        return this._tasks;
    }

    addTask(task) {
        const newTasks = this.getTasks();
        newTasks.push(task);
        this.setTasks(newTasks);
    }

    updateTask(props) {
        const currentTasks = this.getTasks();


        const { id, title, text, priority } = props;

        const newTasks = currentTasks.map(task => {
            if (task.id == id) {
                task.title = title;
                task.text = text;
                task.priority = priority;
            }
            return task;
        });

        this.setTasks(newTasks);
    }

    completeTask(id) {
        const currentTasks = this.getTasks();

        const newTasks = currentTasks.map(task => {
            if (task.id == id) {
                task.isCompleted = !task.isCompleted;
            }
            return task;
        });

        this.setTasks(newTasks);
    }

    deleteTask(id) {

        const currentTasks = this.getTasks();
        const newTasks = currentTasks.filter(task => task.id != id);
        this.setTasks(newTasks);
    }

    renderTasks(sort = "asc") {

        const tasks = this.getTasks();
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

        const sortArr = arr.sort(sortByDate);
        return (sort === "asc") ? sortArr : sortArr.reverse();

        function sortByDate(a, b) {
            return new Date(b.date) - new Date(a.date);
        };
    }

    updateEditModal(id) {
        const currentTasks = this.getTasks();
        const taskIndex = currentTasks.findIndex(task => task.id == id);
        document.querySelector("#task_id_edit").value = id;
        document.querySelector("#inputTitle_edit").value = currentTasks[taskIndex].title;
        document.querySelector("#inputText_edit").value = currentTasks[taskIndex].text;
        document.querySelector(`input[name=priorityRadios_edit][value=${currentTasks[taskIndex].priority}]`).checked = true;
    }

    setHeaders() {
        const toDo = this.getTasks().filter(task => !task.isCompleted).length;
        const completed = this.getTasks().length - toDo;

        document.querySelector("#toDo").innerHTML = `ToDo (${toDo})`;
        document.querySelector("#completed").innerHTML = `Completed (${completed})`;
    }
}