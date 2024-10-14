import { Engine } from '@forge-3d/core/Engine';

const engine = await Engine.default();

if (!engine) {
    throw 'no engine. go handle it';
}

document.body.append(engine.domElement as HTMLCanvasElement);
