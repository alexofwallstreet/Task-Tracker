const btn_asc = document.querySelector(".btn_sort_asc"),
    btn_desc = document.querySelector(".btn_sort_desc");

if (!localStorage.getItem('sort')) {
    localStorage.setItem('sort', 0);
    setPrimary(btn_asc, btn_desc);
} else {
    if (localStorage.getItem('sort') == 0) {
        setPrimary(btn_asc, btn_desc);
    } else if (localStorage.getItem('sort') == 1) {
        setPrimary(btn_desc, btn_asc);
    }
}

btn_asc.addEventListener("click", () => {

    localStorage.setItem('sort', 0);

    showTasks = getTasksToShow(tasks);

    renderTasks(showTasks);

    setPrimary(btn_asc, btn_desc);
});

btn_desc.addEventListener("click", () => {

    localStorage.setItem('sort', 1);

    showTasks = getTasksToShow(tasks);

    renderTasks(showTasks);

    setPrimary(btn_desc, btn_asc);
});



function getTasksToShow(arr) {
    if (localStorage.getItem("sort") == 0) {
        return arr.sort(sortByDateAsc);
    }
    return arr.sort(sortByDateDesc);
}



function sortByDateAsc(a, b) {
    return new Date(b.date) - new Date(a.date);
};

function sortByDateDesc(a, b) {
    return new Date(a.date) - new Date(b.date);
};


function setPrimary(btn_primary, btn_secondary) {
    btn_primary.classList.remove("btn-secondary");
    btn_primary.classList.add("btn-primary");

    btn_secondary.classList.remove("btn-primary");
    btn_secondary.classList.add("btn-secondary");
}