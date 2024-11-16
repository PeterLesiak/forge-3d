import type { Backend } from './Backend';
import { WebGLBackend, type WebGLBackendOptions } from './WebGLBackend';
import { WebGPUBackend, type WebGPUBackendOptions } from './WebGPUBackend';

type SharedProperties<A, B> = { [K in keyof A & keyof B]: A[K] | B[K] };

export type SharedBackendOptions = SharedProperties<WebGLBackendOptions, WebGPUBackendOptions>;

export const defaultBackend = async (
    canvas: HTMLCanvasElement | OffscreenCanvas,
    sharedOptions: Partial<SharedBackendOptions> = {},
): Promise<Backend | null> => {
    /*
    
    const webgpuBackend = await WebGPUBackend.from(canvas, sharedOptions);

    if (webgpuBackend) {
        return webgpuBackend;
    }

    */

    const webglBackend = WebGLBackend.from(canvas, sharedOptions);

    if (webglBackend) {
        return webglBackend;
    }

    return null;
};
