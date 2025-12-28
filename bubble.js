const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bubbles = [];
let points = 0;
let progress = 0;

// resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 120;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// bubble class
class Bubble {
  constructor() {
    this.radius = Math.random() * 15 + 25;
    this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
    this.y = canvas.height + this.radius + Math.random() * 200;
    this.speed = Math.random() * 0.6 + 0.3;

    const colors = ["#ff4d4d", "#4da6ff", "#4dff88", "#ffd24d", "#c77dff"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    // bubble gradient
    const grad = ctx.createRadialGradient(
      this.x - this.radius / 3,
      this.y - this.radius / 3,
      this.radius / 4,
      this.x,
      this.y,
      this.radius
    );
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.3, this.color);
    grad.addColorStop(1, "#000000");

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.radius) {
      this.y = canvas.height + this.radius;
    }
    this.draw();
  }

  isTapped(tx, ty) {
    const dx = tx - this.x;
    const dy = ty - this.y;
    return Math.sqrt(dx * dx + dy * dy) < this.radius;
  }
}

// create bubbles
for (let i = 0; i < 15; i++) {
  bubbles.push(new Bubble());
}

// tap detection
canvas.addEventListener("touchstart", (e) => {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  bubbles.forEach((bubble, index) => {
    if (bubble.isTapped(x, y)) {
      bubbles.splice(index, 1);
      bubbles.push(new Bubble());

      points += 100;
      progress += 0.3;

      document.getElementById("score").innerText = `Points: ${points}`;
      document.getElementById("meter").innerText = `Progress: ${progress.toFixed(1)}%`;
    }
  });
});

// game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach(bubble => bubble.update());

  requestAnimationFrame(gameLoop);
}

gameLoop();
function spawnBubble() {
  bubbles.push(new Bubble());
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach((bubble, index) => {
    bubble.y -= bubble.speed;

    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color;
    ctx.fill();

    if (bubble.y + bubble.radius < 0) {
      bubbles.splice(index, 1);
    }
  });

  requestAnimationFrame(update);
}

setInterval(spawnBubble, 800);
update();
