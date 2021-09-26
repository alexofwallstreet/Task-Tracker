//Task information to Edit
const btn_editTask = document.querySelector("#btn_editTask"),
    input_title_edit = document.querySelector("#inputTitle_edit"),
    input_text_edit = document.querySelector("#inputText_edit"),
    color_select_edit = document.querySelector("select[name=colorSelect_edit]");


btn_editTask.addEventListener("click", (e) => {
    const index = document.querySelector("#task_id_edit").value;
    const title = input_title_edit.value,
        text = input_text_edit.value,
        priority = document.querySelector("input[name=priorityRadios_edit]:checked").value,
        theme = color_select_edit.options[color_select_edit.selectedIndex].value;

    tasks[index].title = title;
    tasks[index].text = text;
    tasks[index].priority = priority;
    tasks[index].theme = theme;
    updateStorageTasks(tasks);
});

function updateEditModal(id) {
    const taskIndex = tasks.findIndex(task => task.id == id);
    document.querySelector("#task_id_edit").value = taskIndex;
    input_title_edit.value = tasks[taskIndex].title;
    input_text_edit.value = tasks[taskIndex].text;
    document.querySelector(`input[name=priorityRadios_edit][value=${tasks[taskIndex].priority}]`).checked = true;

    for (let i = 0; i < color_select_edit.options.length; i++) {
        if (color_select_edit.options[i].value === tasks[taskIndex].theme) {
            color_select_edit.options[i].selected = true;
            break;
        }
    }

}