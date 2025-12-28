const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const colors = ["red", "yellow", "blue", "green", "purple"];
const bubbles = [];

const ROWS = 7;
const COLS = 8;
const RADIUS = 18;

function createBubbles() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      bubbles.push({
        x: c * 45 + 30,
        y: r * 45 + 30,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }
}

function drawBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();
  });
}

function gameLoop() {
  drawBubbles();
  requestAnimationFrame(gameLoop);
}

createBubbles();
gameLoop();
