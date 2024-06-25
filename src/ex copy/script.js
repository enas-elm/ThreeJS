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


// Mesh
const geometry = new THREE.SphereGeometry(5, 32, 16)
// Shader
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        random: { value: 1 },
        color: { value: new THREE.Color("red") }
    }
})

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh)


// Mesh 2
const geometry2 = new THREE.TorusKnotGeometry(7, 0.5, 50, 7);
const material2 = new THREE.MeshBasicMaterial({ color: "#D43607" });
const mesh2 = new THREE.Mesh(geometry2, material2);
scene.add(mesh2);

// Mesh 3
const geometry3 = new THREE.PlaneGeometry(100, 100, 100, 100);
const material3 = new THREE.MeshBasicMaterial({ color: "#000000", wireframe: true });
const mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.rotation.x = Math.PI * 0.5
mesh3.position.y = -5
scene.add(mesh3);

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
    var stepMesh = new THREE.Mesh(stepVertical, stepVerticalMaterial);

    //La posizione dello step
    stepMesh.position.x = 0;
    stepMesh.position.y = theChange * verticalStepHeight - stepThickness;
    stepMesh.position.z = -horizontalStepDepth * theChange + (stepThickness);

    //add the step mesh to the scene
    scene.add(stepMesh)

    //CREAZIONE DEL PIANO DELLO SCALINO
    //it can be added to the previous mesh
    var stepMesh = new THREE.Mesh(stepHorizontal, stepHorizontalMaterial);

    var stepHalfTickness = stepThickness / 2;

    stepMesh.position.x = 0;
c    stepMesh.position.z = (-horizontalStepDepth) * theChange;

    scene.add(stepMesh)

};

staircase(stepWidth, verticalStepHeight, stepThickness, horizontalStepDepth);

//change the number of step ups to change the steps
for (var stepUp = 0; stepUp < 8; stepUp++) {
    var theChange = stepUp;
    staircase(stepWidth, verticalStepHeight, stepThickness, horizontalStepDepth, theChange);
};
// END STAIRCASE





// Group
const group = new THREE.Group()
group.add(mesh)
group.add(mesh2)
group.position.y = 5
group.position.x = 10
scene.add(group)


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

    // Mesh 2
    mesh2.rotation.x += 0.005
    mesh2.rotation.y += 0.001
    mesh2.rotation.z += 0.005


    controls.update()
    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()


// GUI
const gui = new GUI()
const mesh2GUI = gui.addFolder('MESH 2');
mesh2GUI.add(mesh2.scale, 'x').min(-3).max(3).step(0.01).name('Mesh3 X Position');
mesh2GUI.add(mesh2.scale, 'y').min(-3).max(3).step(0.01).name('Mesh3 Y Position');
mesh2GUI.add(mesh2.position, 'z').min(-3).max(3).step(0.01).name('Mesh3 Z Position');

mesh2GUI.close();