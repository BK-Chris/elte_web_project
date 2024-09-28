const video = document.getElementById("video");
const transcriptToggle = document.getElementById("transcript_toggle");
let timestamp = getTimestamp();
if (timestamp) jumpToTime(timestamp);


/* Event listeners */
window.addEventListener("hashchange", () => {
    timestamp = getTimestamp();
    jumpToTime(timestamp);
});

transcriptToggle.addEventListener("click", () => {
    const transcriptList = document.getElementById("transcript_list");
    if (transcriptList.style.display === "none") {
        transcriptList.style.display = "block";
        transcriptToggle.classList.remove("hover");
        transcriptToggle.classList.remove("light_text");
        transcriptToggle.classList.add("hover_dark");
        transcriptToggle.classList.add("dark_text");
        transcriptToggle.textContent = "Collapse transcript";
    } else {
        transcriptList.style.display = "none"
        transcriptToggle.classList.remove("hover_dark");
        transcriptToggle.classList.remove("dark_text");
        transcriptToggle.classList.add("hover");
        transcriptToggle.classList.add("light_text");
        transcriptToggle.textContent = "Expand transcript";
    }
});

/* Functions */
function jumpToTime(time) {
    if (isNaN(time))
        return;
    video.scrollIntoView({ behavior: 'smooth' });
    video.currentTime = time;
}

function getTimestamp() {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    return params.get('t');
}
