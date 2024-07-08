import type { Type } from '@/Types/Type';
import type { FloatArray } from '@/Types/Array';
import { Observable, type Observer } from '@/Observer';
import type { Vector4Array } from '@/Maths/Vector4';

import type { OnBufferUpdate } from './Buffer';

export class Float4Buffer implements Type, Iterable<Vector4Array> {
    private readonly _source: FloatArray;

    public constructor(source: number[] | FloatArray) {
        if (Array.isArray(source)) {
            this._source = new Float32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): Float4Buffer {
        return new Float4Buffer(this._source.map(value => value));
    }

    public get length(): number {
        return this._source.length / 4;
    }

    public get(index: number): Vector4Array {
        return [
            this._source[index + 0],
            this._source[index + 1],
            this._source[index + 2],
            this._source[index + 3],
        ];
    }

    public readonly onUpdateObservable = new Observable<OnBufferUpdate<Float4Buffer>>();

    public onUpdate(
        callback: OnBufferUpdate<Float4Buffer>,
    ): Observer<OnBufferUpdate<Float4Buffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public set(index: number, x: number, y: number, z: number, w: number): this {
        const previous = this.clone();

        this._source[index + 0] = x;
        this._source[index + 1] = y;
        this._source[index + 2] = z;
        this._source[index + 3] = w;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector4Array> {
        for (let i = 0; i < this._source.length; i += 4) {
            yield this.get(i);
        }
    }
}
