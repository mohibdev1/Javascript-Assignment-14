const hero = document.getElementById("hero");
const heroImg = document.getElementById("heroImg");

const animations = {
  idle: "Assets/m-spiderman.gif",
  walk: "Assets/spidey-walk1.gif",
  jump: "Assets/spidey-flipkick-fk.gif",
  win: "Assets/spidey-dashing.gif"
};

let x = 0;
let y = 0;
let speed = 5;
let keys = {};
let currentAnimation = "idle";
let facing = 1; // 1 = right, -1 = left

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function setAnimation(name) {
if (currentAnimation === name) return;
currentAnimation = name;
heroImg.src = animations[name] + "?t=" + Date.now();
}

function gameLoop() {

  let moving = false;

if (keys["ArrowRight"]) {
x += speed;
facing = 1; // normal
setAnimation("walk");
moving = true;
}


if (keys["ArrowLeft"]) {
x -= speed;
facing = -1; // 🔥 FLIP HERE
setAnimation("walk"); // SAME GIF
moving = true;
}

  if (keys[" "]) {
    setAnimation("jump");
    moving = true;
  }

  if (!moving) {
    setAnimation("idle");
  }

  const maxX = 1300 - 300;
  x = Math.max(0, Math.min(x, maxX));

  hero.style.left = x + "px";
  hero.style.transform = `scaleX(${facing})`;

  requestAnimationFrame(gameLoop);
}

gameLoop();