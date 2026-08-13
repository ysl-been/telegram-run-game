const canvas = document.getElementById("gameCanvas");

const startButton = document.getElementById("startButton");

const menu = document.getElementById("menu");

let running = false;

let x = 0;

let direction = 1;


// ========================================
// TEST PLAYER
// ========================================

const player = document.createElement("div");

player.style.position = "absolute";
player.style.width = "60px";
player.style.height = "60px";
player.style.background = "red";
player.style.borderRadius = "10px";
player.style.left = "50%";
player.style.top = "50%";
player.style.transform = "translate(-50%, -50%)";
player.style.zIndex = "9999";

canvas.appendChild(player);


// ========================================
// START GAME
// ========================================

function startGame() {

    running = true;

    if (menu) {
        menu.style.display = "none";
    }

    const startScreen =
        document.getElementById("startScreen");

    if (startScreen) {
        startScreen.style.display = "none";
    }

    const startMenu =
        document.getElementById("startMenu");

    if (startMenu) {
        startMenu.style.display = "none";
    }

    player.style.display = "block";

    alert("GAME STARTED");

}


// ========================================
// START BUTTON
// ========================================

if (startButton) {

    startButton.addEventListener(
        "click",
        startGame
    );

}


// ========================================
// GAME LOOP
// ========================================

function gameLoop() {

    if (running) {

        x +=
            2 * direction;


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


    requestAnimationFrame(
        gameLoop
    );

}


gameLoop();
