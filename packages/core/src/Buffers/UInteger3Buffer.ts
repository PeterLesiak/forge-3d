import type { UIntegerArray } from '@/Types/Array';
import type { Vector3Array } from '@/Maths/Vector3';

import type { Buffer } from './Buffer';

export class UInteger3Buffer implements Buffer<Vector3Array> {
    public readonly source: UIntegerArray;

    public constructor(source: number[] | UIntegerArray) {
        if (Array.isArray(source)) {
            this.source = new Uint32Array(source);
            return;
        }

        this.source = source.map(value => value);
    }

    public clone(): UInteger3Buffer {
        return new UInteger3Buffer(this.source);
    }

    public get size(): number {
        return this.source.length / 3;
    }

    public get(index: number): Vector3Array {
        return [this.source[index], this.source[index + 1], this.source[index + 2]];
    }

    public set(index: number, x: number, y: number, z: number): this {
        this.source[index + 0] = x;
        this.source[index + 1] = y;
        this.source[index + 2] = z;

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector3Array, void> {
        for (let i = 0; i < this.source.length; i += 3) {
            yield this.get(i);
        }
    }
}
