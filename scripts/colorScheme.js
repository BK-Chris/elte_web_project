const breadcrumbs = document.getElementById("color_scheme_navigation").children;
const descriptionElement = document.getElementById("color_scheme_description");

for (let i = 0; i < breadcrumbs.length; i++) {
    if (breadcrumbs[i].textContent !== '/') {
        breadcrumbs[i].addEventListener("click", (event) => breadcrumbHandler(event));
    }
}

descriptionElement.addEventListener("click", (event) => {
    const targetImgContainer = event.target.closest(".color_scheme_img");
    if (targetImgContainer == null)
        return;
    
    const targetImg = Array.from(targetImgContainer.children).find((child) => child.tagName.toLowerCase() === "img");
    console.log(targetImg.src);
    const normalImagePath = targetImg.src.replace("_small","");
    window.location.href = normalImagePath;
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
