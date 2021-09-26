function getStorageTasks() {

    const tasks = [];

    let jsonTasks = [];
    //getting tasks from LocalStorage
    try {
        jsonTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    catch {
        jsonTasks = [
            new Task("Homework", "Do my homework", false, "h"),
            new Task("Breakfast", "Have a nice breakfast", false, "m"),
            new Task("Music", "Listen to music", false, "l")
        ]
    }
    finally {
        if (!jsonTasks) {
            jsonTasks = [
                new Task("Homework", "Do my homework", false, "h", "white", new Date(2021, 6, 21)),
                new Task("Breakfast", "Have a nice breakfast", false, "m", "white", new Date(2021, 7, 21)),
                new Task("Music", "Listen to music", false, "l", "white", new Date(2021, 8, 21))
            ]
        }
        jsonTasks.forEach(task => {
            tasks.push(new Task(task.title, task.text, task.isCompleted, task.priority, task.color, new Date(task.date)));
        });
    }

    return tasks;
}



function updateStorageTasks(tasks_to_update) {
    localStorage.setItem("tasks", JSON.stringify(tasks_to_update));
    tasks = tasks_to_update;
    renderTasks();
}