const appThemes = {
    navbar: {
        light: "bg-light",
        dark: "bg-secondary"
    },

    container: {
        light: "bg-transparent",
        dark: "bg-dark"
    }
}

const navbar = document.querySelector(".navbar"),
    container = document.querySelector(".wrapper"),
    themeSwitcher = document.querySelector("#slider"),
    logo = document.querySelector("#logo");


if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light");
}

const theme = localStorage.getItem("theme");

let isLightTheme = (theme === "light") ? true : false;

if (isLightTheme) {
    setLightTheme();
} else {
    setDarkTheme();
    themeSwitcher.checked = true;
}


themeSwitcher.addEventListener("change", () => {
    if (isLightTheme) {
        setDarkTheme();
    } else {
        setLightTheme();
    }
    isLightTheme = !isLightTheme;
});

function setLightTheme() {
    navbar.classList.remove(appThemes.navbar.dark);
    container.classList.remove(appThemes.container.dark);
    navbar.classList.add(appThemes.navbar.light);
    container.classList.add(appThemes.container.light);
    console.log(logo);
    logo.src = "img/logo.svg";
    localStorage.setItem("theme", "light");
}

function setDarkTheme() {
    navbar.classList.remove(appThemes.navbar.light);
    container.classList.remove(appThemes.container.light);
    navbar.classList.add(appThemes.navbar.dark);
    container.classList.add(appThemes.container.dark);
    console.log(logo);
    logo.src = "img/logo_light.svg";
    localStorage.setItem("theme", "dark");
}