import type { Backend } from './Backend';
import { EmptyBackend } from './EmptyBackend';
import { WebGLBackend } from './WebGLBackend';
import { WebGPUBackend } from './WebGPUBackend';

const fallbackBackends = [WebGPUBackend, WebGLBackend] as const;

export const backendFallback = (contextProvider: HTMLCanvasElement): Backend => {
    for (const fallbackBackend of fallbackBackends) {
        const backend = new fallbackBackend();

        if (backend.initialize(contextProvider)) {
            return backend;
        }
    }

    return new EmptyBackend();
};
