const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const msg = document.getElementById("msg");

// Optional: if you have an image with id="mainImage", this will swap it on YES
const mainImage = document.getElementById("mainImage"); // safe even if null

const noMessages = [
  "BANCYBOWW! You goofy 😂 Click YES to continue.",
  "Nice try. Click YES to continue.",
  "Error 404: ‘No’ not found.",
  "No ma’am. Click YES to continue."
];

let noLocked = false;         // becomes true after YES
let runawayActivated = false; // becomes true after first NO attempt

function setRandomNoMessage() {
  const randomMsg = noMessages[Math.floor(Math.random() * noMessages.length)];
  msg.textContent = randomMsg;
}

// Teleport NO to a random visible spot
function teleportNoButton() {
  const padding = 14;

  const bw = noBtn.offsetWidth || 90;
  const bh = noBtn.offsetHeight || 45;

  const maxX = window.innerWidth - bw - padding;
  const maxY = window.innerHeight - bh - padding;

  const x = Math.floor(Math.random() * Math.max(maxX, padding)) + padding;
  const y = Math.floor(Math.random() * Math.max(maxY, padding)) + padding;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Start next to YES, then only switch to runaway mode after she tries NO
function moveNoButton(e) {
  if (noLocked) return;

  // First time she tries NO, switch it into runaway mode
  if (!runawayActivated) {
    runawayActivated = true;

    // IMPORTANT: now it can run around the screen
    noBtn.style.position = "fixed";
    noBtn.style.zIndex = "9999";

    // Keep button from becoming "unclickable" due to scrolling/selection issues
    noBtn.style.userSelect = "none";
  }

  setRandomNoMessage();
  teleportNoButton();

  // Prevent any accidental click behavior
  if (e && typeof e.preventDefault === "function") e.preventDefault();
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton, { passive: false });

yesBtn.addEventListener("click", () => {
  msg.textContent =
    "That’s what I thought 😎. Congratulations you are officially locked in for ICYBANS 1st Valentine’s Day. No refunds no takebacks. Have fun 😉❤️🖤";

  yesBtn.textContent = "Confirmed";

  // Hide NO only after YES
  noLocked = true;
  noBtn.style.display = "none";

  // Optional: swap image after YES if you have #mainImage + yes.jpg uploaded
  if (mainImage) {
    mainImage.src = "yes.jpg";
  }
});
