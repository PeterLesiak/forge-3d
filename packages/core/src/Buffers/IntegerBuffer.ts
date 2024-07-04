import { Buffer } from './Buffer';

export class IntegerBuffer extends Buffer<number> {
    public readonly components = 1;

    public source: Int32Array;

    public constructor(source: number[] | Int32Array) {
        super();

        this.source = new Int32Array(source);
    }

    public set(index: number, value: number): this {
        this.source[index] = value;

        return this;
    }

    public get(index: number): number {
        return this.source[index];
    }
}
