/*
    Scene: lingkungan 3D yang akan menjadi aplikasi kita / 3D World
    Camera: kamera yang kita gunakan untuk melihat ke dalam 3D World tersebut
    Renderer: yang menampilkan hasil dari kamera ke layar
*/

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
var renderer = new THREE.WebGLRenderer({ antialias: true });
scene.background = new THREE.Color(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
camera.position.z = 10;
document.body.appendChild(renderer.domElement);

const texture = new THREE.TextureLoader().load('./texture/texture.png');
var geo = new THREE.BoxGeometry(1, 1, 1); // Ukuran bentuk
var geoMaterial = new THREE.MeshPhongMaterial({ map: texture, bumpMap: texture, shininess: 100 }); // Warna bentuk

var result = new THREE.Mesh(geo, geoMaterial);
result.receiveShadow = true;
result.castShadow = true;
scene.add(result);

var plane = new THREE.PlaneGeometry(1000, 1000, 500, 500)
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xaaffaa });
var planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.position.set(0, -1, 0);
planeMesh.rotation.x = -Math.PI / 2;
scene.add(planeMesh);

var ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

var pointLight = new THREE.PointLight(0xff0000, 0.5, 50);
pointLight.position.set(0, 4, 0);
scene.add(pointLight);
scene.add(new THREE.PointLightHelper(pointLight, 0.2, 0xff0000));

// var hemi = new THREE.HemisphereLight(0x0000ff, 0x000000, 0.5);
// scene.add(hemi);

// var directional = new THREE.DirectionalLight(0x0000ff, 0.5);
// directional.position.set(2, 2, 0);
// directional.target.position.set(4, 1, 10);
// directional.target.updateMatrixWorld();
// scene.add(directional);
// scene.add(new THREE.DirectionalLightHelper(directional));

var spotLight = new THREE.SpotLight(0xffaaaa, 1, 100, Math.PI / 10);
spotLight.position.set(0, 4, 0);
// spotLight.target.position.set(0, -1, -1);
// spotLight.target.updateMatrixWorld();
spotLight.castShadow = true;
scene.add(spotLight);
// scene.add(new THREE.SpotLightHelper(spotLight));

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