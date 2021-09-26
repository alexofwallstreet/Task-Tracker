function getStorageTasks() {

    const tasks = [];

    let jsonTasks = [];
    //getting tasks from LocalStorage
    try {
        jsonTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    catch {
        jsonTasks = [
            new Task("Homework", "Do my homework", false, "h", "default", new Date(2021, 6, 21)),
            new Task("Breakfast", "Have a nice breakfast", false, "m", "default", new Date(2021, 7, 21)),
            new Task("Music", "Listen to music", false, "l", "default", new Date(2021, 8, 21))
        ]
    }
    finally {
        if (!jsonTasks) {
            jsonTasks = [
                new Task("Homework", "Do my homework", false, "h", "blue", new Date(2021, 6, 21)),
                new Task("Breakfast", "Have a nice breakfast", false, "m", "default", new Date(2021, 7, 21)),
                new Task("Music", "Listen to music", false, "l", "default", new Date(2021, 8, 21))
            ];
            localStorage.setItem("tasks", jsonTasks);
        }
        jsonTasks.forEach(task => {
            tasks.push(new Task(task.title, task.text, task.isCompleted, task.priority, task.theme, new Date(task.date)));
        });
    }

    return tasks;
}



function updateStorageTasks(tasks_to_update) {
    localStorage.setItem("tasks", JSON.stringify(tasks_to_update));
    tasks = tasks_to_update;
    renderTasks();
}