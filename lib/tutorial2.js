/*
    Scene: lingkungan 3D yang akan menjadi aplikasi kita / 3D World
    Camera: kamera yang kita gunakan untuk melihat ke dalam 3D World tersebut
    Renderer: yang menampilkan hasil dari kamera ke layar
*/

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
/*
    1. POV. how wide the camera is | semakin besar POV maka semakin wide angle dan sebaliknya
    2. Aspect Ratio. width / height
    3. Near Clip. how close the camera can see
    4. Far Clip. how far the camera can see
*/
var renderer = new THREE.WebGLRenderer();

// var geo = new THREE.TorusGeometry(10, 3, 16, 100); // Ukuran bentuk
// var geoMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Warna (RGB) ( ff 00 00)
// var result = new THREE.Mesh(geo, geoMaterial); // Mesh adalah gabungan dari geometry dan material
// scene.add(result);

const customGeo = new THREE.BufferGeometry();
// let vertices = new Float32Array([
//     -1.0, -1.0, 0.0, // x, y, z // 0
//     1.0, 1.0, 0.0, // 1
//     -1.0, 1.0, 0.0, // 2
//     1.0, 1.0, 0.0, // 3
//     -1.0, -1.0, 0.0, // 4
//     1.0, -1.0, 0.0, // 5
// ]);
// let vertices = new Float32Array([
//     -1.0, -1.0, 0.0, // x, y, z // 0
//     1.0, 1.0, 0.0, // 1
//     -1.0, 1.0, 0.0, // 2
//     1.0, -1.0, 0.0, // 3
// ]);
let vertices = new Float32Array([
    -1.0, -1.0, 1.0, // x, y, z // 0
    1.0, 1.0, 1.0, // 1
    -1.0, 1.0, 1.0, // 2
    1.0, -1.0, 1.0, // 3

    -1.0, -1.0, -1.0, // x, y, z // 4
    1.0, 1.0, -1.0, // 5
    -1.0, 1.0, -1.0, // 6
    1.0, -1.0, -1.0, // 7
]);

let colors = new Float32Array([
    1.0, 0.0, 0.0, // 0
    1.0, 0.0, 0.0,
    1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
    0.0, 1.0, 0.0, // 4
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
]);

customGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
customGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
customGeo.setIndex([
    // sisi depan
    0, 3, 1,
    1, 2, 0,
    // sisi belakang
    4, 6, 5,
    5, 7, 4,
    // sisi kiri
    4, 0, 2,
    2, 6, 4,
    // sisi kanan
    5, 1, 3,
    3, 7, 5,
    // sisi atas
    1, 5, 6,
    6, 2, 1,
    // sisi bawah
    0, 4, 7,
    7, 3, 0,
]);
// const customMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const customMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });
const result = new THREE.Mesh(customGeo, customMaterial);
scene.add(result);

camera.position.z = 10;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
});

function draw() {
    requestAnimationFrame(draw);
    // result.rotation.x += 0.01;
    // result.rotation.y += 0.01;
    // result.rotation.z += 0.01;
    renderer.render(scene, camera);
}

draw();

// renderer.render(scene, camera);