/*
    BELAJAR GROUP AND MERGE
*/
import * as THREE from 'three';
import * as GSAP from 'gsap';
import * as DAT from 'dat.gui';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from './node_modules/three/examples/jsm/controls/FirstPersonControls.js';
import { TrackballControls } from './node_modules/three/examples/jsm/controls/TrackballControls.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
camera.position.z = 50;
camera.position.y = 10;
// camera.position.x = -75;
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
});

var hemi = new THREE.HemisphereLight(0xffffff, 0xff00ff, 0.52)
scene.add(hemi)

var light1 = new THREE.PointLight({ color: "white" })
light1.position.y = 5
scene.add(light1)

var light2 = new THREE.PointLight({ color: "yellow" })
light2.position.y = -5
light2.position.x = 15
scene.add(light2)

var grid = new THREE.GridHelper(100, 20, 0x000000, 0x000000);
grid.position.y = -0.5
scene.add(grid);

let controls = new OrbitControls(camera, renderer.domElement);

let cube = new THREE.BoxGeometry(3, 3, 3)
let math = new THREE.MeshStandardMaterial({ color: 0xff00ff })

let cube1 = new THREE.Mesh(cube, math)
let cube2 = new THREE.Mesh(cube, math)
let cube3 = new THREE.Mesh(cube, math)
let cube4 = new THREE.Mesh(cube, math)

cube1.position.set(0, 1, 0)
cube2.position.set(6, 1, 0)
cube3.position.set(-6, 1, 0)
cube4.position.set(0, 6, 0)

scene.add(cube1)
scene.add(cube2)
scene.add(cube3)
scene.add(cube4)

let group = new THREE.Group()
group.add(cube1)
group.add(cube2)
group.add(cube3)
group.add(cube4)
scene.add(group)

function draw() {

    cube1.rotation.y += 0.09
    cube2.rotation.y += 0.09
    cube3.rotation.y += 0.09
    cube4.rotation.y -= 0.01
    group.rotation.y -= 0.02

    requestAnimationFrame(draw);

    renderer.render(scene, camera);
}

draw();