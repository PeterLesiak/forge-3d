import type { Vector2Array } from '@/Maths/Vector2';

import { Buffer } from './Buffer';

export class UInteger2Buffer extends Buffer<Vector2Array> {
    public readonly components = 2;

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

    public set(index: number, x: number, y: number): this {
        this.source[index + 0] = x;
        this.source[index + 1] = y;

        return this;
    }

    public get(index: number): Vector2Array {
        return [this.source[index], this.source[index + 1]];
    }
}
