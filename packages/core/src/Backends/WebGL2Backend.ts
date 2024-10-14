import type { Backend } from './Backend';

export class WebGL2Backend implements Backend {
    public context: WebGL2RenderingContext;

    public canvas: HTMLCanvasElement | OffscreenCanvas;

    public constructor(context: WebGL2RenderingContext) {
        this.context = context;

        this.canvas = this.context.canvas;
    }

    public static from(canvas: HTMLCanvasElement | OffscreenCanvas): WebGL2Backend | null {
        const context = canvas.getContext('webgl2');

        if (!context) {
            return null;
        }

        return new WebGL2Backend(context);
    }
}
