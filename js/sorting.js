export default class Sorting {

    constructor(taskController, storage, btnAsc = ".btn_sort_asc", btnDesc = ".btn_sort_desc") {
        this.storage = storage;
        this.taskController = taskController;
        this.btnAsc = document.querySelector(btnAsc);
        this.btnDesc = document.querySelector(btnDesc);
        this.sortTasks(this.storage.getStorageSorting());
        this.btnAsc.addEventListener("click", () => this.sortClickHandler(0));
        this.btnDesc.addEventListener("click", () => this.sortClickHandler(1));
    }

    sortClickHandler = (sort) => {
        this.storage.setStorageSorting(sort);
        this.sortTasks(sort)
    }

    sortTasks = (sort) => {
        this.taskController.renderTasks(sort);
        this.changeSortButton(sort);
    }

    changeSortButton = (sort) => {
        if (!sort) {
            this._tooglePrimaryBtn(this.btnAsc, this.btnDesc);
        } else {
            this._tooglePrimaryBtn(this.btnDesc, this.btnAsc);
        }
    }

    _tooglePrimaryBtn = (btn_primary, btn_secondary) => {
        btn_primary.classList.remove("btn-secondary");
        btn_primary.classList.add("btn-primary");

        btn_secondary.classList.remove("btn-primary");
        btn_secondary.classList.add("btn-secondary");
    }
}