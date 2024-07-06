import type { DataArray } from '@/Types/Array';
import type { Type } from '@/Types/Type';

export type ViewportArray = [number, number];

export class Viewport implements Type, Iterable<number> {
    public width: number;

    public height: number;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public copy(other: Viewport): this {
        this.width = other.width;
        this.height = other.height;

        return this;
    }

    public clone(): Viewport {
        return new Viewport(this.width, this.height);
    }

    public set(width: number, height: number): this {
        this.width = width;
        this.height = height;

        return this;
    }

    public setScalar(scalar: number): this {
        this.width = scalar;
        this.height = scalar;

        return this;
    }

    public get isZero(): boolean {
        return this.width == 0.0 && this.height == 0.0;
    }

    public setZero(): this {
        this.setScalar(0.0);

        return this;
    }

    public fromArray(array: DataArray, offset: number = 0): this {
        this.width = array[offset + 0];
        this.height = array[offset + 1];

        return this;
    }

    public toArray(array: DataArray, offset: number = 0): this {
        array[offset + 0] = this.width;
        array[offset + 1] = this.height;

        return this;
    }

    public asArray(): ViewportArray {
        return [this.width, this.height];
    }

    public get aspect(): number {
        const aspect = this.width / this.height;

        return Number.isNaN(aspect) ? 0.0 : aspect;
    }

    public toString(): string {
        return `(${this.width}, ${this.height})`;
    }

    public static Zero(): Viewport {
        return new Viewport(0.0, 0.0);
    }

    public static One(): Viewport {
        return new Viewport(1.0, 1.0);
    }

    public static PositiveInfinity(): Viewport {
        return new Viewport(Infinity, Infinity);
    }

    public static FromArray(array: DataArray, offset?: number): Viewport {
        return Viewport.Zero().fromArray(array, offset);
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        yield this.width;
        yield this.height;
    }
}
