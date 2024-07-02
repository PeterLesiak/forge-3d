import type { Vector3Array } from '@/Types/Array';

import { Buffer } from './Buffer';

export class Float3Buffer extends Buffer<Vector3Array> {
    public readonly components = 3;

    public source: Float32Array;

    public constructor(source: number[] | Float32Array) {
        super();

        this.source = new Float32Array(source);
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
