import type { TypedArray, Vector4Array, Vector3Array, Vector2Array } from '@/Types/Array';

export abstract class Buffer<T extends number | Vector2Array | Vector3Array | Vector4Array>
    implements Iterable<T>
{
    public abstract readonly components: number;

    public abstract source: TypedArray;

    public get size(): number {
        return this.source.length / this.components;
    }

    public abstract set(index: number, ...values: [number, number, number, number]): this;

    public abstract get(index: number): T;

    public *[Symbol.iterator](): Iterator<T, void> {
        for (let i = 0; i < this.source.length; i += this.components) {
            yield this.get(i);
        }
    }
}
