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
const aTexture = new THREE.TextureLoader().load('./texture/3.png');
const bTexture = new THREE.TextureLoader().load('./texture/4.png');
const cTexture = new THREE.TextureLoader().load('./texture/3.png');
const dTexture = new THREE.TextureLoader().load('./texture/4.png');
const eTexture = new THREE.TextureLoader().load('./texture/3.png');
const fTexture = new THREE.TextureLoader().load('./texture/4.png');

const materialArray = [
    new THREE.MeshBasicMaterial({ map: aTexture }),
    new THREE.MeshBasicMaterial({ map: bTexture }),
    new THREE.MeshBasicMaterial({ map: cTexture }),
    new THREE.MeshBasicMaterial({ map: dTexture }),
    new THREE.MeshBasicMaterial({ map: eTexture }),
    new THREE.MeshBasicMaterial({ map: fTexture }),
]

const geoMaterial = new THREE.MeshBasicMaterial({ map: texture });
const result = new THREE.Mesh(geo, materialArray); // Mesh adalah gabungan dari geometry dan material
scene.add(result);

camera.position.z = 5;

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

    renderer.render(scene, camera);
}

draw();

// renderer.render(scene, camera);