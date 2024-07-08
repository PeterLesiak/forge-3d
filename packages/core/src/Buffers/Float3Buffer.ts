import type { Type } from '@/Types/Type';
import type { FloatArray } from '@/Types/Array';
import { Observable, type Observer } from '@/Observer';
import type { Vector3Array } from '@/Maths/Vector3';

import type { OnBufferUpdate } from './Buffer';

export class Float3Buffer implements Type, Iterable<Vector3Array> {
    private readonly _source: FloatArray;

    public constructor(source: number[] | FloatArray) {
        if (Array.isArray(source)) {
            this._source = new Float32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): Float3Buffer {
        return new Float3Buffer(this._source.map(value => value));
    }

    public get length(): number {
        return this._source.length / 3;
    }

    public get(index: number): Vector3Array {
        return [this._source[index], this._source[index + 1], this._source[index + 2]];
    }

    public readonly onUpdateObservable = new Observable<OnBufferUpdate<Float3Buffer>>();

    public onUpdate(
        callback: OnBufferUpdate<Float3Buffer>,
    ): Observer<OnBufferUpdate<Float3Buffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public set(index: number, x: number, y: number, z: number): this {
        const previous = this.clone();

        this._source[index + 0] = x;
        this._source[index + 1] = y;
        this._source[index + 2] = z;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector3Array> {
        for (let i = 0; i < this._source.length; i += 3) {
            yield this.get(i);
        }
    }
}
