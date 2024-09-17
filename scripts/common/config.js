/* HTML Structure for the config file
*   <head>
*       ...
*       <title id="ct_title"></title>
*       <link id="ct_icon" rel="icon" type="image/x-icon">
*       <link rel="stylesheet" href="./styles/main.css">
*       <script src="./scripts/common/config.js" defer></script>
*       ...
*   </head>
*   <body>
*   ...
*       <nav id="ct_navigation">
*           <img id="ct_logo" alt="Color Theory's website logo.">
*           <ul id="ct_pages">
*           </ul>
*           <ul id="ct_social_link">
*           </ul>
*       </nav>
*   ...
*   </body>
*/
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
                path: "color_palettes.html",
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

    ]

    const navElement = document.getElementById("ct_pages");
    const titleElement = document.getElementById("ct_title");
    const iconElement = document.getElementById("ct_icon");
    const logoElement = document.getElementById("ct_logo");

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
            if (page.name !== "Home") {
                anchor.href = (isHomePage) ? "./pages/" + page.path : page.path
            } else {
                anchor.href = "../" + page.path;
            }
        }
        navElement.appendChild(anchor);
    });
}

// Helper functions
function safeStringComparison(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
}