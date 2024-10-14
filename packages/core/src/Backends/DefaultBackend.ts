import type { Nullable } from '@/Types/Utilities';

import type { Backend } from './Backend';
import { WebGPUBackend } from './WebGPUBackend';
import { WebGL2Backend } from './WebGL2Bakckend';

export const defaultBackend = async (
    contextProvider: HTMLCanvasElement | OffscreenCanvas,
): Promise<Nullable<Backend>> => {
    const webgpuBackend = await WebGPUBackend.From(contextProvider);

    if (webgpuBackend) {
        return webgpuBackend;
    }

    const webgl2Backend = WebGL2Backend.From(contextProvider);

    if (webgl2Backend) {
        return webgl2Backend;
    }

    return null;
};
