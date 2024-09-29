// CreateModalFromFigure(imageElement) is defined in config.js

let imgContainers = Array.from(document.getElementsByClassName("history_img"));

imgContainers.forEach(imgContainer => {

    imgContainer.addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() !== "img")
            return;
        createModalFromFigure(event.target);
    });
});