import * as THREE from 'three';
import gsap from 'gsap'
import { GUI } from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const clock = new THREE.Clock()
console.log(THREE);

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
const material = new THREE.MeshBasicMaterial({ color: "red" })
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


// Mesh4
const geometry4 = new THREE.SphereGeometry(3);
const material4 = new THREE.MeshBasicMaterial({ color: "green" });
const sphere = new THREE.Mesh(geometry4, material4); scene.add(sphere);
sphere.position.y = -10;
sphere.position.x = -20;



group.add(mesh)
group.add(mesh2)
group.add(mesh3)
group.add(mesh3)
group.add(sphere)

group2.add(mesh)

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
camera.position.z = 3
camera.lookAt(0, 0, 0)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)

// Cursor
const cursor = {
    x: 0,
    y: 0
}
 
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Events

// Animate
// const clock = new THREE.Clock()

// const animate = () => {
//     const elapsedTime = clock.getElapsedTime()

//     mesh.rotation.y = elapsedTime

//     // mesh2.rotation.x = elapsedTime
//     // mesh3.rotation.z = elapsedTime

//     group.rotation.y = elapsedTime

//     renderer.render(scene, camera)
//     requestAnimationFrame(animate)
// }

// animate()

const controls = new OrbitControls(camera, canvas)
const animate = () => {
    const elapsedTime = clock.getElapsedTime()
    controls.update()

    // camera.position.x = Math.sin(elapsedTime)
    // camera.position.z = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)


    mesh2.rotation.x = elapsedTime
    mesh3.rotation.z = elapsedTime

    group.rotation.y = elapsedTime
    gsap.to(mesh3.position, { duration: 2, x: 2, repeat: -1, yoyo: true });


    camera.position.x = cursor.x * 5
    camera.position.y = cursor.y * 5
    camera.lookAt(mesh.position)


    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()

// GUI

// GUI
const gui = new GUI();

// GUI controls
const cameraGUI = gui.addFolder('Camera');
cameraGUI.add(camera.position, 'x').min(-5).max(5).step(0.01).name('cameraX');
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

// GUI Properties (A mdoifier en fonction du besoin)
const propertyGUI = gui.addFolder('Properties')
// propertyGUI.close();
// propertyGUI.open();
// propertyGUI.add(property, "speed").min(-5).max(5).step(0.01).name('Speed');



