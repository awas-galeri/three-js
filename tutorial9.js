/*
    Scene: lingkungan 3D yang akan menjadi aplikasi kita / 3D World
    Camera: kamera yang kita gunakan untuk melihat ke dalam 3D World tersebut
    Renderer: yang menampilkan hasil dari kamera ke layar
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
camera.position.z = 25;
camera.position.y = 10;
camera.position.x = -10;
document.body.appendChild(renderer.domElement);

var grid = new THREE.GridHelper(100, 20, 0x0a0a0a, 0x0a0a0a);
grid.position.y -= 1.5;
scene.add(grid);

const texture = new THREE.TextureLoader().load('texture/texture.png');
var geo = new THREE.BoxGeometry(3, 3, 3); // Ukuran bentuk
var geoMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000, map: texture, bumpMap: texture }); // Warna bentuk

var result = new THREE.Mesh(geo, geoMaterial);
result.receiveShadow = true;
result.castShadow = true;
scene.add(result);

var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(1, 15, 15);
scene.add(pointLight);
scene.add(new THREE.PointLightHelper(pointLight, 0.2, 0xff0000));

window.addEventListener('resize', function () {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
});

let controls = new OrbitControls(camera, renderer.domElement);

// let test1 = gsap.to(result.position, { x: 5, duration: 5, paused: true });
// let test2 = gsap.to(result.rotation, { y: 5, duration: 5, paused: true });

// test1.play();
// test2.play();

// let test1 = gsap.from(result.position, { x: 5, duration: 5, paused: true });
// let test2 = gsap.from(result.rotation, { y: 5, duration: 5, paused: true });

// test1.play();
// test2.play();

let t1 = gsap.timeline();
t1.to(result.position, { x: 5, duration: 2 })
t1.to(result.position, { y: 5, duration: 2 })
t1.to(result.position, { z: 5, duration: 2 })
t1.to(result.scale, { x: 2, y: 2, z: 2, duration: 2 })

let ganjil = false;

let t2 = gsap.timeline();
t2.to(result.scale, { x: 1, y: 1, z: 1, duration: 2 })
t2.to(result.position, { x: -5, duration: 2 })
t2.to(result.position, { z: -5, duration: 2 })
t2.to(result.position, { y: 0, duration: 2 })

let t = gsap.timeline({ paused: true });
t.add(t1);
t.add(t2);

addEventListener('mousedown', function () {
    if (ganjil == false) {
        t.play();
    }
    else {
        t.reverse();
    }
    ganjil = !ganjil;
})

function draw() {
    controls.update();
    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}

draw();

// renderer.render(scene, camera);