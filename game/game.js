const canvasContainer = document.getElementById("gameCanvas");
const startButton = document.getElementById("startButton");
const menu = document.getElementById("menu");

let scene;
let camera;
let renderer;

let player;

let gameRunning = false;

let lives = 3;
let score = 0;
let coins = 0;

let speed = 0.45;

let lane = 0;
let targetLane = 0;

let jumping = false;
let jumpVelocity = 0;

let ducking = false;

let obstacleTimer = 0;
let coinTimer = 0;

const obstacles = [];
const coinObjects = [];


// ========================================
// START
// ========================================

function init() {

    if (typeof THREE === "undefined") {
        alert("Three.js failed to load.");
        return;
    }

    scene = new THREE.Scene();

    scene.background =
        new THREE.Color(0x87ceeb);


    camera = new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        0.1,
        300
    );

    camera.position.set(0, 5, 10);


    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    canvasContainer.appendChild(
        renderer.domElement
    );


    createLights();
    createRoad();
    createPlayer();


    window.addEventListener(
        "resize",
        resize
    );


    requestAnimationFrame(
        gameLoop
    );
}


// ========================================
// LIGHT
// ========================================

function createLights() {

    const light =
        new THREE.HemisphereLight(
            0xffffff,
            0x557755,
            2
        );

    scene.add(light);


    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    sun.position.set(
        10,
        20,
        10
    );

    scene.add(sun);
}


// ========================================
// ROAD
// ========================================

function createRoad() {

    const grassGeometry =
        new THREE.PlaneGeometry(
            100,
            300
        );

    const grassMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x4c9b45
        });

    const grass =
        new THREE.Mesh(
            grassGeometry,
            grassMaterial
        );

    grass.rotation.x =
        -Math.PI / 2;

    grass.position.z = -140;

    scene.add(grass);


    const roadGeometry =
        new THREE.PlaneGeometry(
            10,
            300
        );

    const roadMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x333333
        });

    const road =
        new THREE.Mesh(
            roadGeometry,
            roadMaterial
        );

    road.rotation.x =
        -Math.PI / 2;

    road.position.y = 0.01;

    road.position.z = -140;

    scene.add(road);


    for (
        let z = 10;
        z > -290;
        z -= 8
    ) {

        for (
            const x of [-1.5, 1.5]
        ) {

            const lineGeometry =
                new THREE.BoxGeometry(
                    0.08,
                    0.04,
                    4
                );

            const lineMaterial =
                new THREE.MeshBasicMaterial({
                    color: 0xffffff
                });

            const line =
                new THREE.Mesh(
                    lineGeometry,
                    lineMaterial
                );

            line.position.set(
                x,
                0.04,
                z
            );

            scene.add(line);
        }
    }
}


// ========================================
// PLAYER
// ========================================

function createPlayer() {

    player = new THREE.Group();

    player.position.set(
        0,
        0,
        5
    );

    scene.add(player);


    const bodyGeometry =
        new THREE.BoxGeometry(
            0.8,
            1.4,
            0.7
        );

    const bodyMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x2468d8
        });

    const body =
        new THREE.Mesh(
            bodyGeometry,
            bodyMaterial
        );

    body.position.y = 1.2;

    body.name = "body";

    player.add(body);


    const headGeometry =
        new THREE.SphereGeometry(
            0.4,
            20,
            20
        );

    const headMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffc58c
        });

    const head =
        new THREE.Mesh(
            headGeometry,
            headMaterial
        );

    head.position.y = 2.25;

    head.name = "head";

    player.add(head);
}


// ========================================
// START GAME
// ========================================

function startGame() {

    gameRunning = true;

    lives = 3;
    score = 0;
    coins = 0;

    speed = 0.45;

    lane = 0;
    targetLane = 0;

    jumping = false;
    jumpVelocity = 0;

    ducking = false;

    obstacleTimer = 60;
    coinTimer = 90;


    clearObjects();


    player.position.set(
        0,
        0,
        5
    );


    if (menu) {
        menu.style.display = "none";
    }
}


// ========================================
// OBSTACLE
// ========================================

function createObstacle() {

    const geometry =
        new THREE.BoxGeometry(
            1.7,
            1.8,
            1.5
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0xe53935
        });

    const obstacle =
        new THREE.Mesh(
            geometry,
            material
        );


    const randomLane =
        Math.floor(
            Math.random() * 3
        ) - 1;


    obstacle.position.set(
        randomLane * 3,
        0.9,
        -80
    );


    obstacle.userData.lane =
        randomLane;


    scene.add(obstacle);

    obstacles.push(obstacle);
}


// ========================================
// COIN
// ========================================

function createCoin() {

    const geometry =
        new THREE.TorusGeometry(
            0.35,
            0.12,
            12,
            24
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0xffd21f
        });

    const coin =
        new THREE.Mesh(
            geometry,
            material
        );


    const randomLane =
        Math.floor(
            Math.random() * 3
        ) - 1;


    coin.position.set(
        randomLane * 3,
        1.5,
        -80
    );


    scene.add(coin);

    coinObjects.push(coin);
}


// ========================================
// MOVE PLAYER
// ========================================

function updatePlayer() {

    const targetX =
        targetLane * 3;


    player.position.x +=
        (
            targetX -
            player.position.x
        ) * 0.15;


    if (jumping) {

        player.position.y +=
            jumpVelocity;

        jumpVelocity -=
            0.018;


        if (
            player.position.y <= 0
        ) {

            player.position.y = 0;

            jumping = false;

            jumpVelocity = 0;
        }
    }
}


// ========================================
// OBSTACLES MOVE TOWARD PLAYER
// ========================================

function updateObstacles() {

    for (
        let i = obstacles.length - 1;
        i >= 0;
        i--
    ) {

        const obstacle =
            obstacles[i];


        obstacle.position.z +=
            speed;


        const xDistance =
            Math.abs(
                player.position.x -
                obstacle.position.x
            );


        const zDistance =
            Math.abs(
                player.position.z -
                obstacle.position.z
            );


        const yDistance =
            player.position.y;


        if (
            xDistance < 1.2 &&
            zDistance < 1.4 &&
            yDistance < 1.2
        ) {

            lives--;

            obstacle.position.z =
                100;


            updateHUD();


            if (
                lives <= 0
            ) {

                gameRunning = false;

                if (menu) {
                    menu.style.display =
                        "flex";
                }

            }
        }


        if (
            obstacle.position.z > 15
        ) {

            scene.remove(obstacle);

            obstacles.splice(
                i,
                1
            );
        }
    }
}


// ========================================
// COINS MOVE
// ========================================

function updateCoins() {

    for (
        let i = coinObjects.length - 1;
        i >= 0;
        i--
    ) {

        const coin =
            coinObjects[i];


        coin.position.z +=
            speed;


        coin.rotation.y +=
            0.08;


        const xDistance =
            Math.abs(
                player.position.x -
                coin.position.x
            );


        const zDistance =
            Math.abs(
                player.position.z -
                coin.position.z
            );


        if (
            xDistance < 1 &&
            zDistance < 1.3
        ) {

            coins++;

            scene.remove(coin);

            coinObjects.splice(
                i,
                1
            );

            continue;
        }


        if (
            coin.position.z > 15
        ) {

            scene.remove(coin);

            coinObjects.splice(
                i,
                1
            );
        }
    }
}


// ========================================
// JUMP
// ========================================

function jump() {

    if (
        !gameRunning ||
        jumping
    ) {
        return;
    }


    jumping = true;

    jumpVelocity = 0.34;
}


// ========================================
// DUCK
// ========================================

function duck() {

    if (!gameRunning) {
        return;
    }


    ducking = true;


    const body =
        player.getObjectByName(
            "body"
        );

    const head =
        player.getObjectByName(
            "head"
        );


    if (body) {
        body.scale.y = 0.5;
        body.position.y = 0.8;
    }


    if (head) {
        head.position.y = 1.5;
    }
}


function stopDuck() {

    ducking = false;


    const body =
        player.getObjectByName(
            "body"
        );

    const head =
        player.getObjectByName(
            "head"
        );


    if (body) {
        body.scale.y = 1;
        body.position.y = 1.2;
    }


    if (head) {
        head.position.y = 2.25;
    }
}


// ========================================
// GAME UPDATE
// ========================================

function updateGame() {

    if (!gameRunning) {
        return;
    }


    updatePlayer();

    updateObstacles();

    updateCoins();


    obstacleTimer--;

    if (
        obstacleTimer <= 0
    ) {

        createObstacle();

        obstacleTimer = 90;
    }


    coinTimer--;

    if (
        coinTimer <= 0
    ) {

        createCoin();

        coinTimer = 100;
    }


    score += 0.1;


    speed += 0.00003;


    updateHUD();
}


// ========================================
// HUD
// ========================================

function updateHUD() {

    const livesElement =
        document.getElementById("lives");

    const scoreElement =
        document.getElementById("score");

    const coinsElement =
        document.getElementById("coins");


    if (livesElement) {
        livesElement.textContent =
            lives;
    }


    if (scoreElement) {
        scoreElement.textContent =
            Math.floor(score);
    }


    if (coinsElement) {
        coinsElement.textContent =
            coins;
    }
}


// ========================================
// CLEAR OBJECTS
// ========================================

function clearObjects() {

    while (
        obstacles.length > 0
    ) {

        const obstacle =
            obstacles.pop();

        scene.remove(obstacle);
    }


    while (
        coinObjects.length > 0
    ) {

        const coin =
            coinObjects.pop();

        scene.remove(coin);
    }
}


// ========================================
// CONTROLS
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowLeft"
        ) {

            targetLane =
                Math.max(
                    -1,
                    targetLane - 1
                );
        }


        if (
            event.key === "ArrowRight"
        ) {

            targetLane =
                Math.min(
                    1,
                    targetLane + 1
                );
        }


        if (
            event.key === "ArrowUp" ||
            event.code === "Space"
        ) {

            jump();
        }


        if (
            event.key === "ArrowDown"
        ) {

            duck();
        }
    }
);


document.addEventListener(
    "keyup",
    function(event) {

        if (
            event.key === "ArrowDown"
        ) {

            stopDuck();
        }
    }
);


// ========================================
// BUTTON CONTROLS
// ========================================

if (startButton) {

    startButton.addEventListener(
        "click",
        startGame
    );
}


const leftButton =
    document.getElementById(
        "leftButton"
    );

const rightButton =
    document.getElementById(
        "rightButton"
    );

const jumpButton =
    document.getElementById(
        "jumpButton"
    );

const duckButton =
    document.getElementById(
        "duckButton"
    );


if (leftButton) {

    leftButton.addEventListener(
        "click",
        function() {

            targetLane =
                Math.max(
                    -1,
                    targetLane - 1
                );
        }
    );
}


if (rightButton) {

    rightButton.addEventListener(
        "click",
        function() {

            targetLane =
                Math.min(
                    1,
                    targetLane + 1
                );
        }
    );
}


if (jumpButton) {

    jumpButton.addEventListener(
        "click",
        jump
    );
}


if (duckButton) {

    duckButton.addEventListener(
        "pointerdown",
        duck
    );


    duckButton.addEventListener(
        "pointerup",
        stopDuck
    );


    duckButton.addEventListener(
        "pointercancel",
        stopDuck
    );
}


// ========================================
// CAMERA
// ========================================

function updateCamera() {

    if (!player) {
        return;
    }


    camera.position.x +=
        (
            player.position.x * 0.2 -
            camera.position.x
        ) * 0.05;


    camera.lookAt(
        player.position.x,
        1,
        -15
    );
}


// ========================================
// MAIN LOOP
// ========================================

function gameLoop() {

    requestAnimationFrame(
        gameLoop
    );


    updateGame();

    updateCamera();


    if (renderer) {

        renderer.render(
            scene,
            camera
        );
    }
}


// ========================================
// RESIZE
// ========================================

function resize() {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
}


// ========================================
// INITIALIZE
// ========================================

init();
