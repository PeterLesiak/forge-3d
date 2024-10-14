# forge-3d

### Example Concept

```ts
import { Engine } from '@forge-3d/core/Engine';
import * as MeshBuilder from '@forge-3d/core/Meshes/MeshBuilder';
import { PointLight } from '@forge-3d/core/Lights/PointLight';
import { Texture } from '@forge-3d/core/Texture';
import { Scene } from '@forge-3d/core/Scene';

const engine = await Engine.default();
document.body.append(engine.domElement);

const scene = new Scene();

const cube = new MeshBuilder.Cube(scene);

const texture = await Texture.load('/path/to/image.png');
cube.material.texture = texture;

const light = new PointLight(scene);
light.position.set(0.5, 0.5, -0.5);

scene.onTick(deltaTime => {
    cube.rotate(0.1 * deltaTime, 0.2 * deltaTime, 0.3 * deltaTime);

    engine.render(scene);
});
```
