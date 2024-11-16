# forge-3d

> **Example concept**

```ts
import { Engine } from '@forge-3d/core/Engine';
import { Camera } from '@forge-3d/core/cameras/Camera';
import { Scene } from '@forge-3d/core/Scene';
import { Cube } from '@forge-3d/core/meshes/MeshBuilder';
import { Texture } from '@forge-3d/core/Texture';
import { PointLight } from '@forge-3d/core/lights/PointLight';

const engine = await Engine.default();
document.body.append(engine.canvas);

const camera = new Camera();

const scene = new Scene();

const cube = new MeshBuilder.Cube(scene);

const texture = await Texture.load('/path/to/image');
cube.material.texture = texture;

const light = new PointLight(scene);
light.position.set(0.5, 0.5, -0.5);

scene.onTick(deltaTime => {
    cube.rotate(0.1 * deltaTime, 0.2 * deltaTime, 0.3 * deltaTime);

    engine.render(scene, camera);
});
```

> **JSX** (Experimental)

```tsx
import { Engine } from '@forge-3d/core/Engine';
import { Camera } from '@forge-3d/core/cameras/Camera';
import { Scene } from '@forge-3d/core/Scene';
import { Cube } from '@forge-3d/core/meshes/MeshBuilder';
import { Texture } from '@forge-3d/core/Texture';
import { PointLight } from '@forge-3d/core/lights/PointLight';

const engine = await Engine.default();
document.body.append(engine.canvas);

const camera = new Camera();

const cube = <Cube />;

const scene = (
    <Scene>
        {cube}

        <PointLight position={[0.5, 0.5, -0.5]} />
    </Scene>
);

const texture = await Texture.load('/path/to/image');
cube.material.texture = texture;

scene.onTick(deltaTime => {
    cube.rotate(0.1 * deltaTime, 0.2 * deltaTime, 0.3 * deltaTime);

    engine.render(scene, camera);
});
```
