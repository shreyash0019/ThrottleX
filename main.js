// Load rev sound
const revSound = new Audio("rev-sound.mp3"); // Use local file
revSound.loop = true; // Loop the sound

// Function to start the speedometer & sound
function startSpeedometer() {
    revSound.volume = 0; // Start muted
    revSound.play().then(() => {
        setTimeout(() => revSound.volume = 0.7, 1000); // Gradually increase volume
    }).catch(error => {
        console.log("Autoplay blocked:", error);
        // Fallback: Add an event listener to play sound on user interaction (like a click)
        document.body.addEventListener('click', () => {
            revSound.play().then(() => {
                setTimeout(() => revSound.volume = 0.7, 1000); // Gradually increase volume
            });
        });
    });

    // Start animation
    let meterBar = document.getElementById("meter-bg-bar");
    meterBar.style.animation = "dash 4s linear infinite"; // Restart animation

    // Start updating speed display
    setInterval(updateSpeedDisplay, 100);
}

// Function to calculate the current speed based on stroke-dashoffset
function calculateSpeed() {
    let meterBar = document.getElementById("meter-bg-bar");
    let strokeDashoffset = parseFloat(
        window.getComputedStyle(meterBar).getPropertyValue("stroke-dashoffset")
    );
    let speed = ((615 - strokeDashoffset) / 615) * 180;
    return Math.round(speed);
}

// Function to update speed display
function updateSpeedDisplay() {
    let speed = calculateSpeed();
    let speedDisplay = document.getElementById("speed");
    speedDisplay.textContent = speed;

    // Adjust volume dynamically based on speed
    if (speed > 0) {
        revSound.volume = Math.min(1, speed / 180); // Scale volume with speed
    }
}

// Auto-start speedometer and sound on page load
window.addEventListener("load", () => {
    revSound.play().then(() => {
        startSpeedometer();
    }).catch(() => {
        startSpeedometer(); // If autoplay is blocked, start the speedometer anyway
    });
});
