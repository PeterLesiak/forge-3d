export interface Backend {
    readonly canvas: HTMLCanvasElement | OffscreenCanvas;

    clear(r: number, g: number, b: number, a: number): this;
}
