import { PowerPreference } from './PowerPreference';
import type { Backend } from './Backend';

export interface WebGPUBackendOptions {
    readonly powerPreference: PowerPreference;
}

export class WebGPUBackend implements /* Backend, */ WebGPUBackendOptions {
    public readonly adapter: GPUAdapter;

    public readonly device: GPUDevice;

    public readonly context: GPUCanvasContext;

    public readonly canvas: HTMLCanvasElement | OffscreenCanvas;

    public readonly powerPreference: PowerPreference = 'default';

    public constructor(
        adapter: GPUAdapter,
        device: GPUDevice,
        context: GPUCanvasContext,
        options: Partial<WebGPUBackendOptions> = {},
    ) {
        this.adapter = adapter;
        this.device = device;
        this.context = context;
        this.canvas = this.context.canvas;

        if (options.powerPreference) {
            this.powerPreference = options.powerPreference;
        }
    }

    public static async from(
        canvas: HTMLCanvasElement | OffscreenCanvas,
        options: Partial<WebGPUBackendOptions> = {},
    ): Promise<WebGPUBackend | null> {
        if (!navigator.gpu) {
            return null;
        }

        const adapter = await navigator.gpu.requestAdapter();

        if (!adapter) {
            return null;
        }

        const device = await adapter.requestDevice();

        try {
            const context = canvas.getContext('webgpu');

            if (context) {
                return new WebGPUBackend(adapter, device, context, options);
            }
        } catch {}

        return null;
    }
}
