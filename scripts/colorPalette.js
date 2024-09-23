const targetClassName = "color_shade";
const colorPalettesContainer = document.getElementById("color_palettes_container");

adjustTextColorByLuminance(targetClassName, "var(--light-text)", "var(--dark-text)");

colorPalettesContainer.addEventListener("click", (event) => copyColor(event));

async function copyColor(event) {
    if (!event.target.parentElement.classList.contains(targetClassName))
        return;
    navigator.clipboard.writeText(event.target.innerText);

    event.target.style.pointerEvents = "none";
    await flashElement(event.target);
    event.target.style.pointerEvents = "auto";
}

async function flashElement(element) {
    const originalBackgroundColor = element.style.backgroundColor;
    element.style.backgroundColor = "white";
    await new Promise(resolve => setTimeout(resolve, 150));
    element.style.backgroundColor = originalBackgroundColor;
}

function adjustTextColorByLuminance(className, lightColor = "#FFFFFF", darkColor = "#000000") {
    const colorShades = document.getElementsByClassName(className);
    for (let i = 0; i < colorShades.length; i++) {
        let bgColor = colorShades[i].style.backgroundColor;
        let rgbValues = [];
        rgbValues = bgColor.replace("rgb(", "").replace(")", "").trim().split(',');

        let red = Number(rgbValues[0].trim());
        let green = Number(rgbValues[1].trim());
        let blue = Number(rgbValues[2].trim());

        if (isLight(red, green, blue)) {
            colorShades[i].style.color = darkColor;
        } else {
            colorShades[i].style.color = lightColor;
        }
    }
}

function isLight(red, green, blue) {
    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    return luminance > 128 ? true : false;
}