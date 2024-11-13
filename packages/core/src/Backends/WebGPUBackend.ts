import type { Backend } from './Backend';

export class WebGPUBackend implements Backend {
    public readonly adapter: GPUAdapter;

    public readonly device: GPUDevice;

    public readonly context: GPUCanvasContext;

    public readonly canvas: HTMLCanvasElement | OffscreenCanvas;

    public constructor(adapter: GPUAdapter, device: GPUDevice, context: GPUCanvasContext) {
        this.adapter = adapter;
        this.device = device;
        this.context = context;

        this.canvas = context.canvas;
    }

    public static async from(
        canvas: HTMLCanvasElement | OffscreenCanvas,
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
                return new WebGPUBackend(adapter, device, context);
            }
        } catch {}

        return null;
    }
}
