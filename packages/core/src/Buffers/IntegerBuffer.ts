import type { IntegerArray } from '@/Types/Array';

import type { Buffer } from './Buffer';

export class IntegerBuffer implements Buffer<number> {
    public readonly source: IntegerArray;

    public constructor(source: number[] | IntegerArray) {
        if (Array.isArray(source)) {
            this.source = new Int32Array(source);
            return;
        }

        this.source = source.map(value => value);
    }

    public clone(): IntegerBuffer {
        return new IntegerBuffer(this.source);
    }

    public get size(): number {
        return this.source.length;
    }

    public get(index: number): number {
        return this.source[index];
    }

    public set(index: number, value: number): this {
        this.source[index] = value;

        return this;
    }

    public get objectClassName(): string {
        return 'IntegerBuffer';
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        for (let i = 0; i < this.source.length; ++i) {
            yield this.source[i];
        }
    }
}
