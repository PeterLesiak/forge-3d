import type { Vector2Array } from '@/Types/Array';

import { Buffer } from './Buffer';

export class Float2Buffer extends Buffer<Vector2Array> {
    public readonly components = 2;

    public source: Float32Array;

    public constructor(source: number[] | Float32Array) {
        super();

        this.source = new Float32Array(source);
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
