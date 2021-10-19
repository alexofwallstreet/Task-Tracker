export default class Task {
    constructor(title, text, isCompleted = false, priority = "l", date = new Date()) {
        this.id = Task.getId();
        this.title = title;
        this.text = text;
        this.priority = priority;
        this.date = date;
        this.isCompleted = isCompleted;
    }

    static _currentId = 100;

    static getId() {
        return Task._currentId++;
    }

    static themes = {
        default: {
            color: "#000",
            background: "#fff"
        },
        blue: {
            color: "#3575D5",
            background: "#C3D7F6"
        },
        red: {
            color: "#C15751",
            background: "#E9D4D3"
        },
        green: {
            color: "#3B6528",
            background: "#DEFCD0"
        },
        purple: {
            color: "#571491",
            background: "#EEE5F6"
        },
        low: {
            color: "#3B6528",
            background: "#DEFCD0"
        },
        medium: {
            color: "#571491",
            background: "#EEE5F6"
        },
        high: {
            color: "#C15751",
            background: "#E9D4D3"
        }
    };

    static priorities = {
        h: "high",
        m: "medium",
        l: "low"
    };

    getPriority() {
        return Task.priorities[this.priority];
    }

    getTextColor() {
        return Task.themes[this.getPriority()].color;
    }

    getBackgroundColor() {
        return Task.themes[this.getPriority()].background;
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
            color: ${this.getTextColor()};
            background-color: ${this.getBackgroundColor()};
        `;

        html.innerHTML = `
            <div class="w-100 mr-2">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${this.title}</h5>
                    <div>
                        <small class="mr-2">${Task.priorities[this.priority]} priority</small>
                        <small>${Task.formatDate(this.date)}</small>
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


    static formatDate(date) {

        let hh = date.getHours();
        if (hh < 10) {
            hh = `0${hh}`;
        }

        let min = date.getMinutes();
        if (min < 10) {
            min = `0${min}`;
        }

        let dd = date.getDate();
        if (dd < 10) {
            dd = `0${dd}`;
        }

        let mm = date.getMonth() + 1;
        if (mm < 10) {
            mm = `0${mm}`;
        }

        let yy = date.getFullYear();

        return `${hh}:${min} ${dd}.${mm}.${yy}`
    }
}