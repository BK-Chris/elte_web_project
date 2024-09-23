"use strict"
configureCommonElements();

function configureCommonElements() {
    const iconPath = "./media/icons/logo/icons8-color-16.png";
    const logoPath = "./media/icons/logo/icons8-color-96.png";
    const pages =
        [
            {   // Index Page
                name: "Home",
                path: "index.html",
                title: "Color Theory"
            },
            {   // History Page
                name: "History",
                path: "history.html",
                title: "History Of colors"
            },
            {   // Color Schemes Page
                name: "Schemes",
                path: "color_scheme.html",
                title: "Color Schemes"
            },
            {   // Color Palettes Page
                name: "Palettes",
                path: "color_palette.html",
                title: "Color Palettes"
            },
            {   // Contact Page
                name: "Contact",
                path: "contact.html",
                title: "Contact us!"
            }
        ];

    // TO BE IMPLEMENTED
    const socialLinks = [
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
    ]

    const pagesContainer = document.getElementById("pages");
    const socialContainer = document.getElementById("social_links");

    const titleElement = document.getElementById("title");
    const iconElement = document.getElementById("icon");
    const logoElement = document.getElementById("logo");

    // Current page
    let currentPathName = window.location.pathname;
    currentPathName = currentPathName.substring(currentPathName.lastIndexOf('/') + 1);

    const isHomePage = safeStringComparison(currentPathName, "index.html")

    if (isHomePage) {
        iconElement.href = iconPath;
        logoElement.src = logoPath;
    } else {
        iconElement.href = '.' + iconPath;
        logoElement.src = '.' + logoPath;
    }

    // Adding pages
    pages.forEach(page => {
        const anchor = document.createElement("a");

        anchor.text = page.name;
        // Setting active page
        if (safeStringComparison(page.path.substring(page.path.lastIndexOf('/') + 1), currentPathName)) {
            titleElement.text = page.title;
            anchor.classList.add("active");
            anchor.href = '#';
        } else {
            anchor.classList.add("hover");
            if (page.name !== "Home") {
                anchor.href = (isHomePage) ? "./pages/" + page.path : page.path
            } else {
                anchor.href = "../" + page.path;
            }
        }
        pagesContainer.appendChild(anchor);
    });

    // Adding Social links
    socialLinks.forEach(link => {
        const anchor = document.createElement("a");
        const img = document.createElement("img");

        anchor.href = link.href;
        img.alt = link.alt;
        (isHomePage) ?
            img.src = link.src :
            img.src = "../" + link.src;

        anchor.appendChild(img);
        socialContainer.appendChild(anchor);
    });
}

// Helper functions
function safeStringComparison(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
}