let imgContainers = Array.from(document.getElementsByClassName("history_img"));

imgContainers.forEach(imgContainer => {
    imgContainer.addEventListener("click", (event) => createModalFromImg(event));
});

function createModalFromImg(event) {
    if (event.target.tagName.toLowerCase() !== "img")
        return;

    const modalContent = document.createElement("div");
    modalContent.style.display = "flex";
    modalContent.style.flexDirection = "column";
    modalContent.style.alignItems = "center";

    const img = document.createElement("img");
    img.src = event.target.src;
    img.alt = event.target.alt;
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    modalContent.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = event.target.parentElement.querySelector("figcaption").innerText;
    figcaption.style.fontSize = "larger";
    figcaption.style.width = "90%";
    figcaption.style.textAlign = "center";
    modalContent.appendChild(figcaption);

    createModal(modalContent, true);
}