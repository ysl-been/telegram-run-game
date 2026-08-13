console.log("GAME JS LOADED");

let scene;
let camera;
let renderer;

let cube;

let running = false;

const startButton =
    document.getElementById("startButton");

const menu =
    document.getElementById("menu");


// ================================
// CREATE 3D
// ================================

function init() {

    console.log("THREE:", typeof THREE);

    if (typeof THREE === "undefined") {

        alert(
            "Three.js 没有加载成功！"
        );

        return;
    }


    scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(0x55aaff);


    camera =
        new THREE.PerspectiveCamera(
            70,
            window.innerWidth /
            window.innerHeight,
            0.1,
            100
        );


    camera.position.z =
        5;


    renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    document
        .getElementById("gameCanvas")
        .appendChild(
            renderer.domElement
        );


    // ============================
    // LIGHT
    // ============================

    const light =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );


    light.position.set(
        2,
        4,
        5
    );


    scene.add(light);


    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            1
        );


    scene.add(ambient);


    // ============================
    // CUBE
    // ============================

    const geometry =
        new THREE.BoxGeometry(
            1,
            1,
            1
        );


    const material =
        new THREE.MeshStandardMaterial({
            color: 0xff3333
        });


    cube =
        new THREE.Mesh(
            geometry,
            material
        );


    scene.add(cube);


    animate();

}


// ================================
// START BUTTON
// ================================

startButton.addEventListener(
    "click",
    function() {

        console.log(
            "START BUTTON CLICKED"
        );


        running = true;

        menu.style.display =
            "none";

    }
);


// ================================
// ANIMATION
// ================================

function animate() {

    requestAnimationFrame(
        animate
    );


    if (running) {

        cube.rotation.x +=
            0.02;

        cube.rotation.y +=
            0.03;

    }


    renderer.render(
        scene,
        camera
    );

}


// ================================
// RESIZE
// ================================

window.addEventListener(
    "resize",
    function() {

        if (!camera || !renderer) {
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
);


// ================================
// START
// ================================

init();// HTML
// ========================================

const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");

const menu =
    document.getElementById("menu");

const gameOver =
    document.getElementById("gameOver");

const livesText =
    document.getElementById("lives");

const coinsText =
    document.getElementById("coins");

const scoreText =
    document.getElementById("score");

const levelText =
    document.getElementById("level");

const finalScore =
    document.getElementById("finalScore");

const finalCoins =
    document.getElementById("finalCoins");


// ========================================
// THREE.JS START
// ========================================

function createGame() {

    // Scene
    scene = new THREE.Scene();

    scene.background =
        new THREE.Color(0x75cfff);


    // Camera
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


    // Renderer
    renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.shadowMap.enabled = true;


    document
        .getElementById("gameCanvas")
        .appendChild(renderer.domElement);


    // Lights
    const light =
        new THREE.HemisphereLight(
            0xffffff,
            0x444444,
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

    sun.castShadow = true;

    scene.add(sun);


    createRoad();

    createPlayer();

    window.addEventListener(
        "resize",
        resize
    );


    animate();
}


// ========================================
// ROAD
// ========================================

function createRoad() {

    const geometry =
        new THREE.BoxGeometry(
            10,
            0.2,
            300
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x333333
        });

    road =
        new THREE.Mesh(
            geometry,
            material
        );

    road.position.set(
        0,
        -0.1,
        -140
    );

    road.receiveShadow = true;

    scene.add(road);


    // Lane lines

    for (
        let z = 10;
        z > -290;
        z -= 10
    ) {

        createLine(
            -1.5,
            z
        );

        createLine(
            1.5,
            z
        );

    }
}


function createLine(x, z) {

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

    scene.add(line);

}


// ========================================
// PLAYER
// ========================================

function createPlayer() {

    player =
        new THREE.Group();

    player.position.set(
        0,
        0,
        5
    );

    scene.add(player);


    // Body

    const bodyGeometry =
        new THREE.BoxGeometry(
            0.8,
            1.4,
            0.6
        );

    const bodyMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x2266dd
        });

    const body =
        new THREE.Mesh(
            bodyGeometry,
            bodyMaterial
        );

    body.position.y = 1.3;

    body.castShadow = true;

    player.add(body);


    // Head

    const headGeometry =
        new THREE.SphereGeometry(
            0.4,
            16,
            16
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

    head.position.y = 2.35;

    head.castShadow = true;

    player.add(head);


    // Legs

    const legGeometry =
        new THREE.BoxGeometry(
            0.22,
            0.75,
            0.25
        );

    const legMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x222222
        });


    const leg1 =
        new THREE.Mesh(
            legGeometry,
            legMaterial
        );

    leg1.position.set(
        -0.2,
        0.38,
        0
    );


    const leg2 =
        new THREE.Mesh(
            legGeometry,
            legMaterial
        );

    leg2.position.set(
        0.2,
        0.38,
        0
    );


    player.add(leg1);
    player.add(leg2);

}


// ========================================
// START GAME
// ========================================

function startGame() {

    console.log(
        "GAME START"
    );


    gameRunning = true;


    lives = 3;

    score = 0;

    coinCount = 0;

    level = 1;

    speed = 0.35;

    lane = 0;

    targetLane = 0;

    jumping = false;

    ducking = false;

    jumpVelocity = 0;


    player.position.set(
        0,
        0,
        5
    );


    livesText.textContent =
        lives;

    coinsText.textContent =
        coinCount;

    scoreText.textContent =
        0;

    levelText.textContent =
        1;


    menu.style.display =
        "none";

    gameOver.style.display =
        "none";

}


// ========================================
// GAME OVER
// ========================================

function endGame() {

    gameRunning = false;


    finalScore.textContent =
        "分数：" +
        Math.floor(score);

    finalCoins.textContent =
        "金币：" +
        coinCount;


    gameOver.style.display =
        "flex";

}


// ========================================
// LEFT
// ========================================

function moveLeft() {

    if (!gameRunning) return;

    targetLane =
        Math.max(
            -1,
            targetLane - 1
        );

}


// ========================================
// RIGHT
// ========================================

function moveRight() {

    if (!gameRunning) return;

    targetLane =
        Math.min(
            1,
            targetLane + 1
        );

}


// ========================================
// JUMP
// ========================================

function jump() {

    if (!gameRunning) return;

    if (jumping) return;

    jumping = true;

    jumpVelocity = 0.32;

}


// ========================================
// DUCK
// ========================================

function startDuck() {

    if (!gameRunning) return;

    ducking = true;

}


function stopDuck() {

    ducking = false;

}


// ========================================
// CONTROLS
// ========================================

document
    .getElementById("leftButton")
    .addEventListener(
        "pointerdown",
        function(e) {

            e.preventDefault();

            moveLeft();

        }
    );


document
    .getElementById("rightButton")
    .addEventListener(
        "pointerdown",
        function(e) {

            e.preventDefault();

            moveRight();

        }
    );


document
    .getElementById("jumpButton")
    .addEventListener(
        "pointerdown",
        function(e) {

            e.preventDefault();

            jump();

        }
    );


const duckButton =
    document.getElementById(
        "duckButton"
    );


duckButton.addEventListener(
    "pointerdown",
    function(e) {

        e.preventDefault();

        startDuck();

    }
);


duckButton.addEventListener(
    "pointerup",
    stopDuck
);


duckButton.addEventListener(
    "pointercancel",
    stopDuck
);


// ========================================
// START BUTTON
// ========================================

startButton.addEventListener(
    "click",
    function() {

        startGame();

    }
);


// ========================================
// RESTART BUTTON
// ========================================

restartButton.addEventListener(
    "click",
    function() {

        startGame();

    }
);


// ========================================
// KEYBOARD
// ========================================

document.addEventListener(
    "keydown",
    function(e) {

        if (
            e.key === "ArrowLeft"
        ) {

            moveLeft();

        }

        if (
            e.key === "ArrowRight"
        ) {

            moveRight();

        }

        if (
            e.key === "ArrowUp" ||
            e.key === " "
        ) {

            jump();

        }

        if (
            e.key === "ArrowDown"
        ) {

            startDuck();

        }

    }
);


document.addEventListener(
    "keyup",
    function(e) {

        if (
            e.key === "ArrowDown"
        ) {

            stopDuck();

        }

    }
);


// ========================================
// CREATE OBSTACLE
// ========================================

function createObstacle() {

    const geometry =
        new THREE.BoxGeometry(
            1.5,
            2,
            1.2
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0xdd3333
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
        1,
        -100
    );


    obstacle.castShadow = true;

    scene.add(obstacle);

    obstacles.push(obstacle);

}


// ========================================
// CREATE COIN
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
            color: 0xffd21f,
            metalness: 0.8
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
        -100
    );


    scene.add(coin);

    coins.push(coin);

}


// ========================================
// UPDATE
// ========================================

function update() {

    if (!gameRunning) return;


    // Player lane

    const targetX =
        targetLane * 3;


    player.position.x +=
        (
            targetX -
            player.position.x
        ) * 0.15;


    // Jump

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


    // Spawn obstacles

    obstacleTimer--;

    if (
        obstacleTimer <= 0
    ) {

        createObstacle();

        obstacleTimer =
            80;

    }


    // Spawn coins

    coinTimer--;

    if (
        coinTimer <= 0
    ) {

        createCoin();

        coinTimer =
            100;

    }


    // Obstacles

    for (
        let i = obstacles.length - 1;
        i >= 0;
        i--
    ) {

        const obstacle =
            obstacles[i];


        obstacle.position.z +=
            speed;


        // Collision

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


        if (
            dx < 1.1 &&
            dz < 1.2 &&
            player.position.y < 1.3 &&
            !ducking
        ) {

            lives--;

            livesText.textContent =
                lives;


            scene.remove(
                obstacle
            );


            obstacles.splice(
                i,
                1
            );


            if (
                lives <= 0
            ) {

                endGame();

            }


            continue;

        }


        if (
            obstacle.position.z > 15
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


    // Coins

    for (
        let i = coins.length - 1;
        i >= 0;
        i--
    ) {

        const coin =
            coins[i];


        coin.position.z +=
            speed;

        coin.rotation.y +=
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


        if (
            dx < 1 &&
            dz < 1.3
        ) {

            coinCount++;

            coinsText.textContent =
                coinCount;


            scene.remove(
                coin
            );

            coins.splice(
                i,
                1
            );

            continue;

        }


        if (
            coin.position.z > 15
        ) {

            scene.remove(
                coin
            );

            coins.splice(
                i,
                1
            );

        }

    }


    // Score

    score +=
        speed * 0.1;


    scoreText.textContent =
        Math.floor(score);


    // Level

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
            0.35 +
            (level - 1) * 0.05;

        levelText.textContent =
            level;

    }

}


// ========================================
// CAMERA
// ========================================

function updateCamera() {

    camera.position.x +=
        (
            player.position.x -
            camera.position.x
        ) * 0.05;


    camera.position.y +=
        (
            5 +
            player.position.y -
            camera.position.y
        ) * 0.05;


    camera.lookAt(
        player.position.x,
        1.2,
        -15
    );

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
// LOOP
// ========================================

function animate() {

    requestAnimationFrame(
        animate
    );


    update();

    updateCamera();


    renderer.render(
        scene,
        camera
    );

}


// ========================================
// START THREE.JS
// ========================================

createGame();

const startButton =
    document.getElementById("startButton");


const restartButton =
    document.getElementById("restartButton");


const finalScore =
    document.getElementById("finalScore");


const finalCoins =
    document.getElementById("finalCoins");


const levelMessage =
    document.getElementById("levelMessage");


/* =========================================
   THREE.JS SCENE
========================================= */

const scene =
    new THREE.Scene();


scene.background =
    new THREE.Color(0x78c8ff);


/* =========================================
   CAMERA
========================================= */

const camera =
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


camera.lookAt(
    0,
    1,
    -10
);


/* =========================================
   RENDERER
========================================= */

const renderer =
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


renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


container.appendChild(
    renderer.domElement
);


/* =========================================
   LIGHTS
========================================= */

const ambientLight =
    new THREE.HemisphereLight(
        0xffffff,
        0x444444,
        2
    );


scene.add(
    ambientLight
);


const sun =
    new THREE.DirectionalLight(
        0xffffff,
        2.5
    );


sun.position.set(
    10,
    20,
    10
);


sun.castShadow = true;


scene.add(
    sun
);


/* =========================================
   GAME VARIABLES
========================================= */

let running = false;

let lives = 3;

let coins = 0;

let score = 0;

let level = 1;

let speed = 0.35;

let lane = 0;

let targetLane = 0;

let verticalVelocity = 0;

let jumping = false;

let ducking = false;

let spawnTimer = 0;

let coinTimer = 0;

let invincibleTimer = 0;


/* =========================================
   PLAYER
========================================= */

const player =
    new THREE.Group();


scene.add(
    player
);


player.position.set(
    0,
    0,
    5
);


/* Body */

const bodyGeometry =
    new THREE.BoxGeometry(
        0.9,
        1.5,
        0.65
    );


const bodyMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.65
    });


const body =
    new THREE.Mesh(
        bodyGeometry,
        bodyMaterial
    );


body.position.y =
    1.45;


body.castShadow = true;


player.add(
    body
);


/* Head */

const headGeometry =
    new THREE.SphereGeometry(
        0.43,
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


head.position.y =
    2.5;


head.castShadow = true;


player.add(
    head
);


/* Legs */

const legGeometry =
    new THREE.BoxGeometry(
        0.25,
        0.8,
        0.3
    );


const legMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x111111
    });


const leftLeg =
    new THREE.Mesh(
        legGeometry,
        legMaterial
    );


const rightLeg =
    new THREE.Mesh(
        legGeometry,
        legMaterial
    );


leftLeg.position.set(
    -0.22,
    0.4,
    0
);


rightLeg.position.set(
    0.22,
    0.4,
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


/* =========================================
   ROAD
========================================= */

const roadWidth = 9;

const roadLength = 300;


/* Road */

const roadGeometry =
    new THREE.PlaneGeometry(
        roadWidth,
        roadLength
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


road.position.z =
    -140;


road.receiveShadow = true;


scene.add(
    road
);


/* =========================================
   ROAD LINES
========================================= */

const laneLines = [];


for (
    let i = 0;
    i < 35;
    i++
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


    line.rotation.x =
        -Math.PI / 2;


    line.position.y =
        0.025;


    line.position.z =
        10 -
        i * 9;


    line.position.x =
        -1.5;


    scene.add(
        line
    );


    laneLines.push(
        line
    );


    const line2 =
        line.clone();


    line2.position.x =
        1.5;


    scene.add(
        line2
    );


    laneLines.push(
        line2
    );

}


/* =========================================
   SIDE GRASS
========================================= */

const grassGeometry =
    new THREE.PlaneGeometry(
        80,
        roadLength
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


grass.position.y =
    -0.02;


grass.position.z =
    -140;


scene.add(
    grass
);


/* =========================================
   OBSTACLES
========================================= */

const obstacles = [];


function createObstacle() {

    const isLow =
        Math.random() < 0.45;


    const obstacle =
        new THREE.Group();


    let width;
    let height;
    let depth;


    if (isLow) {

        width = 2.2;

        height = 0.9;

        depth = 1.2;

    } else {

        width = 1.4;

        height = 2.5;

        depth = 1.2;

    }


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
                    ? 0x9b5b24
                    : 0xd93636,

            roughness: 0.6
        });


    const mesh =
        new THREE.Mesh(
            geometry,
            material
        );


    mesh.position.y =
        height / 2;


    mesh.castShadow = true;


    obstacle.add(
        mesh
    );


    const stripeGeometry =
        new THREE.BoxGeometry(
            width * 0.85,
            0.12,
            0.05
        );


    const stripeMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffffff
        });


    const stripe =
        new THREE.Mesh(
            stripeGeometry,
            stripeMaterial
        );


    stripe.position.set(
        0,
        height * 0.65,
        depth / 2 + 0.03
    );


    obstacle.add(
        stripe
    );


    const laneIndex =
        Math.floor(
            Math.random() * 3
        ) - 1;


    obstacle.position.x =
        laneIndex * 3;


    obstacle.position.z =
        -100;


    scene.add(
        obstacle
    );


    obstacles.push({
        object: obstacle,

        low: isLow,

        lane: laneIndex

    });

}


/* =========================================
   COINS
========================================= */

const coinObjects = [];


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


    coin.castShadow = true;


    scene.add(
        coin
    );


    coinObjects.push(
        coin
    );

}


/* =========================================
   INPUT
========================================= */

function moveLeft() {

    if (!running) {
        return;
    }


    targetLane =
        Math.max(
            -1,
            targetLane - 1
        );

}


function moveRight() {

    if (!running) {
        return;
    }


    targetLane =
        Math.min(
            1,
            targetLane + 1
        );

}


function jump() {

    if (
        !running ||
        jumping
    ) {
        return;
    }


    jumping = true;

    verticalVelocity =
        0.32;

}


function duckStart() {

    if (!running) {
        return;
    }


    ducking = true;


    body.scale.y =
        0.55;


    body.position.y =
        1.05;


    head.position.y =
        1.65;

}


function duckEnd() {

    ducking = false;


    body.scale.y =
        1;


    body.position.y =
        1.45;


    head.position.y =
        2.5;

}


/* =========================================
   BUTTONS
========================================= */

function bindButton(
    id,
    callback
) {

    const button =
        document.getElementById(id);


    button.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            callback();

        }
    );

}


bindButton(
    "leftButton",
    moveLeft
);


bindButton(
    "rightButton",
    moveRight
);


bindButton(
    "jumpButton",
    jump
);


const duckButton =
    document.getElementById(
        "duckButton"
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
    duckEnd
);


duckButton.addEventListener(
    "pointerleave",
    duckEnd
);


/* =========================================
   KEYBOARD
========================================= */

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

            duckStart();

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

            duckEnd();

        }

    }
);


/* =========================================
   COLLISION
========================================= */

function checkObstacleCollision(
    obstacle
) {

    const dx =
        Math.abs(
            player.position.x -
            obstacle.object.position.x
        );


    const dz =
        Math.abs(
            player.position.z -
            obstacle.object.position.z
        );


    if (
        dx < 1.1 &&
        dz < 1.2
    ) {

        if (
            obstacle.low &&
            ducking
        ) {

            return false;

        }


        if (
            !obstacle.low &&
            jumping
        ) {

            return false;

        }


        return true;

    }


    return false;

}


/* =========================================
   HIT PLAYER
========================================= */

function hitPlayer() {

    if (
        invincibleTimer > 0
    ) {

        return;

    }


    lives--;

    invincibleTimer =
        100;


    livesText.textContent =
        lives;


    player.visible = false;


    setTimeout(
        function() {

            player.visible = true;

        },
        120
    );


    if (
        navigator.vibrate
    ) {

        navigator.vibrate(
            180
        );

    }


    if (
        lives <= 0
    ) {

        endGame();

    }

}


/* =========================================
   UPDATE PLAYER
========================================= */

function updatePlayer() {

    const targetX =
        targetLane * 3;


    player.position.x +=
        (
            targetX -
            player.position.x
        ) * 0.18;


    if (jumping) {

        player.position.y +=
            verticalVelocity;


        verticalVelocity -=
            0.018;


        if (
            player.position.y <= 0
        ) {

            player.position.y = 0;

            verticalVelocity = 0;

            jumping = false;

        }

    }

}


/* =========================================
   UPDATE OBSTACLES
========================================= */

function updateObstacles() {

    for (
        let i =
            obstacles.length - 1;
        i >= 0;
        i--
    ) {

        const obstacle =
            obstacles[i];


        /*
         * 障碍物从前方冲向玩家
         */

        obstacle.object.position.z +=
            speed;


        if (
            checkObstacleCollision(
                obstacle
            )
        ) {

            hitPlayer();


            scene.remove(
                obstacle.object
            );


            obstacles.splice(
                i,
                1
            );


            continue;

        }


        if (
            obstacle.object.position.z >
            15
        ) {

            scene.remove(
                obstacle.object
            );


            obstacles.splice(
                i,
                1
            );

        }

    }

}


/* =========================================
   UPDATE COINS
========================================= */

function updateCoins() {

    for (
        let i =
            coinObjects.length - 1;
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
                1.5 -
                coin.position.y
            );


        if (
            dx < 1 &&
            dz < 1.2 &&
            dy < 1
        ) {

            coins++;


            coinsText.textContent =
                coins;


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


/* =========================================
   ROAD ANIMATION
========================================= */

function updateRoad() {

    laneLines.forEach(
        line => {

            line.position.z +=
                speed;


            if (
                line.position.z >
                15
            ) {

                line.position.z -=
                    315;

            }

        }
    );

}


/* =========================================
   SPAWNING
========================================= */

function updateSpawner() {

    spawnTimer--;


    if (
        spawnTimer <= 0
    ) {

        createObstacle();


        spawnTimer =
            Math.max(
                45,
                100 -
                level * 5
            );

    }


    coinTimer--;


    if (
        coinTimer <= 0
    ) {

        createCoin();


        coinTimer =
            80 +
            Math.floor(
                Math.random() * 70
            );

    }

}


/* =========================================
   LEVEL
========================================= */

function updateLevel() {

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
            0.35 +
            (level - 1) * 0.06;


        levelText.textContent =
            level;


        showLevel(
            level
        );

    }

}


/* =========================================
   LEVEL MESSAGE
========================================= */

function showLevel(
    number
) {

    levelMessage.textContent =
        "LEVEL " + number;


    levelMessage.classList.add(
        "show"
    );


    setTimeout(
        function() {

            levelMessage.classList.remove(
                "show"
            );

        },
        1300
    );

}


/* =========================================
   SCORE
========================================= */

function updateScore() {

    score +=
        speed * 0.08;


    scoreText.textContent =
        Math.floor(score);

}


/* =========================================
   GAME UPDATE
========================================= */

function update() {

    if (!running) {
        return;
    }


    if (
        invincibleTimer > 0
    ) {

        invincibleTimer--;

    }


    updatePlayer();

    updateObstacles();

    updateCoins();

    updateRoad();

    updateSpawner();

    updateScore();

    updateLevel();

}


/* =========================================
   START GAME
========================================= */

function startGame() {

    obstacles.forEach(
        item => {

            scene.remove(
                item.object
            );

        }
    );


    obstacles.length = 0;


    coinObjects.forEach(
        coin => {

            scene.remove(
                coin
            );

        }
    );


    coinObjects.length = 0;


    lives = 3;

    coins = 0;

    score = 0;

    level = 1;

    speed = 0.35;

    lane = 0;

    targetLane = 0;

    jumping = false;

    ducking = false;

    verticalVelocity = 0;

    spawnTimer = 50;

    coinTimer = 80;

    invincibleTimer = 0;


    player.position.set(
        0,
        0,
        5
    );


    duckEnd();


    livesText.textContent =
        lives;


    coinsText.textContent =
        coins;


    scoreText.textContent =
        0;


    levelText.textContent =
        1;


    menu.style.display =
        "none";


    gameOver.style.display =
        "none";


    running = true;

}


/* =========================================
   END GAME
========================================= */

function endGame() {

    running = false;


    finalScore.textContent =
        "分数：" +
        Math.floor(score);    width: 42,

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
