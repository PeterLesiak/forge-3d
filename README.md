<h1 align="center">forge-3d</h1>

<div align="center">
  <strong>Typescript library for 3d & 2d scenes powered by WebGL/WebGPU</strong>
</div>

<br />

<div align="center">

![JavaScript](https://img.shields.io/badge/javascript-D69D00?style=for-the-badge&logo=javascript&logoColor=FFF)
![TypeScript](https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=FFF)
![Browser](https://img.shields.io/badge/browser-7D4698?style=for-the-badge&logo=googlechrome&logoColor=FFF)
![WebGL](https://img.shields.io/badge/webgl-990000?style=for-the-badge&logo=webgl&logoColor=FFF)
![WebGPU](https://img.shields.io/badge/webgpu-005A9C?style=for-the-badge&logo=wgpu&logoColor=FFF)

</div>

<br />

<p align="center">
  <a href="#getting-started"><strong>Getting Started</strong></a>
</p>

<h2 id="getting-started">Getting Started</h2>

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
document.body.appendChild(engine.domElement);

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
document.body.appendChild(engine.domElement);

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
document.body.appendChild(engine.domElement);

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
