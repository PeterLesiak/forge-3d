import type { Nullable } from '@/Types/Utilities';

import type { Backend } from './Backend';

export class WebGL2Backend implements Backend {
    public context: WebGL2RenderingContext;

    public canvas: HTMLCanvasElement | OffscreenCanvas;

    public constructor(context: WebGL2RenderingContext) {
        this.context = context;

        this.canvas = this.context.canvas;
    }

    public static From(
        contextProvider: HTMLCanvasElement | OffscreenCanvas,
    ): Nullable<WebGL2Backend> {
        const context = contextProvider.getContext('webgl2');

        if (!context) {
            return null;
        }

        return new WebGL2Backend(context);
    }
}
