import type { Type } from '@/Types/Type';
import type { UIntegerArray } from '@/Types/Array';
import { Observable, type Observer } from '@/Observer';
import type { Vector2Array } from '@/Maths/Vector2';

import type { OnBufferUpdate } from './Buffer';

export class UInteger2Buffer implements Type, Iterable<Vector2Array> {
    private readonly _source: UIntegerArray;

    public constructor(source: number[] | UIntegerArray) {
        if (Array.isArray(source)) {
            this._source = new Uint32Array(source);
            return;
        }

        this._source = source.map(value => value);
    }

    public clone(): UInteger2Buffer {
        return new UInteger2Buffer(this._source.map(value => value));
    }

    public get length(): number {
        return this._source.length / 2;
    }

    public get(index: number): Vector2Array {
        return [this._source[index], this._source[index + 1]];
    }

    public readonly onUpdateObservable = new Observable<OnBufferUpdate<UInteger2Buffer>>();

    public onUpdate(
        callback: OnBufferUpdate<UInteger2Buffer>,
    ): Observer<OnBufferUpdate<UInteger2Buffer>> {
        return this.onUpdateObservable.add(callback);
    }

    public set(index: number, x: number, y: number): this {
        const previous = this.clone();

        this._source[index + 0] = x;
        this._source[index + 1] = y;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<Vector2Array> {
        for (let i = 0; i < this._source.length; i += 2) {
            yield this.get(i);
        }
    }
}
