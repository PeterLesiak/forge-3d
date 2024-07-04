import { Buffer } from './Buffer';

export class FloatBuffer extends Buffer<number> {
    public readonly components = 1;

    public source: Float32Array;

    public constructor(source: number[] | Float32Array) {
        super();

        this.source = new Float32Array(source);
    }

    public set(index: number, value: number): this {
        this.source[index] = value;

        return this;
    }

    public get(index: number): number {
        return this.source[index];
    }
}
