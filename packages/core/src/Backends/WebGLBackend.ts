import type { Backend } from './Backend';

export class WebGLBackend implements Backend {
    public readonly context: WebGL2RenderingContext;

    public readonly canvas: HTMLCanvasElement | OffscreenCanvas;

    public constructor(context: WebGL2RenderingContext) {
        this.context = context;

        this.canvas = context.canvas;
    }

    public static from(canvas: HTMLCanvasElement | OffscreenCanvas): WebGLBackend | null {
        const context =
            canvas.getContext('webgl2') ??
            // see "./experimental-webgl2.d.ts" for more details
            canvas.getContext('experimental-webgl2');

        if (!context) {
            return null;
        }

        return new WebGLBackend(context);
    }
}
