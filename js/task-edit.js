//Task information to Edit
const btn_editTask = document.querySelector("#btn_editTask"),
    input_title_edit = document.querySelector("#inputTitle_edit"),
    input_text_edit = document.querySelector("#inputText_edit");


btn_editTask.addEventListener("click", (e) => {
    e.preventDefault();

    const index = document.querySelector("#task_id_edit").value;
    const title = input_title_edit.value,
        text = input_text_edit.value,
        priority = document.querySelector("input[name=priorityRadios_edit]:checked").value;

    tasks[index].title = title;
    tasks[index].text = text;
    tasks[index].priority = priority;

    updateStorageTasks(tasks);
    resetEditForm();
});

function updateEditModal(id) {
    const taskIndex = tasks.findIndex(task => task.id == id);
    document.querySelector("#task_id_edit").value = taskIndex;
    input_title_edit.value = tasks[taskIndex].title;
    input_text_edit.value = tasks[taskIndex].text;
    document.querySelector(`input[name=priorityRadios_edit][value=${tasks[taskIndex].priority}]`).checked = true;
}

function resetEditForm() {
    input_title_edit.value = "";
    input_text_edit.value = "";
    document.querySelector("input[name=priorityRadios_edit]").checked = true;
    $('#editModal').modal('hide');
}