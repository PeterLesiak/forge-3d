import type { FloatArray } from '@/Types/Array';
import type { Vector2Array } from '@/Maths/Vector2';

import type { Buffer } from './Buffer';

export class Float2Buffer implements Buffer<Vector2Array> {
    public readonly source: FloatArray;

    public constructor(source: number[] | FloatArray) {
        if (Array.isArray(source)) {
            this.source = new Float32Array(source);
            return;
        }

        this.source = source.map(value => value);
    }

    public clone(): Float2Buffer {
        return new Float2Buffer(this.source);
    }

    public get size(): number {
        return this.source.length / 2;
    }

    public get(index: number): Vector2Array {
        return [this.source[index], this.source[index + 1]];
    }

    public set(index: number, x: number, y: number): this {
        this.source[index + 0] = x;
        this.source[index + 1] = y;

        return this;
    }

    public get objectClassName(): string {
        return 'Float2Buffer';
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector2Array, void> {
        for (let i = 0; i < this.source.length; i += 2) {
            yield this.get(i);
        }
    }
}
