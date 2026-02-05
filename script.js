const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const mainImage = document.getElementById("mainImage"); // ok if null

const noMessages = [
  "Bancyboo! You know better. Pick the ONLY right answer ;)",
  "You goofy! Pick YES babe",
  "My lovely! I will treat you right my queen. Click YES plzz",
  "MY JAANU! MY SOULMATE! YES Click kardo yaar!",
  "Aye you! My baby! Stop being hard to get. I know you want to be my valentine theheh!"
];

const yesMessage =
  "That’s what I thought 😎. Congratulations you are officially locked in for ICYBANS 1st Valentine’s Day. No refunds no takebacks. Have fun 😉❤️🖤";

let noLocked = false;
let runawayActivated = false;

// ✅ Find the message element reliably, or create it if missing
function getMsgEl() {
  let el = document.getElementById("msg") || document.getElementById("message");
  if (!el) {
    el = document.createElement("div");
    el.id = "message";
    el.style.marginTop = "10px";
    el.style.marginBottom = "18px";
    el.style.fontSize = "18px";
    el.style.padding = "0 10px";
    el.style.lineHeight = "1.35";
    document.body.insertBefore(el, document.body.firstChild.nextSibling); // right after header-ish
  }
  return el;
}

function showRandomNoMessage() {
  const el = getMsgEl();
  el.textContent = noMessages[Math.floor(Math.random() * noMessages.length)];
}

function showYesMessage() {
  const el = getMsgEl();
  el.textContent = yesMessage;
}

function activateRunaway() {
  if (runawayActivated) return;
  runawayActivated = true;

  // After the first attempt, NO becomes free-floating
  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "9999";
  noBtn.style.userSelect = "none";
  noBtn.style.transform = "none";
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ✅ Teleport NO to a visible random spot
function teleportNoButton() {
  const padding = 14;

  const bw = noBtn.offsetWidth || 90;
  const bh = noBtn.offsetHeight || 45;

  const minY = 140;
  const maxX = Math.max(padding, window.innerWidth - bw - padding);
  const maxY = Math.max(minY, window.innerHeight - bh - padding);

  const x = randomInt(padding, maxX);
  const y = randomInt(minY, maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // ✅ THIS is the key: every move triggers a random message
  showRandomNoMessage();
}

// ✅ ONE handler for all NO attempts
function runNo(e) {
  if (noLocked) return;

  activateRunaway();
  teleportNoButton();

  if (e?.preventDefault) e.preventDefault();
  if (e?.stopPropagation) e.stopPropagation();
}

// Triggers
noBtn.addEventListener("mouseenter", runNo);
noBtn.addEventListener("mousemove", runNo);
noBtn.addEventListener("mousedown", runNo);
noBtn.addEventListener("click", (e) => e.preventDefault());

noBtn.addEventListener(
  "touchstart",
  (e) => {
    runNo(e);
    e.preventDefault();
  },
  { passive: false }
);

// YES
yesBtn.addEventListener("click", () => {
  showYesMessage();
  yesBtn.textContent = "Confirmed";

  noLocked = true;
  noBtn.style.display = "none";

  if (mainImage) mainImage.src = "yes.jpg";
});
