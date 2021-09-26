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
                new Task("Homework", "Do my homework", false, "h"),
                new Task("Breakfast", "Have a nice breakfast", false, "m"),
                new Task("Music", "Listen to music", false, "l")
            ]
        }
        jsonTasks.forEach(task => {
            tasks.push(new Task(task.title, task.text, task.isCompleted, task.priority, task.color, new Date(task.date)));
        });
    }

    return tasks;
}



function updateStorageTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

