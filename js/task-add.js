//Task information to Add
const btn_addTask = document.querySelector("#btn_addTask"),
    input_title = document.querySelector("#inputTitle"),
    input_text = document.querySelector("#inputText"),
    color_select = document.querySelector("select[name=colorSelect]");

btn_addTask.addEventListener("click", (e) => {
    e.preventDefault();

    const title = input_title.value,
        text = input_text.value,
        priority = document.querySelector("input[name=priorityRadios]:checked").value,
        theme = color_select.options[color_select.selectedIndex].value;

    const task = new Task(title, text, false, priority, theme);
    tasks.push(task);
    updateStorageTasks(tasks);
    resetAddForm();
});

function resetAddForm() {
    input_title.value = "";
    input_text.value = "";
    document.querySelector("input[name=priorityRadios]").checked = true;
    color_select.selectedIndex = 0;
    $('#addModal').modal('hide');
}