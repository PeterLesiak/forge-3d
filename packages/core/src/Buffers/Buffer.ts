import type { Type } from '@/Types/Type';
import type { Vector2Array } from '@/Maths/Vector2';
import type { Vector3Array } from '@/Maths/Vector3';
import type { Vector4Array } from '@/Maths/Vector4';

export type BufferElement = number | Vector2Array | Vector3Array | Vector4Array;

export interface Buffer<T extends BufferElement = BufferElement> extends Type, Iterable<T> {
    clone(): Buffer<T>;

    get size(): number;

    get(index: number): T;

    set(index: number, ...values: T extends number ? [T] : T): this;

    [Symbol.iterator](): Iterator<T, void>;
}
