import Task from "./task-tracker.js";

export default class Storage {
    generateFakeData() {
        const fakeTasks = [
            new Task("Homework", "Do my homework", false, "h", new Date(2021, 6, 21)),
            new Task("Breakfast", "Have a nice breakfast", false, "m", new Date(2021, 7, 21)),
            new Task("Music", "Listen to music", false, "l", new Date(2021, 8, 21))
        ];

        this.updateStorageTasks(fakeTasks);
        return fakeTasks;
    }

    updateStorageTasks(newTasks) {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
    }

    getStorageTasks() {

        const tasks = [];
        let jsonTasks = [];
        jsonTasks = localStorage.getItem("tasks");

        if (!jsonTasks) {
            jsonTasks = this.generateFakeData();
        } else {
            jsonTasks = JSON.parse(jsonTasks);
        }

        jsonTasks.forEach(task => {
            tasks.push(new Task(task.title, task.text, task.isCompleted, task.priority, new Date(task.date)));
        });

        return tasks;
    }


    getStorageSorting() {
        let storageSort = localStorage.getItem("sort");
        if (!storageSort) {
            storageSort = 0;
            this.setStorageSorting(storageSort);
        }
        return +storageSort;
    }

    setStorageSorting(sort) {
        localStorage.setItem('sort', sort);
    }


    getStorageTheme() {
        let storageTheme = localStorage.getItem("theme");
        if (!storageTheme) {
            storageTheme = 'light';
            this.setStorageTheme(storageTheme);
        }
        return (storageTheme === "light") ? "light" : "dark";
    }

    setStorageTheme(theme) {
        localStorage.setItem('theme', theme);
    }

}