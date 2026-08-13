const canvas = document.getElementById("gameCanvas");
const startButton = document.getElementById("startButton");
const menu = document.getElementById("menu");

let running = false;
let x = 0;
let direction = 1;

const player = document.createElement("div");

player.style.position = "absolute";
player.style.width = "60px";
player.style.height = "60px";
player.style.background = "red";
player.style.borderRadius = "10px";
player.style.left = "50%";
player.style.top = "50%";
player.style.transform = "translate(-50%, -50%)";

canvas.appendChild(player);

startButton.addEventListener("click", function () {
    running = true;
    menu.style.display = "none";
});

function gameLoop() {
    if (running) {
        x += 2 * direction;

        if (x >= 150) {
            direction = -1;
        }

        if (x <= -150) {
            direction = 1;
        }

        player.style.transform =
            "translate(calc(-50% + " +
            x +
            "px), -50%)";
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
