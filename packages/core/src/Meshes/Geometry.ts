import type { Type } from '@/Types/Type';
import type { Nullable } from '@/Types/Utilities';
import { logger } from '@/Logger';
import type { Buffer } from '@/Buffers/Buffer';
import type { UIntegerBuffer } from '@/Buffers/UIntegerBuffer';
import type { Float2Buffer } from '@/Buffers/Float2Buffer';
import type { Float3Buffer } from '@/Buffers/Float3Buffer';

export class Geometry implements Type {
    /** @internal */
    private buffers = new Map<string, Buffer>();

    public copy(other: Geometry): this {
        this.clear();

        other.buffers.forEach((buffer, name) => {
            this.set(name, buffer);
        });

        if (other.indexBuffer) {
            this.setIndex(other.indexBuffer);
        }

        return this;
    }

    public clone(): Geometry {
        const geometry = new Geometry();

        geometry.copy(this);

        return geometry;
    }

    public set(name: string, buffer: Buffer): this {
        this.buffers.set(name, buffer);

        return this;
    }

    public get(name: string): Nullable<Buffer> {
        const buffer = this.buffers.get(name);

        return buffer ? buffer : null;
    }

    public delete(name: string): this {
        const success = this.buffers.delete(name);

        if (!success) {
            logger.warn(`Buffer named: "${name}" does not exist. Label: "${this.label}"`);
        }

        return this;
    }

    public clear(): this {
        this.buffers.clear();

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
        return this.set('position', buffer);
    }

    public deletePosition(): this {
        return this.delete('position');
    }

    public setNormal(buffer: Float3Buffer): this {
        return this.set('normal', buffer);
    }

    public deleteNormal(): this {
        return this.delete('normal');
    }

    public setUV(buffer: Float2Buffer): this {
        return this.set('uv', buffer);
    }

    public deleteUV(): this {
        return this.delete('uv');
    }

    public get objectClassName(): string {
        return 'Geometry';
    }

    public label: string = '';
}
