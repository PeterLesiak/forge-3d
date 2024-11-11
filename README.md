# forge-3d

> **Typescript**

```ts
import { Engine } from '@forge-3d/core/Engine';
import { Scene } from '@forge-3d/core/Scene';
import { Camera } from '@forge-3d/core/Cameras/Camera';
import { Cube } from '@forge-3d/core/Mesh/MeshBuilder';
import { Texture } from '@forge-3d/core/Texture';
import { PointLight } from '@forge-3d/core/Lights/PointLight';

const engine = await Engine.default();
document.body.appendChild(engine.canvas);

const scene = new Scene();

const camera = new Camera(scene);

const cube = new MeshBuilder.Cube(scene);

const texture = await Texture.load('/path/to/image');
cube.material.texture = texture;

const light = new PointLight(scene);
light.position.set(0.5, 0.5, -0.5);

scene.onTick(deltaTime => {
    cube.rotate(0.1 * deltaTime, 0.2 * deltaTime, 0.3 * deltaTime);

    engine.render(scene);
});
```

> **TSX** (Experimental)

```tsx
import { Engine } from '@forge-3d/core/Engine';
import { Scene } from '@forge-3d/core/Scene';
import { Camera } from '@forge-3d/core/Cameras/Camera';
import { Cube } from '@forge-3d/core/Mesh/MeshBuilder';
import { Texture } from '@forge-3d/core/Texture';
import { PointLight } from '@forge-3d/core/Lights/PointLight';

const engine = await Engine.default();
document.body.appendChild(engine.canvas);

const cube = createRef<Cube>();

const scene = (
    <Scene>
        <Camera />

        <Cube ref={cube} />

        <PointLight position={[0.5, 0.5, -0.5]} />
    </Scene>
);

const texture = await Texture.load('/path/to/image');
cube.material.texture = texture;

scene.onTick(deltaTime => {
    cube.rotate(0.1 * deltaTime, 0.2 * deltaTime, 0.3 * deltaTime);

    engine.render(scene);
});
```
