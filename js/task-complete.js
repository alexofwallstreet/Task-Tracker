document.querySelectorAll(".btn_completeTask").forEach(btn => {
    btn.addEventListener("click", () => {
        const taskId = btn.dataset.id;
        completeTask(taskId);
    });
});

function completeTask(id) {
    const taskIndex = tasks.findIndex(task => task.id == id);
    tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
    updateStorageTasks(tasks);
    location.reload();
}