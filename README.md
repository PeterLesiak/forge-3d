```javascript
import * as FORGE from '@forge-3d/core';

const engine = new FORGE.Engine();
document.body.appendChild(engine.domElement);

const cube = new FORGE.MeshBuilder.Cube();
cube.position.z = 10.0;

engine.render(cube);
```

```javascript
import * as FORGE from '@forge-3d/core';

const engine = new FORGE.Engine();

const scene = new FORGE.Scene();

const camera = new FORGE.Camera(scene);
camera.position.z = -10.0;

const cube = new FORGE.MeshBuilder.Cube(scene);

scene.onTick(deltaTime => {
    cube.rotate(0.1 * deltaTime, 0.2 * deltaTime, 0.3 * deltaTime);

    engine.render(scene);
});
```

```javascript
import * as FORGE from '@forge-3d/core';

const engine = new FORGE.Engine();

const scene = new FORGE.Scene();

const camera = new FORGE.Camera(scene);
camera.position.z = -10.0;

// TODO: shader syntax
const shader = FORGE.Shader.load('/shaders/example_shader.fx');

const texture = FORGE.Texture2D.load('/textures/example_texture.png');

const material = new FORGE.ShaderMaterial(shader);
material.setTexture2D('example_texture', texture);

const cube = new FORGE.MeshBuilder.Cube({ material, parent: scene });

scene.onTick((deltaTime, elapsedTime) => {
    cube.rotate(0.1 * deltaTime, 0.2 * deltaTime, 0.3 * deltaTime);

    material.setFloat('elapsedTime', elapsedTime);
    material.setFloat2('resolution', engine.resoution);

    engine.render(scene);
});
```

```javascript
import * as FORGE from '@forge-3d/core';

const engine = new FORGE.Engine();

const scene = new FORGE.Scene();

const camera = new FORGE.Camera(scene);
camera.position.z = -10.0;

const positionBuffer = new FORGE.Float3Buffer([...]);
const normalBuffer = new FORGE.Float3Buffer([...]);
const uvBuffer = new FORGE.Float3Buffer([...]);

const geometry = new FORGE.Geometry();
geometry.setPosition(positionBuffer);
geometry.setNormal(normalBuffer);
geometry.setUV(uvBuffer);

const material = new FORGE.StandardMaterial();

const cube = new FORGE.Mesh(geometry, material, scene);

scene.onTick(deltaTime => {
    cube.rotate(0.1 * deltaTime, 0.2 * deltaTime, 0.3 * deltaTime);

    engine.render(scene);
});
```
