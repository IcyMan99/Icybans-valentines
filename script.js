const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const msg = document.getElementById("msg");

const noMessages = [
  "BANCYBOWW! You goofy 😂 Click YES to continue.",
  "BANCYBOWW! You goofy 😂 Click YES to continue.",
  "Nice try. Click YES to continue.",
  "Error 404: ‘No’ not found.",
  "No ma’am. Click YES to continue."
];

function moveNoButton() {
  const padding = 12;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.max(padding, Math.floor(Math.random() * maxX));
  const y = Math.max(padding, Math.floor(Math.random() * maxY));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const randomMsg = noMessages[Math.floor(Math.random() * noMessages.length)];
  msg.textContent = randomMsg;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

yesBtn.addEventListener("click", () => {
  msg.textContent = "Lit! Your invite is confirmed for our first Icy bands Valentine’s Day 😉 👅";
  yesBtn.textContent = "Confirmed";
});
