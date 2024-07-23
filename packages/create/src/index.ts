import { Engine } from '@forge-3d/core/Engine';
import { Scene } from '@forge-3d/core/Scene';
import { Camera } from '@forge-3d/core/Cameras/Camera';
import * as MeshBuilder from '@forge-3d/core/Meshes/MeshBuilder';

const engine = new Engine();
document.body.appendChild(engine.domElement);

const scene = new Scene();

const camera = new Camera(scene);
camera.position.z = -10.0;

const cube = new MeshBuilder.Cube(scene);

scene.onTick(({ deltaTime }) => {
    cube.rotate(0.1 * deltaTime, 0.2 * deltaTime, 0.3 * deltaTime);

    engine.render(scene);
});
