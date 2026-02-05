const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

// ✅ This fixes your issue: supports BOTH ids ("msg" or "message")
const msgEl =
  document.getElementById("msg") ||
  document.getElementById("message");

const mainImage = document.getElementById("mainImage"); // ok if null

const noMessages = [
  "BANCYBOWW! You goofy 😂 Click YES to continue.",
  "Nice try. Click YES to continue.",
  "Error 404: ‘No’ not found.",
  "No ma’am. Click YES to continue."
];

const yesMessage =
  "That’s what I thought 😎. Congratulations you are officially locked in for ICYBANS 1st Valentine’s Day. No refunds no takebacks. Have fun 😉❤️🖤";

let noLocked = false;
let runawayActivated = false;

function setMsg(text) {
  if (msgEl) msgEl.textContent = text;
}

function setRandomNoMessage() {
  const randomMsg = noMessages[Math.floor(Math.random() * noMessages.length)];
  setMsg(randomMsg);
}

function activateRunaway() {
  if (runawayActivated) return;
  runawayActivated = true;

  // NO starts next to YES in normal flow, THEN becomes free-floating
  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "9999";
  noBtn.style.userSelect = "none";
  noBtn.style.transform = "none";
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Teleport NO somewhere random and visible
function teleportNoButton(cx = window.innerWidth / 2, cy = window.innerHeight / 2) {
  const padding = 14;

  const bw = noBtn.offsetWidth || 90;
  const bh = noBtn.offsetHeight || 45;

  const minY = 140; // keep away from title/message area

  const maxX = Math.max(padding, window.innerWidth - bw - padding);
  const maxY = Math.max(minY, window.innerHeight - bh - padding);

  // Keep it away from cursor so it feels unclickable
  const minDist = 140;

  let x = padding, y = minY;

  for (let tries = 0; tries < 40; tries++) {
    const rx = randomInt(padding, maxX);
    const ry = randomInt(minY, maxY);

    if (Math.hypot(rx - cx, ry - cy) >= minDist) {
      x = rx; y = ry;
      break;
    }

    if (tries === 39) {
      x = rx; y = ry;
    }
  }

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// ✅ ONE function: whenever NO runs, it ALWAYS shows a message
function runNo(e) {
  if (noLocked) return;

  activateRunaway();
  setRandomNoMessage();

  const cx = e?.clientX ?? window.innerWidth / 2;
  const cy = e?.clientY ?? window.innerHeight / 2;

  teleportNoButton(cx, cy);

  if (e?.preventDefault) e.preventDefault();
  if (e?.stopPropagation) e.stopPropagation();
}

// Hover and click attempts
noBtn.addEventListener("mouseenter", runNo);
noBtn.addEventListener("mousemove", runNo);
noBtn.addEventListener("mousedown", runNo);
noBtn.addEventListener("click", (e) => e.preventDefault());

// Mobile
noBtn.addEventListener(
  "touchstart",
  (e) => {
    const t = e.touches && e.touches[0];
    runNo({ clientX: t?.clientX ?? 0, clientY: t?.clientY ?? 0, preventDefault: () => e.preventDefault() });
  },
  { passive: false }
);

// Proximity escape (so it runs even before hover fully lands)
const proximityRadius = 120;
let lastRun = 0;

document.addEventListener("mousemove", (e) => {
  if (noLocked) return;

  const now = Date.now();
  if (now - lastRun < 120) return;

  const rect = noBtn.getBoundingClientRect();
  const bx = rect.left + rect.width / 2;
  const by = rect.top + rect.height / 2;

  if (Math.hypot(e.clientX - bx, e.clientY - by) < proximityRadius) {
    runNo(e);
    lastRun = now;
  }
});

yesBtn.addEventListener("click", () => {
  setMsg(yesMessage);
  yesBtn.textContent = "Confirmed";

  noLocked = true;
  noBtn.style.display = "none";

  if (mainImage) {
    mainImage.src = "yes.jpg";
  }
});
