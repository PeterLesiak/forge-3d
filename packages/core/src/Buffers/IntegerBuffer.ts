import { Buffer } from './Buffer';

export class IntegerBuffer extends Buffer<number> {
    public readonly components = 1;

    public source: Int8Array | Int16Array | Int32Array;

    public constructor(source: number[] | Int8Array | Int16Array | Int32Array) {
        super();

        if (Array.isArray(source)) {
            this.source = new Int32Array(source);

            return;
        }

        this.source = source;
    }

    public set(index: number, value: number): this {
        this.source[index] = value;

        return this;
    }

    public get(index: number): number {
        return this.source[index];
    }
}
