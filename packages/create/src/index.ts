import { Engine } from '@forge-3d/core/Engine';

const engine = await Engine.default();

if (!engine) {
    throw 'up';
}

document.body.appendChild(engine.canvas as HTMLCanvasElement);
