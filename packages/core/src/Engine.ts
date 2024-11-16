import { Color } from '@/math/Color';
import { PowerPreference } from '@/backends/PowerPreference';
import type { Backend } from '@/backends/Backend';
import { defaultBackend, type SharedBackendOptions } from '@/backends/defaultBackend';

export interface EngineOptions extends SharedBackendOptions {}

export class Engine<
    Canvas extends HTMLCanvasElement | OffscreenCanvas = HTMLCanvasElement | OffscreenCanvas,
> implements EngineOptions
{
    public readonly backend: Backend;

    public readonly canvas: Canvas;

    public readonly powerPreference: PowerPreference = 'default';

    public constructor(backend: Backend, options: Partial<EngineOptions> = {}) {
        this.backend = backend;
        this.canvas = this.backend.canvas as Canvas;

        if (options.powerPreference) {
            this.powerPreference = options.powerPreference;
        }
    }

    public static async default<
        Canvas extends HTMLCanvasElement | OffscreenCanvas = HTMLCanvasElement,
    >(
        options: Partial<{ canvas: Canvas } & EngineOptions> = {},
    ): Promise<Engine<Canvas> | null> {
        const canvas = options.canvas ?? document.createElement('canvas');

        const backend = await defaultBackend(canvas, options);

        if (!backend) {
            return null;
        }

        return new Engine<Canvas>(backend, options);
    }

    public readonly clearColor = new Color(0.0, 0.0, 0.0);

    public clear(): this {
        this.backend.clear(
            this.clearColor.r,
            this.clearColor.g,
            this.clearColor.b,
            this.clearColor.a,
        );

        return this;
    }
}
