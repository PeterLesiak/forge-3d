import type { Backend } from './Backend';
import { WebGPUBackend } from './WebGPUBackend';
import { WebGL2Backend } from './WebGL2Backend';

export const defaultBackend = async (
    canvas: HTMLCanvasElement | OffscreenCanvas,
): Promise<Backend | null> => {
    const webgpuBackend = await WebGPUBackend.from(canvas);

    if (webgpuBackend) {
        return webgpuBackend;
    }

    const webgl2Backend = WebGL2Backend.from(canvas);

    if (webgl2Backend) {
        return webgl2Backend;
    }

    return null;
};
