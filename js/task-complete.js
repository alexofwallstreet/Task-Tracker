function completeTask(id) {
    const taskIndex = tasks.findIndex(task => task.id == id);
    tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
    updateStorageTasks(tasks);
}