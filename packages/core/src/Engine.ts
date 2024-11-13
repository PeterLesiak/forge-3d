import { PowerPreference } from '@/Backends/PowerPreference';
import type { Backend } from '@/Backends/Backend';
import { defaultBackend, type SharedBackendOptions } from '@/Backends/defaultBackend';

export interface EngineOptions extends SharedBackendOptions {}

export class Engine implements EngineOptions {
    public readonly backend: Backend;

    public readonly canvas: HTMLCanvasElement | OffscreenCanvas;

    public readonly powerPreference: PowerPreference = 'default';

    public constructor(backend: Backend, options: Partial<EngineOptions> = {}) {
        this.backend = backend;
        this.canvas = this.backend.canvas;

        if (options.powerPreference) {
            this.powerPreference = options.powerPreference;
        }
    }

    public static async default(
        options: Partial<{ canvas: HTMLCanvasElement | OffscreenCanvas } & EngineOptions> = {},
    ): Promise<Engine | null> {
        const canvas = options.canvas ?? document.createElement('canvas');

        const backend = await defaultBackend(canvas, options);

        if (!backend) {
            return null;
        }

        return new Engine(backend, options);
    }
}
