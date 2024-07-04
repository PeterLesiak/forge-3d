import type { Vector2Array } from '@/Maths/Vector2';

import { Buffer } from './Buffer';

export class UInteger2Buffer extends Buffer<Vector2Array> {
    public readonly components = 2;

    public source: Uint32Array;

    public constructor(source: number[] | Uint32Array) {
        super();

        this.source = new Uint32Array(source);
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
