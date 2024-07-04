import { Buffer } from './Buffer';

export class UIntegerBuffer extends Buffer<number> {
    public readonly components = 1;

    public source: Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array;

    public constructor(
        source: number[] | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array,
    ) {
        super();

        if (Array.isArray(source)) {
            this.source = new Uint32Array(source);

            return;
        }

        this.source = source;
    }

    public set(index: number, value: number): this {
        this.source[index] = value;

        return this;
    }

    public get(index: number): number {
        return this.source[index];
    }
}
