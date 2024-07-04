import type { Vector2Array } from '@/Maths/Vector2';

import { Buffer } from './Buffer';

export class Integer2Buffer extends Buffer<Vector2Array> {
    public readonly components = 2;

    public source: Int8Array | Int16Array | Int32Array;

    public constructor(source: number[] | Int8Array | Int16Array | Int32Array) {
        super();

        if (Array.isArray(source)) {
            this.source = new Int32Array(source);

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
