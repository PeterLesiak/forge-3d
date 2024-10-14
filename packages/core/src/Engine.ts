import type { Nullable } from '@/Types/Utilities';

import type { Backend } from '@/Backends/Backend';
import { defaultBackend } from '@/Backends/DefaultBackend';

export interface EngineProperties {
    readonly domElement: HTMLCanvasElement | OffscreenCanvas;
}

export class Engine implements EngineProperties {
    public readonly backend: Backend;

    public readonly domElement: HTMLCanvasElement | OffscreenCanvas;

    private constructor(backend: Backend) {
        this.backend = backend;
        this.domElement = this.backend.canvas;
    }

    public static async Default(
        configuration: Partial<EngineProperties> = {},
    ): Promise<Nullable<Engine>> {
        const domElement = configuration.domElement ?? document.createElement('canvas');
        const backend = await defaultBackend(domElement);

        if (!backend) {
            return null;
        }

        return new Engine(backend);
    }
}
