const darkModeInput = document.getElementById("dark_mode_toggle");
darkModeInput.addEventListener("change", (event) => {
    if (event.target.checked) {
        setCookie("dark_mode_enabled", true, 30);
        setDarkMode();
    } else {
        setCookie("dark_mode_enabled", false, 30);
        revertDarkMode();
    }
});

let currentMode = getCookie("dark_mode_enabled");
if (currentMode === "true") {
    darkModeInput.checked = true;
    setDarkMode();
}
else { setCookie("dark_mode_enabled", false, 30); }


/* Functions */
function setDarkMode() {
    const root = document.documentElement;
    root.classList.add("dark_mode");
}

function revertDarkMode() {
    const root = document.documentElement;
    root.classList.remove("dark_mode");
}