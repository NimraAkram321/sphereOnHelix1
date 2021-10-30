import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(0, 5, 25);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var controls = new OrbitControls(camera, renderer.domElement);

var plane = new THREE.GridHelper(100, 10);
scene.add(plane);
let coordinates = [];
const R = 0.9;
const C = 0.3;

const getCoordinates = () => {


    for (var i = 0; i < 50; i += 0.5) {// taking coordinates for helix
        const x = R * Math.cos(i);
        const y = R * Math.sin(i);
        const z = C * i;

        coordinates.push(new THREE.Vector3(x, z, y))

    }
    return coordinates;

}
//passing the coodinates and creting points
var geom = new THREE.BufferGeometry().setFromPoints(getCoordinates());
var matPoints = new THREE.PointsMaterial({ size: 0.2, color: "green" });
var points = new THREE.Points(geom, matPoints);
scene.add(points);

// creating sphere  
const geometry = new THREE.SphereGeometry(0.5, 12, 6);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
var isReverse = false;
var index = 0;
setInterval(() => {
    var x = R * Math.cos(index);
    var y = R * Math.sin(index);
    var z = C * (index);

    if (isReverse == false) {
        if (index > 50) {
            isReverse = true;
        } else {
            index += 0.5;
        }

    } else {

        if (index <= 0) {
            isReverse = false;
            index = 0;
        } else {
            index -= 0.5;
        }
    }
    sphere.position.set(x, z, y);
}, 70);

const animate = function () {
    requestAnimationFrame(animate);


    renderer.render(scene, camera);

}
animate();