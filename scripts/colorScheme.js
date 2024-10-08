/*
Requires config.js:
    safeStringComparison(str1,str2)
    copyColor(event)
*/
const targetClassName = "color_shade";
const availableColorSchemeModes = ["monochromatic", "analogous", "complementary", "split-complementary", "triadic", "tetradic", "square"];

const descriptionContainer = document.getElementById("color_scheme_description");
const breadcrumbs = Array.from(document.getElementById("color_scheme_navigation").children).filter(breadcrumb => breadcrumb.innerText !== '/'); // the navigation on top
const prevModeDiv = document.getElementById("previous_mode");
const nextModeDiv = document.getElementById("next_mode");
const currentModeDiv = document.getElementById("current_mode"); // the text between prev and next element

const colorWheelCanvas = new ColorWheel(document.getElementById("canvas"), isTouchDevice(), 7,);
const colorListContainer = document.getElementById("color_list_container");

/* Event listeneres */
/* Navigation event listeners */
breadcrumbs.forEach(breadcrumb => { breadcrumb.addEventListener("click", (event) => switchColorSchemeMode(event)); });
prevModeDiv.addEventListener("click", (event) => switchColorSchemeMode(event));
nextModeDiv.addEventListener("click", (event) => switchColorSchemeMode(event));

/* ColorWheel event listeners */
colorWheelCanvas._c.addEventListener("colorChanged", fillColorList);

/* Bigger image request event listener and handler */
descriptionContainer.addEventListener("click", (event) => {
    const targetImgContainer = event.target.closest(".color_scheme_img");
    if (targetImgContainer == null)
        return;

    const targetImg = Array.from(targetImgContainer.children).find((child) => child.tagName.toLowerCase() === "img");
    const normalImagePath = targetImg.src.replace("_small", "");
    window.open(normalImagePath, '_blank');
});

colorListContainer.addEventListener("click", (event) => copyColor(event, targetClassName));

fillColorList();

/* Functions*/
function switchColorSchemeMode(event) {
    let colorSchemeId;
    if (availableColorSchemeModes.includes(event.target.innerText.toLowerCase())) {
        colorSchemeId = event.target.innerText.toLowerCase();
        removeActiveClassFromNavigation();
    } else if (event.target.id === "previous_mode") {
        let lastActiveColorScheme = removeActiveClassFromNavigation();
        if (lastActiveColorScheme === null) { console.error("Something went wrong here."); return; }
        let lastIndex = availableColorSchemeModes.findIndex(mode => mode === lastActiveColorScheme);
        let newIndex = (lastIndex === 0) ? availableColorSchemeModes.length - 1 : lastIndex - 1;
        colorSchemeId = availableColorSchemeModes[newIndex];
    }
    else if (event.target.id === "next_mode") {
        let lastActiveColorScheme = removeActiveClassFromNavigation();
        if (lastActiveColorScheme === null) { console.error("Something went wrong here."); return; }
        let lastIndex = availableColorSchemeModes.findIndex(mode => mode === lastActiveColorScheme);
        let newIndex = (lastIndex === availableColorSchemeModes.length - 1) ? 0 : lastIndex + 1;
        colorSchemeId = availableColorSchemeModes[newIndex];
    } else return;

    toggleDescription(colorSchemeId);
    colorWheelCanvas.setColorSchemeMode(colorSchemeId);
    addActiveClassToNavigation(colorSchemeId);
    currentModeDiv.textContent = breadcrumbs.find(breadcrumb => breadcrumb.classList.contains("active")).innerText;
}

/* Navigation */
function removeActiveClassFromNavigation() {
    let index = 0;
    while (index !== breadcrumbs.length && !breadcrumbs[index].classList.contains("active")) index++;
    if (index !== breadcrumbs.length) {
        breadcrumbs[index].classList.remove("active");
        return breadcrumbs[index].textContent.toLowerCase();
    }
    return null;
}

function addActiveClassToNavigation(colorSchemeId) {
    let index = 0;
    while (index !== breadcrumbs.length && !safeStringComparison(breadcrumbs[index].innerText, colorSchemeId)) index++;
    (index !== breadcrumbs.length)
        ? breadcrumbs[index].classList.add("active")
        : console.error(`Did not found the requested ID: [${colorSchemeId}]`);
}

function toggleDescription(colorSchemeId) {
    let currentActiveDescription = Array.from(descriptionContainer.children).find(element => element.classList.contains("display_flex"));
    currentActiveDescription.classList.remove("display_flex");
    currentActiveDescription.classList.add("hide");

    let newColorSchemeDescription = document.getElementById(colorSchemeId);
    newColorSchemeDescription.classList.remove("hide");
    newColorSchemeDescription.classList.add("display_flex");
}

/* Color changes */
function fillColorList() {
    const choosenShades = colorWheelCanvas.getChoosenShades();
    colorListContainer.innerHTML = "";
    choosenShades.forEach(shade => {
        const rgbString = colorWheelCanvas.createRGBString(shade);
        const hexString = colorWheelCanvas.createHEXString(shade);
        const isLight = colorWheelCanvas.isLight(shade);

        const trElement = document.createElement("tr");
        trElement.classList.add(targetClassName);
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