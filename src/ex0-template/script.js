import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

// Shader
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

// Size
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 1
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Animate
const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()