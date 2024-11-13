// Legacy webgl2 context name used in Firefox 25-41
// https://caniuse.com/?search=webgl2

interface HTMLCanvasElement {
    getContext(
        contextId: 'experimental-webgl2',
        contextAttributes?: WebGLContextAttributes,
    ): WebGL2RenderingContext | null;
}

interface OffscreenCanvas {
    getContext(
        contextId: 'experimental-webgl2',
        contextAttributes?: WebGLContextAttributes,
    ): WebGL2RenderingContext | null;
}
