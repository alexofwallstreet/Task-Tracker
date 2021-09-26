document.querySelectorAll(".btn_deleteTask").forEach(btn => {
    btn.addEventListener("click", () => {
        const taskId = btn.dataset.id;
        deleteTask(taskId);
    });
});

function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id == id);
    tasks = [
        ...tasks.splice(0, taskIndex),
        ...tasks.splice(taskIndex + 1)
    ];
    updateStorageTasks(tasks);
    location.reload();
}
