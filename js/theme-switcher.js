export default class ThemeSwitcher {

    constructor(storage, switcher = "#slider") {
        this.switcher = document.querySelector(switcher);
        this.storage = storage;
        this.theme = this.storage.getStorageTheme();
        this.switcher.checked = (this.theme === "dark") ? true : false;
        this.setTheme(this.theme);
        this.switcher.addEventListener("change", this.changeTheme);
    };

    static themes = [
        {
            selector: ".navbar",
            light: "bg-light",
            dark: "bg-secondary"
        },

        {
            selector: ".wrapper",
            light: "bg-transparent",
            dark: "bg-dark"
        },

        {
            selector: "#logo",
            light: "logo__blue",
            dark: "logo__white"
        }
    ];

    changeTheme = () => {
        const prevTheme = this.theme;
        const newTheme = (prevTheme === "light") ? "dark" : "light";
        this.switchThemes(prevTheme, newTheme);
    }

    setTheme = (newTheme) => {
        const prevTheme = (newTheme === "light") ? "dark" : "light";
        this.switchThemes(prevTheme, newTheme);
    }

    switchThemes = (prev, next) => {
        ThemeSwitcher.themes.forEach(elem => {
            document.querySelector(elem.selector).classList.remove(elem[prev]);
            document.querySelector(elem.selector).classList.add(elem[next]);
        });
        this.theme = next;
        this.storage.setStorageTheme(next);
    }
}
