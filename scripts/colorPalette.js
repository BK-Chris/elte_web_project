const targetClassName = "color_shade";
const colorPalettesContainer = document.getElementById("color_palettes_container");

adjustTextColorByLuminance(targetClassName, "white", "black");

colorPalettesContainer.addEventListener("click", (event) => copyColor(event, targetClassName));

window.addEventListener('beforeprint', () => {
    const detailsElements = document.querySelectorAll('details');
    detailsElements.forEach(details => {
        details.open = true;
    });
});

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