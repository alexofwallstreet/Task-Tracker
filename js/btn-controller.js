export default class BtnController {
    constructor(taskController, storage, formAdd = "#add_form", formEdit = "#edit_form", btnContainer = ".main-content",
        btnTaskCompleteClass = "btn_completeTask", btnTaskEditClass = "btn_editTask", btnTaskDeleteClass = "btn_deleteTask") {

        this.taskController = taskController;
        this.storage = storage;
        this.addForm = document.querySelector(formAdd);
        this.addForm.addEventListener("submit", this.addFormSubmitHandler);
        this.editForm = document.querySelector(formEdit);
        this.editForm.addEventListener("submit", this.editFormSubmitHandler);
        this.container = document.querySelector(btnContainer);
        this.container.addEventListener("click",
            (event) => this.containerClickHandler(event.target, btnTaskCompleteClass, btnTaskEditClass, btnTaskDeleteClass)
        );
        document.querySelector(".btn-add-task-modal").addEventListener("click", () => {
            this.resetForm(this.addForm, "#addModal");
        })
    }

    addFormSubmitHandler = (e) => {
        e.preventDefault();
        const { title, text, priority } = this.getFormValues(this.addForm);
        if (title && text && priority) {
            const task = this.taskController.createTask(title, text, priority);
            this.taskController.addTask(task);
            this.updateTasks(this.taskController.tasks, this.storage.getStorageSorting());
            this.resetForm(this.addForm, "#addModal");
        } else {
            alert("Please, input all fields!");
        }
    }

    editFormSubmitHandler = (e) => {
        e.preventDefault();
        const id = this.editForm.task_id.value;
        const { title, text, priority } = this.getFormValues(this.editForm);
        if (title && text && priority) {
            this.taskController.updateTask({ id, title, text, priority });
            this.updateTasks(this.taskController.tasks, this.storage.getStorageSorting());
            this.resetForm(this.editForm, "#editModal");
        } else {
            alert("Please, input all fields!");
        }
    }

    resetForm = (form, modal) => {
        $(modal).modal('hide');
        form.reset();
    }

    getFormValues = (form) => {
        return {
            title: form.inputTitle.value,
            text: form.inputText.value,
            priority: form.priorityRadios.value
        }
    }

    containerClickHandler = (target, completeClass, editClass, deleteClass) => {
        if (target.classList.contains(completeClass)) {
            const taskId = target.dataset.id;
            this.taskController.completeTask(taskId);
        }
        else if (target.classList.contains(editClass)) {
            const taskId = target.dataset.id;
            this.taskController.updateEditModal(taskId);
        }
        else if (target.classList.contains(deleteClass)) {
            const taskId = target.dataset.id;
            this.taskController.deleteTask(taskId);
        }
        else {
            return null;
        }
        this.updateTasks(this.taskController.tasks, this.storage.getStorageSorting());
    }

    updateTasks = (tasks, sort) => {
        this.storage.updateStorageTasks(tasks);
        this.taskController.renderTasks(sort);
    }
}