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

var geo = new THREE.BoxGeometry(1, 1, 1); // Ukuran bentuk
var geoMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Warna (RGB) ( ff 00 00)
var result = new THREE.Mesh(geo, geoMaterial); // Mesh adalah gabungan dari geometry dan material
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
    result.rotation.x += 0.01;
    result.rotation.y += 0.01;
    result.rotation.z += 0.01;
    renderer.render(scene, camera);
}

draw();

// renderer.render(scene, camera);