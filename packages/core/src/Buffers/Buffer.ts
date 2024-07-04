import type { Type } from '@/Types/Type';
import type { TypedArray } from '@/Types/Array';
import type { Vector2Array } from '@/Maths/Vector2';
import type { Vector3Array } from '@/Maths/Vector3';
import type { Vector4Array } from '@/Maths/Vector4';

type BufferElement = number | Vector2Array | Vector3Array | Vector4Array;

export abstract class Buffer<T extends BufferElement = BufferElement>
    implements Type, Iterable<T>
{
    public abstract readonly components: number;

    public abstract source: TypedArray;

    public get size(): number {
        return this.source.length / this.components;
    }

    public abstract set(index: number, ...values: [number, number, number, number]): this;

    public abstract get(index: number): T;

    public label: string = '';

    public *[Symbol.iterator](): Iterator<T, void> {
        for (let i = 0; i < this.source.length; i += this.components) {
            yield this.get(i);
        }
    }
}
