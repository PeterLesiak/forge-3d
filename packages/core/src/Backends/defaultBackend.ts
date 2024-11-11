import type { Backend } from './Backend';
import { WebGLBackend } from './WebGLBackend';
import { WebGPUBackend } from './WebGPUBackend';

export const defaultBackend = async (
    canvas: HTMLCanvasElement | OffscreenCanvas,
): Promise<Backend | null> => {
    const webgpuBackend = await WebGPUBackend.from(canvas);

    if (webgpuBackend) {
        return webgpuBackend;
    }

    const webglBackend = WebGLBackend.from(canvas);

    if (webglBackend) {
        return webglBackend;
    }

    return null;
};
