// CreateModalFromFigure(imageElement) is defined in config.js

const breadcrumbs = document.getElementById("color_scheme_navigation").children;
let imgContainers = Array.from(document.getElementsByClassName("color_scheme_img"));

for (let i = 0; i < breadcrumbs.length; i++) {
    if (breadcrumbs[i].textContent !== '/') {
        breadcrumbs[i].addEventListener("click", (event) => breadcrumbHandler(event));
    }
}

imgContainers.forEach(imgContainer => {

    imgContainer.addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() !== "img")
            return;
        createModalFromFigure(event.target);
    });
});

/* Functions */

function breadcrumbHandler(event) {
    if (event.target.classList.contains("active"))
        return;

    if (!hideCurrentSection(removeActiveClass()))
        return;

    event.target.classList.add("active");
    const sectionId = event.target.innerText.toLowerCase();
    const newSection = document.getElementById(sectionId);

    newSection.classList.remove("hide");
    newSection.classList.add("display_flex");
}

function removeActiveClass() {
    for (let i = 0; i < breadcrumbs.length; i++) {
        if (breadcrumbs[i].classList.contains("active")) {
            breadcrumbs[i].classList.remove("active");
            return breadcrumbs[i].innerText.toLowerCase();
        }
    }
    return null;
}

function hideCurrentSection(sectionId) {
    if (sectionId == null) {
        console.error("Something went wrong :(");
        return false;
    }
    const oldSection = document.getElementById(sectionId);
    oldSection.classList.remove("display_flex");
    oldSection.classList.add("hide");
    return true;
}
