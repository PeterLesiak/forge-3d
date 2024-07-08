import type { Type } from '@/Types/Type';
import type { Nullable } from '@/Types/Utilities';
import { Observable, type Observer, type ObserverFunction } from '@/Observer';
import type { Buffer } from '@/Buffers/Buffer';
import type { UIntegerBuffer } from '@/Buffers/UIntegerBuffer';
import type { Float2Buffer } from '@/Buffers/Float2Buffer';
import type { Float3Buffer } from '@/Buffers/Float3Buffer';

export type OnGeometryUpdate = ObserverFunction<{ dispatcher: Geometry; previous: Geometry }>;

export class Geometry implements Type {
    private _buffers = new Map<string, Buffer>();

    public clone(): Geometry {
        const geometry = new Geometry();

        this._buffers.forEach((buffer, name) => {
            geometry.setBuffer(name, buffer.clone());
        });

        if (this.indexBuffer) {
            geometry.setIndex(this.indexBuffer.clone());
        }

        return geometry;
    }

    public readonly onGeometryUpdateObservable = new Observable<OnGeometryUpdate>();

    public onGeometryUpdate(callback: OnGeometryUpdate): Observer<OnGeometryUpdate> {
        return this.onGeometryUpdateObservable.add(callback);
    }

    public setBuffer(name: string, buffer: Buffer): this {
        const previous = this.clone();

        this._buffers.set(name, buffer);

        this.onGeometryUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public getBuffer(name: string): Nullable<Buffer> {
        const buffer = this._buffers.get(name);

        return buffer ? buffer : null;
    }

    public deleteBuffer(name: string): this {
        const previous = this.clone();

        this._buffers.delete(name);

        this.onGeometryUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public indexBuffer: Nullable<UIntegerBuffer> = null;

    public setIndex(buffer: UIntegerBuffer): this {
        this.indexBuffer = buffer;

        return this;
    }

    public deleteIndex(): this {
        this.indexBuffer = null;

        return this;
    }

    public setPosition(buffer: Float3Buffer): this {
        return this.setBuffer('position', buffer);
    }

    public getPosition(): Nullable<Float3Buffer> {
        return this.getBuffer('position') as Float3Buffer;
    }

    public deletePosition(): this {
        return this.deleteBuffer('position');
    }

    public setNormal(buffer: Float3Buffer): this {
        return this.setBuffer('normal', buffer);
    }

    public getNormal(): Nullable<Float3Buffer> {
        return this.getBuffer('normal') as Float3Buffer;
    }

    public deleteNormal(): this {
        return this.deleteBuffer('normal');
    }

    public setUV(buffer: Float2Buffer): this {
        return this.setBuffer('uv', buffer);
    }

    public getUV(): Nullable<Float2Buffer> {
        return this.getBuffer('uv') as Float2Buffer;
    }

    public deleteUV(): this {
        return this.deleteBuffer('uv');
    }

    public label: string = '';
}
