function resetForm() {
    const form = document.getElementById("contact_form");
    const textarea = document.getElementById("contact_message")
    textarea.style.height = textarea.style.minHeight;
    form.reset();
}