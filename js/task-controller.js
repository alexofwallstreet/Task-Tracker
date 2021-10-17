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

        const { index, title, text, priority } = props;
        currentTasks[index].title = title;
        currentTasks[index].text = text;
        currentTasks[index].priority = priority;

        this.setTasks(currentTasks);
    }

    completeTask(id) {
        const currentTasks = this.getTasks();

        const taskIndex = currentTasks.findIndex(task => task.id == id);
        currentTasks[taskIndex].isCompleted = !currentTasks[taskIndex].isCompleted;
        this.setTasks(currentTasks);
    }

    deleteTask(id) {

        const currentTasks = this.getTasks();
        const taskIndex = currentTasks.findIndex(task => task.id == id);

        const newTasks = [
            ...currentTasks.slice(0, taskIndex),
            ...currentTasks.slice(taskIndex + 1)
        ];

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
        if (sort === "asc") {
            return arr.sort(sortByDateAsc);
        }
        return arr.sort(sortByDateDesc);

        function sortByDateAsc(a, b) {
            return new Date(b.date) - new Date(a.date);
        };

        function sortByDateDesc(a, b) {
            return new Date(a.date) - new Date(b.date);
        };
    }

    updateEditModal(id) {
        const currentTasks = this.getTasks();
        const taskIndex = currentTasks.findIndex(task => task.id == id);
        document.querySelector("#task_id_edit").value = taskIndex;
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