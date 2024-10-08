/* The main purpose of this file is to bundle global variables and functions into one file. */

/********************************************/
/* Code here!                               */

/* Globals */
var isMobileDevice = () => !window.matchMedia("(min-width: 767px)").matches;

var isTouchDevice = () => {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
}

var getCurrentPage = () => (window.location.pathname).substring((window.location.pathname).lastIndexOf('/') + 1);

var isHomePage = () => {
    let currentPage = getCurrentPage();
    if (currentPage.length === 0)
        return true; // In case of running it on a server
    else
        return safeStringComparison(currentPage, "index.html");
}

var getPages = () =>
    [
        {
            name: "Home",
            path: "index.html",
        },
        {
            name: "History",
            path: "history.html",
        },
        {
            name: "Schemes",
            path: "color_scheme.html",
        },
        {
            name: "Palettes",
            path: "color_palette.html",
        },
        {
            name: "Contact",
            path: "contact.html",
        }
    ];

var getSocials = () =>
    [
        {
            alt: "Facebook",
            src: "media/icons/social_media/icons8-facebook-48.png",
            href: "https://www.facebook.com/"
        },
        {
            alt: "Instagram",
            src: "media/icons/social_media/icons8-instagram-48.png",
            href: "https://www.instagram.com/"
        },
        {
            alt: "LinkedIn",
            src: "media/icons/social_media/icons8-linkedin-48.png",
            href: "https://www.linkedin.com/"
        },
        {
            alt: "YouTube",
            src: "media/icons/social_media/icons8-youtube-48.png",
            href: "https://www.youtube.com/"
        }
    ];

/* Global and helper functions */
function createModal(modalContent, selfRemove = false) {
    /* Requires modal.css to work! */
    const modal = document.createElement("div");
    const close = document.createElement("span");
    close.innerHTML = '&times;';

    modalContent.classList.add("modal_content");
    modal.classList.add("modal");
    close.classList.add("close");

    modalContent.insertBefore(close, modalContent.firstChild);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    if (selfRemove) {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                modal.remove();
            }
        }), "once";
        close.addEventListener("click", () => {
            modal.remove();
        }, "once")
    } else {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                modal.style.display = "none";
            }
        });
        close.addEventListener("click", () => {
            modal.style.display = "none";
        })
    }
}

function createModalFromFigure(img) {
    /* Expected HTML structure:
    <figure>
        <img src="" alt""> <!-- expecting this img -->
        <figcaption>
        </figcaption>
    </figure>
    */
    const modalContent = document.createElement("div");
    modalContent.style.display = "flex";
    modalContent.style.flexDirection = "column";
    modalContent.style.alignItems = "center";

    const imgElement = document.createElement("img");
    imgElement.src = img.src;
    imgElement.alt = img.alt;
    imgElement.style.maxWidth = "100%";
    imgElement.style.maxHeight = "100%";
    modalContent.appendChild(imgElement);

    const originalFigcaption = img.parentElement.querySelector("figcaption");
    if (originalFigcaption !== null) {
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = originalFigcaption.innerText;
        figcaption.style.fontSize = "larger";
        figcaption.style.width = "90%";
        figcaption.style.textAlign = "center";
        modalContent.appendChild(figcaption);
    }

    createModal(modalContent, true);
}

function safeStringComparison(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
}

async function copyColor(event, targetClassName) {
    if (!event.target.parentElement.classList.contains(targetClassName))
        return;

    try {
        await navigator.clipboard.writeText(event.target.innerText);
    } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = event.target.innerText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

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

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}