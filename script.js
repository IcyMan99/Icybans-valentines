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

// Switch NO into runaway mode only after first attempt
function activateRunaway() {
  if (runawayActivated) return;
  runawayActivated = true;

  // Start floating freely AFTER first attempt
  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "9999";
  noBtn.style.userSelect = "none";
}

function teleportNoButton() {
  const padding = 14;

  const bw = noBtn.offsetWidth || 90;
  const bh = noBtn.offsetHeight || 45;

  // keep it away from the very top so it doesn't cover your title/message
  const minY = 140;

  const maxX = window.innerWidth - bw - padding;
  const maxY = window.innerHeight - bh - padding;

  const safeMaxX = Math.max(maxX, padding);
  const safeMaxY = Math.max(maxY, minY + padding);

  const x = Math.floor(Math.random() * (safeMaxX - padding + 1)) + padding;
  const y = Math.floor(Math.random() * (safeMaxY - minY + 1)) + minY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Runaway behavior (always shows a random message)
function runNo(e) {
  if (noLocked) return;

  activateRunaway();
  setRandomNoMessage();
  teleportNoButton();

  if (e && typeof e.preventDefault === "function") e.preventDefault();
  if (e && typeof e.stopPropagation === "function") e.stopPropagation();
}

/*
  KEY CHANGE:
  - Use mousedown (fires BEFORE click lands) so message always shows
  - Keep mouseenter so it still runs away when hovered
*/
noBtn.addEventListener("mouseenter", runNo);
noBtn.addEventListener("mousedown", runNo); // better than click
noBtn.addEventListener("click", (e) => {
  // extra safety: prevent any click effect if it somehow lands
  e.preventDefault();
});
noBtn.addEventListener("touchstart", (e) => runNo(e), { passive: false });

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
