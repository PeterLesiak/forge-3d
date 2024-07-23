import type { UIntegerArray } from '@/Types/Array';
import type { Vector4Array } from '@/Maths/Vector4';

import type { Buffer } from './Buffer';

export class UInteger4Buffer implements Buffer<Vector4Array> {
    public readonly source: UIntegerArray;

    public constructor(source: number[] | UIntegerArray) {
        if (Array.isArray(source)) {
            this.source = new Uint32Array(source);
            return;
        }

        this.source = source.map(value => value);
    }

    public clone(): UInteger4Buffer {
        return new UInteger4Buffer(this.source);
    }

    public get size(): number {
        return this.source.length / 4;
    }

    public get(index: number): Vector4Array {
        return [
            this.source[index + 0],
            this.source[index + 1],
            this.source[index + 2],
            this.source[index + 3],
        ];
    }

    public set(index: number, x: number, y: number, z: number, w: number): this {
        this.source[index + 0] = x;
        this.source[index + 1] = y;
        this.source[index + 2] = z;
        this.source[index + 3] = w;

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector4Array, void> {
        for (let i = 0; i < this.source.length; i += 4) {
            yield this.get(i);
        }
    }
}
