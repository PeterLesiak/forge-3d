import { Buffer } from './Buffer';

export class UIntegerBuffer extends Buffer<number> {
    public readonly objectClassName: string = 'UIntegerBuffer';

    public readonly components = 1;

    public source: Uint32Array;

    public constructor(source: number[] | Uint32Array) {
        super();

        this.source = new Uint32Array(source);
    }

    public set(index: number, value: number): this {
        this.source[index] = value;

        return this;
    }

    public get(index: number): number {
        return this.source[index];
    }
}
