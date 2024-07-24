import type { UIntegerArray } from '@/Types/Array';

import type { Buffer } from './Buffer';

export class UIntegerBuffer implements Buffer<number> {
    public readonly source: UIntegerArray;

    public constructor(source: number[] | UIntegerArray) {
        if (Array.isArray(source)) {
            this.source = new Uint32Array(source);
            return;
        }

        this.source = source.map(value => value);
    }

    public clone(): UIntegerBuffer {
        return new UIntegerBuffer(this.source);
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
        return 'UIntegerBuffer';
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        for (let i = 0; i < this.source.length; ++i) {
            yield this.source[i];
        }
    }
}
