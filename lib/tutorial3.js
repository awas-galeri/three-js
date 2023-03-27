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

const geo = new THREE.BoxGeometry(1, 1, 1); // Ukuran bentuk
const texture = new THREE.TextureLoader().load('./texture/texture.png');

const geoMaterial = new THREE.MeshLambertMaterial({ map: texture });
const result = new THREE.Mesh(geo, geoMaterial); // Mesh adalah gabungan dari geometry dan material
scene.add(result);

let light1 = new THREE.PointLight(0xffffff, 0.8);
light1.position.set(0, 3, 2);
scene.add(light1);

let light2 = new THREE.PointLight(0xffffff, 0.8);
light2.position.set(0, -3, 2);
scene.add(light2);

const geoMaterial2 = new THREE.MeshLambertMaterial({
    map: texture,
});

const result2 = new THREE.Mesh(geo, geoMaterial2); // Mesh adalah gabungan dari geometry dan material
result2.position.set(2, 0, 0);
scene.add(result2);

const geoMaterial3 = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 100,
    bumpMap: texture,
});
const result3 = new THREE.Mesh(geo, geoMaterial3); // Mesh adalah gabungan dari geometry dan material
result3.position.set(-2, 0, 0);
scene.add(result3);

camera.position.z = 4;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
});

function draw() {
    requestAnimationFrame(draw);
    result.rotation.z += 0.01;
    result.rotation.x -= 0.01;

    result2.rotation.y += 0.01;
    result2.rotation.x += 0.01;

    result3.rotation.y -= 0.01;
    result3.rotation.x += 0.01;

    renderer.render(scene, camera);
}

draw();

// renderer.render(scene, camera);