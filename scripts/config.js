/* The main purpose of this file is to bundle global variables and functions into one file. */

/********************************************/
/* Code here!                               */

/* Globals */
var isMobileDevice = () => !window.matchMedia("(min-width: 767px)").matches;

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
        close.addEventListener("click", () => {
            modal.remove();
        }, "once")
    } else {
        close.addEventListener("click", () => {
            modal.style.display = "none";
        })
    }
}

function safeStringComparison(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
}