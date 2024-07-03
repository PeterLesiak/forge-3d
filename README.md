<h1 align="center">forge-3d</h1>

<div align="center">
    <strong>Typescript library for 3d & 2d scenes using WebGL/WebGPU</strong>
</div>

<br />

<div align="center">

![JavaScript](https://img.shields.io/badge/javascript-D69D00?style=for-the-badge&logo=javascript&logoColor=FFF)
![TypeScript](https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=FFF)
![Browser](https://img.shields.io/badge/browser-7D4698?style=for-the-badge&logo=googlechrome&logoColor=FFF)
![WebGL](https://img.shields.io/badge/webgl-990000?style=for-the-badge&logo=webgl&logoColor=FFF)
![WebGPU](https://img.shields.io/badge/webgpu-005A9C?style=for-the-badge&logo=wgpu&logoColor=FFF)

</div>

<p align="center">
    <a href="#getting-started"><strong>Getting Started</strong></a> ·
    <a href="#documentation"><strong>Documentation</strong></a> ·
    <a href="#development"><strong>Development</strong></a> ·
    <a href="#contributing"><strong>Contributing</strong></a>
</p>

<h2 id="getting-started">Getting Started</h2>

#### Instalation

> ```bash
> npm install --save @forge-3d/core
> ```

#### Example

```javascript
import { Engine } from '@forge-3d/core/Engine';
import { MeshBuilder } from '@forge-3d/core/Meshes';

// Engine is responsible for rendering to the canvas
const engine = new Engine();
document.body.appendChild(engine.domElement);

// Mesh is a collection of Geometry & Material (these are already created by MeshBuilder)
const cube = new MeshBuilder.Cube();
cube.position.z = 10.0;

engine.render(cube);
```

<h2 id="documentation">Documentation</h2>

<h2 id="development">Development</h2>

```bash
# clone the repository (git required)
git clone https://github.com/PeterLesiak/forge-3d.git

# install dependencies (pnpm required)
pnpm install
```

<h2 id="contributing">Contributing</h2>
