/*
    BELAJAR CREATE TEXT 3D
*/
import * as THREE from 'three';
import * as GSAP from 'gsap';
import * as DAT from 'dat.gui';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from './node_modules/three/examples/jsm/controls/FirstPersonControls.js';
import { TrackballControls } from './node_modules/three/examples/jsm/controls/TrackballControls.js';
import { FontLoader } from './node_modules/three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from './node_modules/three/examples/jsm/geometries/TextGeometry.js'
import { TTFLoader } from './node_modules/three/examples/jsm/loaders/TTFLoader.js'
import { Font } from './node_modules/three/examples/jsm/libs/opentype.module.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
camera.position.z = 100;
camera.position.y = 50;
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

var grid = new THREE.GridHelper(100, 20, 0xfafafa, 0xfafafa);
grid.position.y = -0.5
scene.add(grid);

let controls = new OrbitControls(camera, renderer.domElement);

let selectedFont
let text = "Testing"
let tMesh

var loader = new FontLoader();
loader.load(
    'fonts/helvetiker_bold.typeface.json',
    (e) => {
        selectedFont = e;
        createText()
    })

// var loader = new TTFLoader();
// loader.load(
//     'fonts/kenpixel.ttf',
//     (e) => {
//         let tFont = new Font(e)
//         selectedFont = tFont

//         createText()
//     })

function createText() {
    let tGeo = new TextGeometry(text, {
        size: 5,
        height: 1,
        font: selectedFont,
    })
    let tMat = new THREE.MeshPhongMaterial({
        color: 0xff00ff
    })
    tMesh = new THREE.Mesh(tGeo, tMat)
    tMesh.position.set(-7, 0, 0)
    scene.add(tMesh)
}

addEventListener('keydown', (e) => {
    if (e.keyCode == 8) {
        text = ""
    }
    else {
        text += e.key
    }
    if (tMesh) {
        scene.remove(tMesh)
        createText()
    }
})

function draw() {
    // if (tMesh) {
    //     tMesh.rotation.x -= 0.1
    // }

    // Membuat fungsi draw terus berjalan secara rekursif
    requestAnimationFrame(draw);

    renderer.render(scene, camera);
}

draw();