import type { Vector4Array } from '@/Maths/Vector4';

import { Buffer } from './Buffer';

export class Integer4Buffer extends Buffer<Vector4Array> {
    public readonly components = 4;

    public source: Int32Array;

    public constructor(source: number[] | Int32Array) {
        super();

        this.source = new Int32Array(source);
    }

    public set(index: number, x: number, y: number, z: number, w: number): this {
        this.source[index + 0] = x;
        this.source[index + 1] = y;
        this.source[index + 2] = z;
        this.source[index + 3] = w;

        return this;
    }

    public get(index: number): Vector4Array {
        return [
            this.source[index + 0],
            this.source[index + 1],
            this.source[index + 2],
            this.source[index + 3],
        ];
    }
}
