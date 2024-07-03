import type { Vector4Array } from '@/Maths/Vector4';

import { Buffer } from './Buffer';

export class Float4Buffer extends Buffer<Vector4Array> {
    public readonly objectClassName: string = 'Float4Buffer';

    public readonly components = 4;

    public source: Float32Array;

    public constructor(source: number[] | Float32Array) {
        super();

        this.source = new Float32Array(source);
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
