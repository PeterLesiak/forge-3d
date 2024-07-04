import type { Vector3Array } from '@/Maths/Vector3';

import { Buffer } from './Buffer';

export class UInteger3Buffer extends Buffer<Vector3Array> {
    public readonly components = 3;

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

    public set(index: number, x: number, y: number, z: number): this {
        this.source[index + 0] = x;
        this.source[index + 1] = y;
        this.source[index + 2] = z;

        return this;
    }

    public get(index: number): Vector3Array {
        return [this.source[index], this.source[index + 1], this.source[index + 2]];
    }
}
