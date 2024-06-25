
import * as THREE from 'three';
import gsap from 'gsap'
import { GUI } from 'lil-gui'

// GUI
const gui = new GUI()


console.log(gui)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Helpers
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

// Group
const group = new THREE.Group()
const group2 = new THREE.Group()


// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.z = Math.PI * 0.25;
mesh.position.x = 2;
console.log(mesh.position.length())
// scene.add(mesh)

// Mesh 2
const geometry2 = new THREE.BoxGeometry(1, 1, 1)
const material2 = new THREE.MeshBasicMaterial({ color: "blue" })
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh2.position.y = -2


// Mesh3
const geometry3 = new THREE.BoxGeometry(1, 1, 1)
const material3 = new THREE.MeshBasicMaterial({ color: "orange" })
const mesh3 = new THREE.Mesh(geometry3, material3)

group.add(mesh)
group.add(mesh2)
group.add(mesh3)

group.rotation.x = Math.PI * 0.25
group2.rotation.x = Math.PI * 0.25

scene.add(group2)
scene.add(group)

// Size
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 6
camera.lookAt(0,0,0)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)

// Events

// Animate

const clock = new THREE.Clock()

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // mesh.position.x = (Math.sin(elapsedTime)) * Math.log(elapsedTime);
    // camera.rotation.z += 0.01

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
    gsap.to(mesh2.position, { duration: 2, x: 8} );
}

animate()

// GUI

const cameraGUI = gui.addFolder('Camera');
cameraGUI.add(camera.position, 'x').min(-10).max(10).step(0.01);
cameraGUI.add(camera.position, 'y').min(-5).max(5).step(0.01).name('cameraY');
cameraGUI.add(camera.position, 'z').min(0).max(10).step(0.01).name('cameraZ');

const groupGUI = gui.addFolder('GROUP');
groupGUI.add(group.position, 'x').min(-3).max(3).step(0.01).name('Mesh3 X Position');
groupGUI.add(group.position, 'y').min(-3).max(3).step(0.01).name('Mesh3 Y Position');
groupGUI.add(group.position, 'z').min(-3).max(3).step(0.01).name('Mesh3 Z Position');

const mesh1GUI = gui.addFolder('MESH 1');
mesh1GUI.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('Mesh3 X Position');
mesh1GUI.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('Mesh3 Y Position');
mesh1GUI.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('Mesh3 Z Position');
mesh1GUI.close();

const mesh2GUI = gui.addFolder('MESH 2');
mesh2GUI.add(mesh2.position, 'x').min(-3).max(3).step(0.01).name('Mesh3 X Position');
mesh2GUI.add(mesh2.position, 'y').min(-3).max(3).step(0.01).name('Mesh3 Y Position');
mesh2GUI.add(mesh2.position, 'z').min(-3).max(3).step(0.01).name('Mesh3 Z Position');
mesh2GUI.close();

const mesh3GUI = gui.addFolder('MESH 3');
mesh3GUI.add(mesh3.position, 'x').min(-3).max(3).step(0.01).name('Mesh3 X Position');
mesh3GUI.add(mesh3.position, 'y').min(-3).max(3).step(0.01).name('Mesh3 Y Position');
mesh3GUI.add(mesh3.position, 'z').min(-3).max(3).step(0.01).name('Mesh3 Z Position');
mesh3GUI.close();
