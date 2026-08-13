const canvasContainer = document.getElementById("gameCanvas");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const menu = document.getElementById("menu");
const gameOver = document.getElementById("gameOver");

const livesText = document.getElementById("lives");
const coinsText = document.getElementById("coins");
const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");

const finalScore = document.getElementById("finalScore");
const finalCoins = document.getElementById("finalCoins");


// ==================================================
// GAME STATE
// ==================================================

let gameRunning = false;

let lives = 3;
let coins = 0;
let score = 0;
let level = 1;

let speed = 0.32;

let currentLane = 0;
let targetLane = 0;

let jumping = false;
let jumpVelocity = 0;

let ducking = false;

let obstacleTimer = 0;
let coinTimer = 0;

let invincibleTimer = 0;


// ==================================================
// THREE.JS
// ==================================================

let scene;
let camera;
let renderer;

let player;

const obstacles = [];
const coinObjects = [];
const roadLines = [];


// ==================================================
// INITIALIZE THREE.JS
// ==================================================

function initializeGame() {

    if (typeof THREE === "undefined") {

        alert(
            "Three.js failed to load. Please check index.html."
        );

        return;

    }


    scene = new THREE.Scene();

    scene.background =
        new THREE.Color(0x75cfff);


    camera =
        new THREE.PerspectiveCamera(
            65,
            window.innerWidth /
            window.innerHeight,
            0.1,
            300
        );


    camera.position.set(
        0,
        5,
        10
    );


    renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.shadowMap.enabled = true;


    canvasContainer.appendChild(
        renderer.domElement
    );


    createLights();

    createRoad();

    createPlayer();

    createRoadLines();

    createEnvironment();


    window.addEventListener(
        "resize",
        handleResize
    );


    requestAnimationFrame(
        gameLoop
    );

}


// ==================================================
// LIGHTS
// ==================================================

function createLights() {

    const hemisphereLight =
        new THREE.HemisphereLight(
            0xffffff,
            0x557755,
            2
        );


    scene.add(
        hemisphereLight
    );


    const sunlight =
        new THREE.DirectionalLight(
            0xffffff,
            2.5
        );


    sunlight.position.set(
        10,
        20,
        10
    );


    sunlight.castShadow = true;


    scene.add(
        sunlight
    );

}


// ==================================================
// ROAD
// ==================================================

function createRoad() {

    const roadGeometry =
        new THREE.PlaneGeometry(
            10,
            320
        );


    const roadMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x303030,
            roughness: 0.9
        });


    const road =
        new THREE.Mesh(
            roadGeometry,
            roadMaterial
        );


    road.rotation.x =
        -Math.PI / 2;


    road.position.set(
        0,
        0,
        -145
    );


    road.receiveShadow = true;


    scene.add(
        road
    );

}


// ==================================================
// ROAD LINES
// ==================================================

function createRoadLines() {

    for (
        let z = 10;
        z > -300;
        z -= 10
    ) {

        createRoadLine(
            -1.5,
            z
        );


        createRoadLine(
            1.5,
            z
        );

    }

}


function createRoadLine(
    x,
    z
) {

    const geometry =
        new THREE.BoxGeometry(
            0.08,
            0.03,
            5
        );


    const material =
        new THREE.MeshStandardMaterial({
            color: 0xffffff
        });


    const line =
        new THREE.Mesh(
            geometry,
            material
        );


    line.position.set(
        x,
        0.03,
        z
    );


    scene.add(
        line
    );


    roadLines.push(
        line
    );

}


// ==================================================
// PLAYER
// ==================================================

function createPlayer() {

    player =
        new THREE.Group();


    player.position.set(
        0,
        0,
        5
    );


    scene.add(
        player
    );


    createPlayerBody();

    createPlayerHead();

    createPlayerLegs();

}


// ==================================================
// PLAYER BODY
// ==================================================

function createPlayerBody() {

    const geometry =
        new THREE.BoxGeometry(
            0.8,
            1.4,
            0.6
        );


    const material =
        new THREE.MeshStandardMaterial({
            color: 0x2468d8
        });


    const body =
        new THREE.Mesh(
            geometry,
            material
        );


    body.position.y =
        1.35;


    body.castShadow = true;


    body.name =
        "playerBody";


    player.add(
        body
    );

}


// ==================================================
// PLAYER HEAD
// ==================================================

function createPlayerHead() {

    const geometry =
        new THREE.SphereGeometry(
            0.4,
            20,
            20
        );


    const material =
        new THREE.MeshStandardMaterial({
            color: 0xffc58c
        });


    const head =
        new THREE.Mesh(
            geometry,
            material
        );


    head.position.y =
        2.4;


    head.castShadow = true;


    head.name =
        "playerHead";


    player.add(
        head
    );

}


// ==================================================
// PLAYER LEGS
// ==================================================

function createPlayerLegs() {

    const geometry =
        new THREE.BoxGeometry(
            0.22,
            0.75,
            0.25
        );


    const material =
        new THREE.MeshStandardMaterial({
            color: 0x222222
        });


    const leftLeg =
        new THREE.Mesh(
            geometry,
            material
        );


    leftLeg.position.set(
        -0.2,
        0.38,
        0
    );


    const rightLeg =
        new THREE.Mesh(
            geometry,
            material
        );


    rightLeg.position.set(
        0.2,
        0.38,
        0
    );


    leftLeg.castShadow = true;
    rightLeg.castShadow = true;


    player.add(
        leftLeg
    );


    player.add(
        rightLeg
    );

}


// ==================================================
// ENVIRONMENT
// ==================================================

function createEnvironment() {

    const grassGeometry =
        new THREE.PlaneGeometry(
            80,
            320
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


    grass.position.set(
        0,
        -0.02,
        -145
    );


    grass.receiveShadow = true;


    scene.add(
        grass
    );

}


// ==================================================
// START GAME
// ==================================================

function startGame() {

    clearObjects();


    gameRunning = true;


    lives = 3;
    coins = 0;
    score = 0;
    level = 1;

    speed = 0.32;

    currentLane = 0;
    targetLane = 0;

    jumping = false;
    jumpVelocity = 0;

    ducking = false;

    obstacleTimer = 50;
    coinTimer = 70;

    invincibleTimer = 0;


    player.position.set(
        0,
        0,
        5
    );


    updateHUD();


    menu.style.display =
        "none";


    gameOver.style.display =
        "none";

}


// ==================================================
// CLEAR OLD OBJECTS
// ==================================================

function clearObjects() {

    while (
        obstacles.length > 0
    ) {

        const obstacle =
            obstacles.pop();


        scene.remove(
            obstacle
        );

    }


    while (
        coinObjects.length > 0
    ) {

        const coin =
            coinObjects.pop();


        scene.remove(
            coin
        );

    }

}


// ==================================================
// END GAME
// ==================================================

function endGame() {

    gameRunning = false;


    finalScore.textContent =
        "Score: " +
        Math.floor(score);


    finalCoins.textContent =
        "Coins: " +
        coins;


    gameOver.style.display =
        "flex";

}


// ==================================================
// MOVE LEFT
// ==================================================

function moveLeft() {

    if (
        !gameRunning
    ) {

        return;

    }


    targetLane =
        Math.max(
            -1,
            targetLane - 1
        );

}


// ==================================================
// MOVE RIGHT
// ==================================================

function moveRight() {

    if (
        !gameRunning
    ) {

        return;

    }


    targetLane =
        Math.min(
            1,
            targetLane + 1
        );

}


// ==================================================
// JUMP
// ==================================================

function jump() {

    if (
        !gameRunning
    ) {

        return;

    }


    if (
        jumping
    ) {

        return;

    }


    jumping = true;

    jumpVelocity =
        0.34;

}


// ==================================================
// DUCK
// ==================================================

function startDuck() {

    if (
        !gameRunning
    ) {

        return;

    }


    ducking = true;


    const body =
        player.getObjectByName(
            "playerBody"
        );


    const head =
        player.getObjectByName(
            "playerHead"
        );


    if (body) {

        body.scale.y =
            0.55;

        body.position.y =
            1.05;

    }


    if (head) {

        head.position.y =
            1.65;

    }

}


function stopDuck() {

    ducking = false;


    const body =
        player.getObjectByName(
            "playerBody"
        );


    const head =
        player.getObjectByName(
            "playerHead"
        );


    if (body) {

        body.scale.y =
            1;

        body.position.y =
            1.35;

    }


    if (head) {

        head.position.y =
            2.4;

    }

}


// ==================================================
// CREATE OBSTACLE
// ==================================================

function createObstacle() {

    const isLow =
        Math.random() < 0.45;


    const width =
        isLow
            ? 2.1
            : 1.4;


    const height =
        isLow
            ? 0.9
            : 2.4;


    const depth =
        1.2;


    const geometry =
        new THREE.BoxGeometry(
            width,
            height,
            depth
        );


    const material =
        new THREE.MeshStandardMaterial({
            color:
                isLow
                    ? 0xe29a35
                    : 0xd93636
        });


    const obstacle =
        new THREE.Mesh(
            geometry,
            material
        );


    const laneIndex =
        Math.floor(
            Math.random() * 3
        ) - 1;


    obstacle.position.set(
        laneIndex * 3,
        height / 2,
        -100
    );


    obstacle.castShadow = true;


    obstacle.userData.isLow =
        isLow;


    scene.add(
        obstacle
    );


    obstacles.push(
        obstacle
    );

}


// ==================================================
// CREATE COIN
// ==================================================

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
            color: 0xffd21f,
            metalness: 0.8,
            roughness: 0.25
        });


    const coin =
        new THREE.Mesh(
            geometry,
            material
        );


    const laneIndex =
        Math.floor(
            Math.random() * 3
        ) - 1;


    coin.position.set(
        laneIndex * 3,
        1.5,
        -100
    );


    coin.rotation.y =
        Math.PI / 2;


    scene.add(
        coin
    );


    coinObjects.push(
        coin
    );

}


// ==================================================
// UPDATE PLAYER
// ==================================================

function updatePlayer() {

    const targetX =
        targetLane * 3;


    player.position.x +=
        (
            targetX -
            player.position.x
        ) * 0.16;


    if (
        jumping
    ) {

        player.position.y +=
            jumpVelocity;


        jumpVelocity -=
            0.018;


        if (
            player.position.y <= 0
        ) {

            player.position.y =
                0;

            jumping = false;

            jumpVelocity = 0;

        }

    }

}


// ==================================================
// UPDATE ROAD
// ==================================================

function updateRoad() {

    for (
        let i = 0;
        i < roadLines.length;
        i++
    ) {

        const line =
            roadLines[i];


        line.position.z +=
            speed;


        if (
            line.position.z > 15
        ) {

            line.position.z -=
                310;

        }

    }

}


// ==================================================
// UPDATE OBSTACLES
// ==================================================

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


        const dx =
            Math.abs(
                player.position.x -
                obstacle.position.x
            );


        const dz =
            Math.abs(
                player.position.z -
                obstacle.position.z
            );


        let collisionHeight =
            1.4;


        if (
            obstacle.userData.isLow
        ) {

            collisionHeight =
                1.0;

        }


        const playerHeight =
            player.position.y;


        if (
            dx < 1.1 &&
            dz < 1.2 &&
            playerHeight <
                collisionHeight &&
            !ducking &&
            invincibleTimer <= 0
        ) {

            hitPlayer();


            scene.remove(
                obstacle
            );


            obstacles.splice(
                i,
                1
            );


            continue;

        }


        if (
            obstacle.position.z >
            15
        ) {

            scene.remove(
                obstacle
            );


            obstacles.splice(
                i,
                1
            );

        }

    }

}


// ==================================================
// UPDATE COINS
// ==================================================

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


        coin.rotation.z +=
            0.08;


        const dx =
            Math.abs(
                player.position.x -
                coin.position.x
            );


        const dz =
            Math.abs(
                player.position.z -
                coin.position.z
            );


        const dy =
            Math.abs(
                player.position.y +
                1.4 -
                coin.position.y
            );


        if (
            dx < 1 &&
            dz < 1.2 &&
            dy < 1
        ) {

            coins++;


            scene.remove(
                coin
            );


            coinObjects.splice(
                i,
                1
            );


            continue;

        }


        if (
            coin.position.z >
            15
        ) {

            scene.remove(
                coin
            );


            coinObjects.splice(
                i,
                1
            );

        }

    }

}


// ==================================================
// HIT PLAYER
// ==================================================

function hitPlayer() {

    if (
        invincibleTimer > 0
    ) {

        return;

    }


    lives--;


    invincibleTimer =
        90;


    updateHUD();


    if (
        navigator.vibrate
    ) {

        navigator.vibrate(
            150
        );

    }


    if (
        lives <= 0
    ) {

        endGame();

    }

}


// ==================================================
// SPAWN SYSTEM
// ==================================================

function updateSpawner() {

    obstacleTimer--;


    if (
        obstacleTimer <= 0
    ) {

        createObstacle();


        obstacleTimer =
            Math.max(
                45,
                90 - level * 4
            );

    }


    coinTimer--;


    if (
        coinTimer <= 0
    ) {

        createCoin();


        coinTimer =
            80;

    }

}


// ==================================================
// SCORE AND LEVEL
// ==================================================

function updateScore() {

    score +=
        speed * 0.1;


    const newLevel =
        Math.floor(
            score / 100
        ) + 1;


    if (
        newLevel !== level
    ) {

        level =
            newLevel;


        speed =
            0.32 +
            (
                level - 1
            ) * 0.05;

    }

}


// ==================================================
// HUD
// ==================================================

function updateHUD() {

    livesText.textContent =
        lives;


    coinsText.textContent =
        coins;


    scoreText.textContent =
        Math.floor(
            score
        );


    levelText.textContent =
        level;

}


// ==================================================
// GAME UPDATE
// ==================================================

function updateGame() {

    if (
        !gameRunning
    ) {

        return;

    }


    if (
        invincibleTimer > 0
    ) {

        invincibleTimer--;

    }


    updatePlayer();

    updateRoad();

    updateObstacles();

    updateCoins();

    updateSpawner();

    updateScore();

    updateHUD();

}


// ==================================================
// CAMERA
// ==================================================

function updateCamera() {

    if (
        !player
    ) {

        return;

    }


    camera.position.x +=
        (
            player.position.x * 0.2 -
            camera.position.x
        ) * 0.05;


    camera.position.y +=
        (
            5 +
            player.position.y * 0.2 -
            camera.position.y
        ) * 0.05;


    camera.lookAt(
        player.position.x,
        1.2,
        -15
    );

}


// ==================================================
// GAME LOOP
// ==================================================

function gameLoop() {

    requestAnimationFrame(
        gameLoop
    );


    updateGame();

    updateCamera();


    if (
        renderer
    ) {

        renderer.render(
            scene,
            camera
        );

    }

}


// ==================================================
// BUTTONS
// ==================================================

startButton.addEventListener(
    "click",
    function() {

        startGame();

    }
);


restartButton.addEventListener(
    "click",
    function() {

        startGame();

    }
);


// ==================================================
// MOBILE CONTROLS
// ==================================================

document
    .getElementById("leftButton")
    .addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            moveLeft();

        }
    );


document
    .getElementById("rightButton")
    .addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            moveRight();

        }
    );


document
    .getElementById("jumpButton")
    .addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            jump();

        }
    );


const duckButton =
    document.getElementById(
        "duckButton"
    );


duckButton.addEventListener(
    "pointerdown",
    function(event) {

        event.preventDefault();

        startDuck();

    }
);


duckButton.addEventListener(
    "pointerup",
    function(event) {

        event.preventDefault();

        stopDuck();

    }
);


duckButton.addEventListener(
    "pointercancel",
    function() {

        stopDuck();

    }
);


// ==================================================
// KEYBOARD CONTROLS
// ==================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.code ===
            "ArrowLeft"
        ) {

            moveLeft();

        }


        if (
            event.code ===
            "ArrowRight"
        ) {

            moveRight();

        }


        if (
            event.code ===
            "ArrowUp" ||
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            jump();

        }


        if (
            event.code ===
            "ArrowDown"
        ) {

            startDuck();

        }

    }
);


document.addEventListener(
    "keyup",
    function(event) {

        if (
            event.code ===
            "ArrowDown"
        ) {

            stopDuck();

        }

    }
);


// ==================================================
// RESIZE
// ==================================================

function handleResize() {

    if (
        !camera ||
        !renderer
    ) {

        return;

    }


    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

}


// ==================================================
// START
// ==================================================

initializeGame();
