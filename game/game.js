const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const livesElement = document.getElementById("lives");
const coinsElement = document.getElementById("coins");
const scoreElement = document.getElementById("score");

const message = document.getElementById("message");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const startButton = document.getElementById("startButton");

const jumpButton = document.getElementById("jumpButton");
const duckButton = document.getElementById("duckButton");


let gameRunning = false;

let lives = 3;
let coins = 0;
let score = 0;

let speed = 5;
let level = 1;

let spawnTimer = 0;

let obstacles = [];


const player = {

    x: 0,

    y: 0,

    width: 42,

    height: 55,

    velocityY: 0,

    jumping: false,

    ducking: false

};


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    resetPlayer();

}


window.addEventListener(
    "resize",
    resizeCanvas
);


function groundY() {

    return canvas.height * 0.70;

}


function resetPlayer() {

    player.x =
        canvas.width - 100;

    player.y =
        groundY() - player.height;

    player.velocityY = 0;

    player.jumping = false;

    player.ducking = false;

}


function jump() {

    if (!gameRunning) {
        return;
    }

    if (player.jumping) {
        return;
    }

    player.jumping = true;

    player.velocityY = -15;

}


function duckStart() {

    if (!gameRunning) {
        return;
    }

    player.ducking = true;

}


function duckEnd() {

    player.ducking = false;

}


function spawnObstacle() {

    const high =
        Math.random() < 0.5;


    if (high) {

        const width = 42;
        const height = 60;

        obstacles.push({

            x: -width,

            y:
                groundY() - height,

            width: width,

            height: height,

            type: "high"

        });

    } else {

        const width = 60;
        const height = 30;

        obstacles.push({

            x: -width,

            y:
                groundY() - height,

            width: width,

            height: height,

            type: "low"

        });

    }

}


function updatePlayer() {

    player.velocityY += 0.8;

    player.y += player.velocityY;


    const floor =
        groundY() - player.height;


    if (player.y >= floor) {

        player.y = floor;

        player.velocityY = 0;

        player.jumping = false;

    }

}


function updateObstacles() {

    for (
        let i = obstacles.length - 1;
        i >= 0;
        i--
    ) {

        const obstacle =
            obstacles[i];


        /*
         * 障碍物从左边向右边移动
         */

        obstacle.x += speed;


        /*
         * 离开右边以后删除
         */

        if (
            obstacle.x >
            canvas.width + 100
        ) {

            obstacles.splice(i, 1);

        }

    }

}


function getPlayerHitbox() {

    if (player.ducking) {

        return {

            x: player.x,

            y:
                player.y + 25,

            width:
                player.width,

            height:
                30

        };

    }


    return {

        x: player.x,

        y: player.y,

        width:
            player.width,

        height:
            player.height

    };

}


function collision(a, b) {

    return (

        a.x <
        b.x + b.width &&

        a.x + a.width >
        b.x &&

        a.y <
        b.y + b.height &&

        a.y + a.height >
        b.y

    );

}


function checkCollisions() {

    const hitbox =
        getPlayerHitbox();


    for (
        let i = obstacles.length - 1;
        i >= 0;
        i--
    ) {

        const obstacle =
            obstacles[i];


        if (
            collision(
                hitbox,
                obstacle
            )
        ) {

            /*
             * 碰撞后马上删除障碍物
             * 防止同一个障碍物连续扣血
             */

            obstacles.splice(i, 1);


            lives--;


            updateUI();


            if (
                navigator.vibrate
            ) {

                navigator.vibrate(150);

            }


            if (lives <= 0) {

                endGame();

            }

        }

    }

}


function updateSpawnTimer() {

    spawnTimer--;


    if (spawnTimer <= 0) {

        spawnObstacle();


        /*
         * 障碍物之间保持一定距离
         */

        spawnTimer =
            Math.max(
                70,
                130 - level * 8
            );

    }

}


function updateScore() {

    score += 0.05;

}


function updateLevel() {

    const newLevel =
        Math.floor(
            score / 20
        ) + 1;


    if (
        newLevel !== level
    ) {

        level =
            newLevel;


        /*
         * 每升一关增加速度
         */

        speed =
            5 +
            (level - 1) * 1.2;

    }

}


function updateUI() {

    livesElement.textContent =
        lives;

    coinsElement.textContent =
        coins;

    scoreElement.textContent =
        Math.floor(score);

}


function drawBackground() {

    const width =
        canvas.width;

    const height =
        canvas.height;


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );


    gradient.addColorStop(
        0,
        "#75c8ff"
    );

    gradient.addColorStop(
        1,
        "#e8f8ff"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /*
     * 云朵
     */

    ctx.fillStyle =
        "rgba(255,255,255,0.8)";


    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const x =
            i * 250 -
            (score * 2 % 250);

        const y =
            100 +
            i * 35;


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            25,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x + 30,
            y,
            30,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x + 60,
            y,
            22,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    /*
     * 地面
     */

    ctx.fillStyle =
        "#68ad50";


    ctx.fillRect(
        0,
        groundY(),
        width,
        height - groundY()
    );


    ctx.fillStyle =
        "#438339";


    ctx.fillRect(
        0,
        groundY(),
        width,
        8
    );

}


function drawPlayer() {

    let height =
        player.ducking
            ? 30
            : player.height;


    let y =
        player.ducking
            ? groundY() - 30
            : player.y;


    /*
     * 身体
     */

    ctx.fillStyle =
        "#222";


    ctx.fillRect(
        player.x,
        y,
        player.width,
        height
    );


    /*
     * 头
     */

    ctx.fillStyle =
        "#ffd3a0";


    ctx.beginPath();


    ctx.arc(
        player.x + 25,
        y - 10,
        13,
        0,
        Math.PI * 2
    );


    ctx.fill();


    /*
     * 眼睛
     */

    ctx.fillStyle =
        "#000";


    ctx.fillRect(
        player.x + 29,
        y - 13,
        4,
        4
    );


    /*
     * 腿
     */

    if (!player.ducking) {

        ctx.fillStyle =
            "#333";


        ctx.fillRect(
            player.x + 7,
            y + height,
            8,
            15
        );


        ctx.fillRect(
            player.x + 27,
            y + height,
            8,
            15
        );

    }

}


function drawObstacles() {

    obstacles.forEach(
        obstacle => {

            /*
             * 高障碍
             */

            if (
                obstacle.type === "high"
            ) {

                ctx.fillStyle =
                    "#444";


                ctx.fillRect(
                    obstacle.x,
                    obstacle.y,
                    obstacle.width,
                    obstacle.height
                );


                ctx.fillStyle =
                    "#ff4444";


                ctx.fillRect(
                    obstacle.x,
                    obstacle.y,
                    obstacle.width,
                    8
                );


                ctx.fillStyle =
                    "#fff";


                ctx.font =
                    "18px Arial";


                ctx.fillText(
                    "!",
                    obstacle.x + 17,
                    obstacle.y + 35
                );

            }


            /*
             * 低障碍
             */

            else {

                ctx.fillStyle =
                    "#7b4b24";


                ctx.fillRect(
                    obstacle.x,
                    obstacle.y,
                    obstacle.width,
                    obstacle.height
                );


                ctx.fillStyle =
                    "#d18b45";


                ctx.fillRect(
                    obstacle.x + 5,
                    obstacle.y + 5,
                    obstacle.width - 10,
                    7
                );

            }

        }
    );

}


function draw() {

    drawBackground();

    drawObstacles();

    drawPlayer();

}


function update() {

    if (!gameRunning) {
        return;
    }


    updatePlayer();

    updateObstacles();

    checkCollisions();

    updateScore();

    updateLevel();

    updateSpawnTimer();

    updateUI();

}


function gameLoop() {

    update();

    draw();

    requestAnimationFrame(
        gameLoop
    );

}


function startGame() {

    lives = 3;

    coins = 0;

    score = 0;

    speed = 5;

    level = 1;

    spawnTimer = 90;

    obstacles = [];

    gameRunning = true;


    resetPlayer();

    updateUI();


    message.style.display =
        "none";

}


function endGame() {

    gameRunning = false;


    messageTitle.textContent =
        "💥 GAME OVER";


    messageText.textContent =
        "分数："
        + Math.floor(score)
        + "　💰 "
        + coins;


    startButton.textContent =
        "🔄 再玩一次";


    message.style.display =
        "block";

}


startButton.addEventListener(
    "click",
    startGame
);


jumpButton.addEventListener(
    "pointerdown",
    function(event) {

        event.preventDefault();

        jump();

    }
);


duckButton.addEventListener(
    "pointerdown",
    function(event) {

        event.preventDefault();

        duckStart();

    }
);


duckButton.addEventListener(
    "pointerup",
    function(event) {

        event.preventDefault();

        duckEnd();

    }
);


duckButton.addEventListener(
    "pointercancel",
    function() {

        duckEnd();

    }
);


duckButton.addEventListener(
    "pointerleave",
    function() {

        duckEnd();

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.code === "ArrowUp" ||
            event.code === "Space"
        ) {

            event.preventDefault();

            jump();

        }


        if (
            event.code === "ArrowDown"
        ) {

            event.preventDefault();

            duckStart();

        }

    }
);


document.addEventListener(
    "keyup",
    function(event) {

        if (
            event.code === "ArrowDown"
        ) {

            duckEnd();

        }

    }
);


resizeCanvas();

updateUI();

gameLoop();
