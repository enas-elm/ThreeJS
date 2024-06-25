import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { GUI } from 'lil-gui'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import textureSky from '/textures/sky.jpg'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#CBCFD9")

// Helpers
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)




// Mesh 4

function createWall(width, height, depth, texture) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const wall = new THREE.Mesh(geometry, material);
    return wall;
}
// Room dimensions
const roomWidth = 100;
const roomHeight = 50;
const roomDepth = 100;


// Create walls
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load(textureSky);
colorTexture.colorSpace = THREE.SRGBColorSpace;


const wall1 = createWall(roomWidth, roomHeight, 0.1, colorTexture);
wall1.position.set(0, roomHeight / 2, -roomDepth / 2);
scene.add(wall1);

const wall2 = createWall(roomWidth, roomHeight, 0.1, colorTexture);
wall2.position.set(0, roomHeight / 2, roomDepth / 2);
scene.add(wall2);

const wall3 = createWall(0.1, roomHeight, roomDepth, colorTexture);
wall3.position.set(-roomWidth / 2, roomHeight / 2, 0);
scene.add(wall3);

// const wall4 = createWall(0.1, roomHeight, roomDepth, colorTexture);
// wall4.position.set(roomWidth / 2, roomHeight / 2, 0);
// scene.add(wall4);

const floor = createWall(roomWidth, 0.1, roomDepth, colorTexture);
floor.position.set(0, 0, 0);
scene.add(floor);

// const ceiling = createWall(roomWidth, 0.1, roomDepth, colorTexture);
// ceiling.position.set(0, roomHeight, 0);
// scene.add(ceiling);


let steps = [];


// Staircase
//define the materials // the lamber works with the light. the basic material doenst
var stepVerticalMaterial = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
var stepHorizontalMaterial = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });

//define the dimension of the steps
var stepWidth = 7;
var verticalStepHeight = 3;
var stepThickness = 1;
var horizontalStepDepth = 3;


function staircase(stepWidth, verticalStepHeight, stepThickness, horizontalStepDepth, theChange) {
    //create the steps geometry
    var stepVertical = new THREE.BoxGeometry(stepWidth, verticalStepHeight, stepThickness);
    var stepHorizontal = new THREE.BoxGeometry(stepWidth, stepThickness, horizontalStepDepth);
    //CREAZIONE DEL RIALZO DELLO SCALINO
    //create the mesh. The actual step. Created by putting together the shape and the material
    var stepMeshVertical = new THREE.Mesh(stepVertical, stepVerticalMaterial);

    //La posizione dello step
    stepMeshVertical.position.x = 0;
    // stepMesh.position.y = theChange * verticalStepHeight - stepThickness;
    stepMeshVertical.position.y = 50 - stepThickness;
    stepMeshVertical.position.z = -horizontalStepDepth * theChange + (stepThickness);

    //add the step mesh to the scene
    scene.add(stepMeshVertical)







    //CREAZIONE DEL PIANO DELLO SCALINO
    //it can be added to the previous mesh
    var stepMeshHorizontal = new THREE.Mesh(stepHorizontal, stepHorizontalMaterial);

    var stepHalfTickness = stepThickness / 2;

    stepMeshHorizontal.position.x = 0;
    stepMeshHorizontal.position.y = 50 + stepThickness;
    // stepMesh.position.y = theChange * verticalStepHeight - stepThickness;
    stepMeshHorizontal.position.z = (-horizontalStepDepth) * theChange;

    scene.add(stepMeshHorizontal)

    steps.push({ vertical: stepMeshVertical, horizontal: stepMeshHorizontal, finalY: verticalStepHeight * theChange - stepThickness, stepThickness, verticalStepHeight });


};

// staircase(stepWidth, verticalStepHeight, stepThickness, horizontalStepDepth);

//change the number of step ups to change the steps
// for (var stepUp = 0; stepUp < 8; stepUp++) {
//     var theChange = stepUp;
//     staircase(stepWidth, verticalStepHeight, stepThickness, horizontalStepDepth, theChange);
// };


for (let stepUp = 0; stepUp < 8; stepUp++) {
    staircase(stepWidth, verticalStepHeight, stepThickness, horizontalStepDepth, stepUp);
}
// END STAIRCASE







// Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 50
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Animate

const controls = new OrbitControls(camera, canvas)

const animate = () => {
    // const elapsedTime = clock.getElapsedTime();
    steps.forEach(step => {
        if (step.vertical.position.y > step.finalY) {
            step.vertical.position.y -= 0.5; // Adjust speed as needed
            step.horizontal.position.y -= 0.5; // Adjust speed as needed
        }
    });

    controls.update()

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()


