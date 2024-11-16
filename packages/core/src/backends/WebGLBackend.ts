import { PowerPreference } from './PowerPreference';
import type { Backend } from './Backend';

export interface WebGLBackendOptions {
    readonly powerPreference: PowerPreference;
}

export class WebGLBackend implements Backend, WebGLBackendOptions {
    public readonly context: WebGL2RenderingContext;

    public readonly canvas: HTMLCanvasElement | OffscreenCanvas;

    public readonly buffer: WebGLBuffer;

    public readonly powerPreference: PowerPreference = 'default';

    public constructor(
        context: WebGL2RenderingContext,
        options: Partial<WebGLBackendOptions> = {},
    ) {
        this.context = context;
        this.canvas = this.context.canvas;
        this.buffer = this.context.createBuffer()!;

        if (options.powerPreference) {
            this.powerPreference = options.powerPreference;
        }
    }

    public static from(
        canvas: HTMLCanvasElement | OffscreenCanvas,
        options: Partial<WebGLBackendOptions> = {},
    ): WebGLBackend | null {
        const attributes: WebGLContextAttributes = {
            preserveDrawingBuffer: true,
            powerPreference: 'default',
        };

        if (options.powerPreference == 'lowPower') {
            attributes.powerPreference = 'low-power';
        }

        if (options.powerPreference == 'highPerformance') {
            attributes.powerPreference = 'high-performance';
        }

        try {
            const context = canvas.getContext('webgl2', attributes);

            if (context) {
                return new WebGLBackend(context, options);
            }
        } catch {}

        try {
            // see "./experimental-webgl2.d.ts" for more details
            const context = canvas.getContext('experimental-webgl2', attributes);

            if (context) {
                return new WebGLBackend(context, options);
            }
        } catch {}

        return null;
    }

    public clear(r: number, g: number, b: number, a: number): this {
        this.context.clearColor(r, g, b, a);
        this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);

        return this;
    }
}
