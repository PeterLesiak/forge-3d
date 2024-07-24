import type { IntegerArray } from '@/Types/Array';
import type { Vector2Array } from '@/Maths/Vector2';

import type { Buffer } from './Buffer';

export class Integer2Buffer implements Buffer<Vector2Array> {
    public readonly source: IntegerArray;

    public constructor(source: number[] | IntegerArray) {
        if (Array.isArray(source)) {
            this.source = new Int32Array(source);
            return;
        }

        this.source = source.map(value => value);
    }

    public clone(): Integer2Buffer {
        return new Integer2Buffer(this.source);
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
        return 'Integer2Buffer';
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector2Array, void> {
        for (let i = 0; i < this.source.length; i += 2) {
            yield this.get(i);
        }
    }
}
