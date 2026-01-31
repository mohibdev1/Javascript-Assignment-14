const hero = document.getElementById("hero");
const heroImg = document.getElementById("heroImg");

const enemy = document.getElementById("enemy");
const enemyImg = document.getElementById("enemyImg");

let enemyX = 900;

const animations = {
  idle: "Assets/m-spiderman.gif",
  walk: "Assets/spidey-walk1.gif",
  jump: "Assets/spidey-dashing.gif",
  win: "Assets/spder.png"
};

let x = 0;
let y = 0;
let speed = 5;
let keys = {};
let currentAnimation = "idle";
let facing = 1;

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
facing = 1; 
setAnimation("walk");
moving = true;
}


if (keys["ArrowLeft"]) {
x -= speed;
facing = -1; 
setAnimation("walk"); 
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



if (x < enemyX) {
    
    enemyImg.style.transform = "scaleX(-1)";
} else {
    
    enemyImg.style.transform = "scaleX(1)";
}


let distance = Math.abs(x - enemyX);

if (distance < 80) {
    setAnimation("win");
}
  requestAnimationFrame(gameLoop);
}


gameLoop();