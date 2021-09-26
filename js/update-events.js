function update_events() {
    document.querySelectorAll(".btn_completeTask").forEach(btn => {
        btn.addEventListener("click", () => {
            const taskId = btn.dataset.id;
            completeTask(taskId);
        });
    });

    document.querySelectorAll(".btn_editTask").forEach(btn => {
        btn.addEventListener("click", () => {
            const taskId = btn.dataset.id;
            updateEditModal(taskId);
        });
    });

    document.querySelectorAll(".btn_deleteTask").forEach(btn => {
        console.log(tasks);

        btn.addEventListener("click", () => {
            const taskId = btn.dataset.id;
            deleteTask(taskId);
        });
    });
}