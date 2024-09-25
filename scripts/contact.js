/******************************************************************************************/
/* Notes:
/*  - isMobileDevice is a boolean type and defined in config.js
/*  - createModal(node, boolean) is defined in config.js
/*  - Sanitization could be improved by using external libraries such as DOMPurify and server side sanitization as well.
/*
/* VARIABLES */
let defaultInputColor;
const wrongInputColor = "#f9dede"; // light red
const validInputColor = "#e7f4e4"; // light green
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

/* Strings */
const errMsgInvalidName = "Name must be at least 2 characters long!";
const errMsgInvalidEmail = "Email must be valid!";
const errMsgInvalidMsg = "Message should be a least 20 characters long!";
const errMsgNoSelection = "Choose a reason for contact!";
const msgConfirm = "Are you sure you want to reset form?";

/* Form inputs */
const form = document.getElementById("contact_form");
const nameInput = document.getElementById("contact_name");
const emailInput = document.getElementById("contact_email");
const textarea = document.getElementById("contact_message");
const reasonForContact = Array.from(document.getElementsByName("contact_reason"));

/******************************************************************************************/
/* ENTRY POINT */


defaultInputColor = nameInput.style.background;

form.addEventListener("input", validateInput);
form.addEventListener("focusout", () => {
    hideErrorMessageBox(document);
});
form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendForm()
});

/******************************************************************************************/
/* FUNCTIONS */

function sendForm() {
    nameInput.value = sanitizeInput(nameInput.value.trim());
    textarea.value = sanitizeInput(textarea.value.trim());
    const selectedOption = hasSelectedOption();
    if (!isValidName() ||
        !isValidEmail() ||
        !isValidMessage() ||
        selectedOption === null) {
        console.error("One or more data wasn't valid thus preventing form from submitting.")
        return;
    }

    const formData = new FormData(form);
    (!formData.has("contact_subscribe")) ?
        formData.append("contact_subscribe", false) :
        formData.set("contact_subscribe", true);
    formData.set("contact_reason", '[' + formData.get("contact_reason") + ']');

    /* Creating modal for visualization as there are no back end in this project! */
    const name = formData.get("contact_name");
    const email = formData.get("contact_email");
    const message = formData.get("contact_message");
    const subject = formData.get("contact_reason");
    const isSubsribed = formData.get("contact_subscribe");

    const modalContent = document.createElement("div");
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    h1.textContent = "Your message";
    h1.textAlign = "center";

    const h2 = document.createElement("h2");
    h2.textContent = "Hello " + name + '!';
    const subscribedMsg = document.createElement("p");
    subscribedMsg.textContent = (isSubsribed) ?
        "You have decided to subscribe to our newsletter!"
        : "You didn't subscribe to us!";
    const h3Email = document.createElement("h3");
    h3Email.innerHTML = "<strong>Your email: </strong>" + email;
    const h3Subject = document.createElement("h3");
    h3Subject.innerHTML = "<strong>Your subject: </strong>" + subject;

    const main = document.createElement("main");
    main.style.borderBottom = "3px solid var(--dark-background)";
    main.style.borderTop = "3px solid var(--dark-background)";
    main.textContent = "This is your message to us:";
    const article = document.createElement("article");
    article.textContent = message;

    const footer = document.createElement("footer");
    footer.innerHTML = "This message will not be sent to anywhere. This modal has been created for demonstrational purposes only.";
    
    header.appendChild(h1);
    header.appendChild(h2);
    header.appendChild(h3Email);
    header.appendChild(h3Subject);
    main.appendChild(article);
    modalContent.appendChild(header)
    modalContent.appendChild(main);
    modalContent.appendChild(footer);

    createModal(modalContent, true);
}

function validateInput(event) {
    const input = event.target;
    switch (input.id) {
        case "contact_name":
            (!isValidName()) ?
                createErrorMessageBox(nameInput.parentElement, errMsgInvalidName, "right") :
                hideErrorMessageBox(nameInput.parentElement);
            break;
        case "contact_email":
            (!isValidEmail()) ?
                createErrorMessageBox(emailInput.parentElement, errMsgInvalidEmail, "right") :
                hideErrorMessageBox(emailInput.parentElement);
            break;
        case "contact_message":
            (!isValidMessage()) ?
                createErrorMessageBox(textarea.parentElement, errMsgInvalidMsg, "right") :
                hideErrorMessageBox(textarea.parentElement);
            break;
    }
}

function isValidName() {
    if (nameInput.value.length < 2) {
        nameInput.style.background = wrongInputColor;
        return false;
    } else {
        nameInput.style.background = validInputColor;
        return true;
    }
}

function isValidEmail() {
    if (!emailInput.value.match(emailPattern)) {
        emailInput.style.background = wrongInputColor;
        return false;
    } else {
        emailInput.style.background = validInputColor;
        return true;
    }
}

function isValidMessage() {
    if (textarea.value.length < 20) {
        textarea.style.background = wrongInputColor;
        return false;
    } else {
        textarea.style.background = validInputColor;
        return true;
    }
}

function hasSelectedOption() {
    const selectedReason = reasonForContact.find(reason => reason.checked === true);
    if (!selectedReason) {
        reasonForContact.forEach(reason => {
            reason.parentElement.style.background = wrongInputColor;
        });
        createErrorMessageBox(reasonForContact[0].parentElement, errMsgNoSelection, "left");
        return null;
    }
    return selectedReason;
}

function createErrorMessageBox(relativeDiv, message, orientation) {
    if (isMobileDevice) // Message box is intended for larger screens!
        return;

    let errorMessageBoxes = Array.from(relativeDiv.getElementsByClassName("error_message_box"));

    let errorMessageBox = errorMessageBoxes.find(element => element.classList.contains("error_message_box"));

    if (errorMessageBox) {
        errorMessageBox.style.display = "block";
        errorMessageBox.textContent = message;
        return;
    }

    errorMessageBox = document.createElement("div");
    errorMessageBox.classList.add("error_message_box");
    errorMessageBox.textContent = message;

    relativeDiv.style.position = "relative";

    errorMessageBox.style.position = "absolute";
    errorMessageBox.style.width = "min-content";
    errorMessageBox.style.whiteSpace = "nowrap";
    errorMessageBox.style.background = "var(--dark-background)";
    errorMessageBox.style.color = "var(--light-text)";
    errorMessageBox.style.textAlign = "center";
    errorMessageBox.style.borderRadius = "6px";
    errorMessageBox.style.zIndex = 1;
    errorMessageBox.style.padding = "0.5rem";

    switch (orientation) {
        case "top":
            errorMessageBox.style.bottom = "100%";
            errorMessageBox.style.marginBottom = "0.5rem";
            break;
        case "right":
            errorMessageBox.style.left = "100%";
            errorMessageBox.style.marginLeft = "0.5rem";
            break;
        case "bottom":
            errorMessageBox.style.top = "100%";
            errorMessageBox.style.marginTop = "0.5rem";
            break;
        default: // left
            errorMessageBox.style.right = "100%";
            errorMessageBox.style.marginRight = "0.5rem";
    }

    relativeDiv.appendChild(errorMessageBox);
}

function hideErrorMessageBox(container) {
    let errorMessageBoxes = Array.from(container.getElementsByClassName("error_message_box"));
    errorMessageBoxes.forEach(errorMessageBox => {
        errorMessageBox.style.display = "none";
    });
}

function resetForm() {
    if (!confirm(msgConfirm)) {
        return;
    }
    textarea.style.height = textarea.style.minHeight;
    nameInput.style.background = defaultInputColor;
    emailInput.style.background = defaultInputColor;
    textarea.style.background = defaultInputColor;
    reasonForContact.forEach(reason => {
        reason.parentElement.style.background = "none";
    })
    form.reset();
}

function sanitizeInput(input) {
    input = input.replace(/<a[^>]*>(.*?)<\/a>/g, '');
    input = input.replace(/<script[^>]*>(.*?)<\/script>/g, '');
    return input;
}