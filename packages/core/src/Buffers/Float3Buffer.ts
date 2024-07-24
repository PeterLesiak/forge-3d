import type { FloatArray } from '@/Types/Array';
import type { Vector3Array } from '@/Maths/Vector3';

import type { Buffer } from './Buffer';

export class Float3Buffer implements Buffer<Vector3Array> {
    public readonly source: FloatArray;

    public constructor(source: number[] | FloatArray) {
        if (Array.isArray(source)) {
            this.source = new Float32Array(source);
            return;
        }

        this.source = source.map(value => value);
    }

    public clone(): Float3Buffer {
        return new Float3Buffer(this.source);
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

    public get objectClassName(): string {
        return 'Float3Buffer';
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector3Array, void> {
        for (let i = 0; i < this.source.length; i += 3) {
            yield this.get(i);
        }
    }
}
