import type { Backend } from '@/Backends/Backend';

import { defaultBackend } from '@/Backends/defaultBackend';

export class Engine {
    public readonly backend: Backend;

    public readonly canvas: HTMLCanvasElement | OffscreenCanvas;

    public constructor(backend: Backend) {
        this.backend = backend;
        this.canvas = this.backend.canvas;
    }

    public static async default(
        canvas?: HTMLCanvasElement | OffscreenCanvas,
    ): Promise<Engine | null> {
        canvas ??= document.createElement('canvas');

        const backend = await defaultBackend(canvas);

        if (!backend) {
            return null;
        }

        return new Engine(backend);
    }
}
