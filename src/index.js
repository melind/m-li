/* global THREE */ 
//en haut de vos fichiers JavaScript pour notifier à eslint que THREE existe

import './style.css';

import Granim from 'granim';
import Choreographer from 'choreographer-js';
import * as THREE from 'three';

var granimInstance = new Granim({
    element: '#canvas-complex',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                [
                    { color: '#5b0025', pos: .2 },
                    { color: '#ff4e51', pos: .8 },
                    { color: '#df4f15', pos: 1 }
                ], [
                    { color: '#da0c67', pos: 0 },
                    { color: '#ff1710', pos: .2 },
                    { color: '#fff160', pos: .75 }
                ],
            ]
        }
    }
});

let choreographer = new Choreographer({
  animations: [
    {
      range: [-1, 800],
      selector: '#box',
      type: 'scale',
      style: 'opacity',
      from: 0,
      to: 1
    },
     
  ]
});

window.addEventListener('scroll', () => {
  choreographer.runAnimationsAt(window.pageYOffset);
});

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;  // valeur par défaut du canevas
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;
  const scene = new THREE.Scene();

  {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

     function makeInstance(geometry, color, x) {
     const material = new THREE.MeshPhongMaterial({color});

     const cube = new THREE.Mesh(geometry, material);
     scene.add(cube);

     cube.position.x = x;

     return cube;
     }
  /*const material = new THREE.MeshBasicMaterial({color: 0x44aa88});without light
  const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // cyan
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  renderer.render(scene, camera);*/

 const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
  ];

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
  function render(time) {
    time *= 0.001;  // convert time to seconds
      if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      const pixelRatio = window.devicePixelRatio;
      const width  = canvas.clientWidth  * pixelRatio | 0;
      const height = canvas.clientHeight * pixelRatio | 0;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
  }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}
main();
