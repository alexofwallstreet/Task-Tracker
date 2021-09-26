document.querySelectorAll(".btn_deleteTask").forEach(btn => {
    btn.addEventListener("click", () => {
        const taskId = btn.dataset.id;
        deleteTask(taskId);
    });
});