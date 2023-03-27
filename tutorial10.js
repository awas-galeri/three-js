/*
    BELAJAR CREATE PARTIKEL FLARE
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
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
camera.position.z = 100;
camera.position.y = 50;
camera.position.x = -75;
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

var directionalLight = new THREE.DirectionalLight({ color: 0xFFFFFF, intensity: 100 })
directionalLight.position.set(0, 1, 0)
directionalLight.castShadow = true
scene.add(directionalLight)

var ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

var grid = new THREE.GridHelper(100, 20, 0xfafafa, 0xfafafa);
grid.position.set(0, -0.5, 0);
scene.add(grid);

var geo = new THREE.BoxGeometry(1, 1, 1);
var geoMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

var result = new THREE.Mesh(geo, geoMaterial);
result.receiveShadow = true;
result.castShadow = true;
result.position.y += 0;
scene.add(result);

// let pGeo = new THREE.SphereGeometry(3, 30, 30)

// Setting Partikel
let kumpulanTitik = []
let jumlahTitik = 100

let pGeo = new THREE.BufferGeometry()

for (let i = 0; i < jumlahTitik; i++) {
    for (let j = 0; j < jumlahTitik; j++) {
        const titik = {
            posisi: new THREE.Vector3(i - jumlahTitik / 2, 0, j - jumlahTitik / 2),
            kecepatan: new THREE.Vector3(0, Math.random() * 0.1, 0)
            // posisi: new THREE.Vector3(Math.random(), 0, Math.random()),
            // kecepatan: new THREE.Vector3(0, Math.random() * 0.1, 0)
        }
        kumpulanTitik.push(titik)
    }
}

pGeo.setAttribute('position', new THREE.Float32BufferAttribute(kumpulanTitik.length * 3, 3).set(kumpulanTitik.map(titik => Object.values(titik.posisi)).flat()));

let fText = new THREE.TextureLoader().load('texture/flare.png')

let pMat = new THREE.PointsMaterial({
    size: 2,
    // color: 0xff0000
    map: fText,
    transparent: true,
    depthTest: false,
    // alphaTest: 0.3
})
let partikel = new THREE.Points(pGeo, pMat)
scene.add(partikel)

window.addEventListener('resize', function () {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
});

// function draw() {
//     partikel.position.y += 0.01;
//     renderer.render(scene, camera);
//     requestAnimationFrame(draw);
// }

function draw() {
    kumpulanTitik.forEach((titik) => {
        // if (titik.posisi.y > 50) {
        //     titik.posisi.y = 0
        // }
        titik.posisi.add(titik.kecepatan);

        // Jika partikel berada di luar batas tertentu, balik arah kecepatannya
        // if (titik.posisi.y < -5 || titik.posisi.y > 5) {
        //     titik.kecepatan.y = -titik.kecepatan.y;
        // }
        // if (titik.posisi.x < -5 || titik.posisi.x > 5) {
        //     titik.kecepatan.x = -titik.kecepatan.x;
        // }
        // if (titik.posisi.z < -5 || titik.posisi.z > 5) {
        //     titik.kecepatan.z = -titik.kecepatan.z;
        // }
    });

    // Update posisi partikel pada buffer geometry
    pGeo.setAttribute('position', new THREE.Float32BufferAttribute(kumpulanTitik.length * 3, 3).set(kumpulanTitik.map(titik => Object.values(titik.posisi)).flat()));

    // Memperbarui atribut posisi pada partikel dan me-render ulang scene
    partikel.geometry.attributes.position.needsUpdate = true;
    partikel.rotation.y += 0.001
    renderer.render(scene, camera);

    // Membuat fungsi draw terus berjalan secara rekursif
    requestAnimationFrame(draw);
}

draw();