import * as THREE from './node_modules/three/build/three.min.js';
import { GLTFLoader } from './node_modules/three/examples/js/loaders/GLTFLoader.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

const width = 500;
const height = 500;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
document.getElementsByClassName("map")[0].appendChild( renderer.domElement );
var loader = new GLTFLoader();
var mixer;
var model;
loader.load(
    "campus.glb", function(gltf) {

        gltf.scene.traverse( function( node ) {
            if ( node instanceof THREE.Mesh ) {
                node.castShadow = true;
                node.material.side = THREE.DoubleSide;
            }
        });



        model = gltf.scene;
        model.scale.set(.35,.35,.35);
        scene.add(model);
    });




function render() {

    renderer.render( scene, camera );

}
const controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render ); // use if there is no animation loop
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set( 0, 0, - 0.2 );
controls.update();
