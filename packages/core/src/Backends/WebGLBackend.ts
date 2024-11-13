import type { Backend } from './Backend';

export class WebGLBackend implements Backend {
    public readonly context: WebGL2RenderingContext;

    public readonly canvas: HTMLCanvasElement | OffscreenCanvas;

    public constructor(context: WebGL2RenderingContext) {
        this.context = context;

        this.canvas = context.canvas;
    }

    public static from(canvas: HTMLCanvasElement | OffscreenCanvas): WebGLBackend | null {
        try {
            const context = canvas.getContext('webgl2');

            if (context) {
                return new WebGLBackend(context);
            }
        } catch {}

        try {
            // see "./experimental-webgl2.d.ts" for more details
            const context = canvas.getContext('experimental-webgl2');

            if (context) {
                return new WebGLBackend(context);
            }
        } catch {}

        return null;
    }
}
