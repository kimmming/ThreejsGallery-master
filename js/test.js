import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const totalNum = 10; //전체 액자 갯수
const distance = 100;

let galleryGroup = new THREE.Group();
let pageNum = 0;
let targetNum = 0;
let moveX = 0;

// Scene
const scene = new THREE.Scene();
//size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};
//camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.z = 2;

// camera.scale.x = 1.3;
// camera.scale.z = 1.0;
// camera.scale.y = 1.3;
// camera.Fov = 10;
// camera.Near = 0.1;

scene.add(camera);
//renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#21282a"), 1);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
// Objects

// sphere
const geometry = new THREE.PlaneGeometry(1, 1, 16, 13);
const material = new THREE.PointsMaterial({
    size: 0.005,
    color: "#fff",
});
const sphere = new THREE.Points(geometry, material);
scene.add(sphere);

//particle
const particlesGeometry = new THREE.BufferGeometry();
const loader = new THREE.TextureLoader();
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.height = 100;
canvas.width = 100;
ctx.fillStyle = "#fff";
ctx.beginPath();
ctx.arc(50, 50, 25, 0, 2 * Math.PI);
ctx.fill();

let img = canvas.toDataURL("image/png");
const star = loader.load(img);
const particlesmaterial = new THREE.PointsMaterial({
    size: 0.01,
    map: star,
    transparent: true,
});

const particlesCnt = 2000;
const posArray = new Float32Array(particlesCnt * 3);
// xyz,xyz,xyz , xyz
for (let i = 0; i < particlesCnt * 3; i++) {
    //posArray[i] = Math.random()
    //   posArray[i] = Math.random() - 0.5
    //   posArray[i] = (Math.random() - 0.5) * 5
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
}

particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
);

const particlesMesh = new THREE.Points(particlesGeometry, particlesmaterial);
scene.add(particlesMesh);

//mouse
document.addEventListener("mousemove", animateParticles);

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
    mouseY = event.clientY;
    mouseX = event.clientX;
}

/**
 * Animate
 */

const clock = new THREE.Clock();

const animate = () => {
    window.requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    // // Update objects
    // sphere.rotation.x = 0.211 * elapsedTime;
    // sphere.rotation.y = 0.221 * elapsedTime;
    camera.rotation.z = -0.313 * elapsedTime;
    camera.rotation.z = +0.017 * elapsedTime;

    camera.rotation.x = 0 * elapsedTime;
    camera.rotation.y = -0.25 * elapsedTime;

    particlesMesh.rotation.x = -6 * (elapsedTime * 0.03);
    particlesMesh.rotation.z = -7 * (elapsedTime * 0.05);

    // particlesMesh.rotation.y = -1 * (elapsedTime * 0.05);

    // if (mouseX > 0) {
    //     particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.000008);
    //     particlesMesh.rotation.y = -mouseX * (elapsedTime * 0.000008);
    // }

    renderer.render(scene, camera);
};

animate();
window.addEventListener("resize", stageResize);
