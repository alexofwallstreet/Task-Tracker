function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id == id);
    console.log("before");
    console.log(tasks);
    const newTasks = [
        ...tasks.slice(0, taskIndex),
        ...tasks.slice(taskIndex + 1)
    ];
    console.log("after");

    console.log(newTasks);

    updateStorageTasks(newTasks);
}
