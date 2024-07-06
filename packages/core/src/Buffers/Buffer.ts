import type { Type } from '@/Types/Type';
import type { TypedArray } from '@/Types/Array';
import type { Vector2Array } from '@/Maths/Vector2';
import type { Vector3Array } from '@/Maths/Vector3';
import type { Vector4Array } from '@/Maths/Vector4';

export type BufferElement = number | Vector2Array | Vector3Array | Vector4Array;

export abstract class Buffer<T extends BufferElement = BufferElement>
    implements Type, Iterable<T>
{
    public abstract readonly components: number;

    protected abstract _source: TypedArray;

    public get size(): number {
        return this._source.length / this.components;
    }

    public abstract get(index: number): T;

    public abstract set(index: number, ...values: Vector4Array): this;

    public label: string = '';

    public *[Symbol.iterator](): Iterator<T, void> {
        for (let i = 0; i < this._source.length; i += this.components) {
            yield this.get(i);
        }
    }
}
