/* Canvas */
const colorWheel = new ColorWheel(document.getElementById("canvas"), 9);
colorWheel._c.addEventListener("colorChanged", fillColorList);
const colorListContainer = document.getElementById("color_list_container");
fillColorList();

/* Navigation, switching modes */
const breadcrumbs = document.getElementById("color_scheme_navigation").children;
for (let i = 0; i < breadcrumbs.length; i++) {
    if (breadcrumbs[i].textContent !== '/') {
        breadcrumbs[i].addEventListener("click", (event) => breadcrumbHandler(event));
    }
}

/* Images */
const descriptionElement = document.getElementById("cs_col1");
descriptionElement.addEventListener("click", (event) => {
    const targetImgContainer = event.target.closest(".color_scheme_img");
    if (targetImgContainer == null)
        return;

    const targetImg = Array.from(targetImgContainer.children).find((child) => child.tagName.toLowerCase() === "img");
    const normalImagePath = targetImg.src.replace("_small", "");
    window.open(normalImagePath, '_blank');
});

/* Functions */

function fillColorList() {
    const choosenShades = colorWheel.getChoosenShades();
    colorListContainer.innerHTML = "";
    choosenShades.forEach(shade => {
        const rgbString = colorWheel.createRGBString(shade);
        const hexString = colorWheel.createHEXString(shade);
        const isLight = colorWheel.isLight(shade);

        const trElement = document.createElement("tr");
        trElement.style.background = rgbString;

        const tdElementHex = document.createElement("td");
        tdElementHex.innerText = hexString;
        const tdElementRgb = document.createElement("td");
        tdElementRgb.innerText = rgbString;

        if (isLight) {
            tdElementHex.style.color = "black";
            tdElementRgb.style.color = "black";
        } else {
            tdElementHex.style.color = "white";
            tdElementRgb.style.color = "white";
        }

        trElement.appendChild(tdElementHex);
        trElement.appendChild(tdElementRgb);
        colorListContainer.appendChild(trElement);
    });
}

function breadcrumbHandler(event) {
    if (event.target.classList.contains("active"))
        return;

    if (!hideCurrentSection(removeActiveClass()))
        return;

    event.target.classList.add("active");
    const sectionId = event.target.innerText.toLowerCase();
    const newSection = document.getElementById(sectionId);
    colorWheel.setColorSchemeMode(sectionId);

    newSection.classList.remove("hide");
    newSection.classList.add("display_flex");

    const textBelowCanvas = document.getElementById("current_mode");
    textBelowCanvas.innerText = event.target.innerHTML;
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
