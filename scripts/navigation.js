/*
Requires:
- isHomePage(),  // from config.js
- getPages(),    // from config.js
- getSocials()   // from config.js
*/

populateMenu();
populateSocials();

const toggleMenu = document.getElementById("toggle_menu");
toggleMenu.addEventListener("click", () => { changeAppearance(); });
window.addEventListener("resize", () => { // To prevent from menu items disappearing upon switching to non mobile view from mobile view
    if (!isMobileDevice()) {
        changeAppearance("flex");
    } else {
        changeAppearance("none");
    }
});

/* Functions */

function populateMenu() {
    const _isHomePage = isHomePage();
    const menuContainer = document.getElementById("menu");
    const pages = getPages();

    pages.forEach(page => {
        const anchor = document.createElement("a");
        anchor.classList.add("menu_item");
        anchor.text = page.name;

        if (safeStringComparison(page.path, getCurrentPage())) {
            anchor.classList.add("active");
            anchor.href = "";
        } else {
            anchor.classList.add("hover");
            if (_isHomePage) {
                anchor.href = "./pages/" + page.path
            } else if (!safeStringComparison(page.name, "Home")) {
                anchor.href = "../pages/" + page.path;
            } else {
                anchor.href = "../" + page.path;
            }
        }
        menuContainer.appendChild(anchor);
    });
    const anchor = document.createElement("a");
    const img = document.createElement("img");

    /* Toggle menu item, only shown in mobile view */
    img.ariaHidden = true;
    img.src = (_isHomePage)
        ? "./media/icons/icons8-hamburger-50.png"
        : "../media/icons/icons8-hamburger-50.png";
    img.alt = "Clickable logo.";
    anchor.id = "toggle_menu";
    anchor.appendChild(img);

    menuContainer.append(anchor);
}

function populateSocials() {
    const _isHomePage = isHomePage();
    const socialContainer = document.getElementById("socials");
    const socials = getSocials();

    socials.forEach(link => {
        const anchor = document.createElement("a");
        const img = document.createElement("img");

        anchor.href = link.href;
        img.alt = link.alt;
        (_isHomePage) ?
            img.src = link.src :
            img.src = "../" + link.src;

        anchor.appendChild(img);
        socialContainer.appendChild(anchor);
    });
}

function changeAppearance(display = null) {
    const menuItems = Array.from(document.getElementsByClassName("menu_item"));

    if (display !== null) {
        menuItems.forEach(menuItem => {
            if (menuItem.classList.contains("active")) return;
            menuItem.style.display = display;
        })
    } else {
        menuItems.forEach(menuItem => {
            if (menuItem.classList.contains("active")) return;

            if (menuItem.style.display === "none" || menuItem.style.display === "") {
                menuItem.style.display = "flex";
            } else {
                menuItem.style.display = "none";
            }
        })
    }
}