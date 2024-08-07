import type { DataArray } from '@/Types/Array';
import type { Type } from '@/Types/Type';

import { equals } from './Utilities';

export type ViewportArray = [number, number];

export class Viewport implements Type, Iterable<number> {
    public width: number;

    public height: number;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public copy(other: Viewport): this {
        this.set(other.width, other.height);

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
        this.set(scalar, scalar);
        return this;
    }

    public isZero(): boolean {
        return this.width == 0.0 && this.height == 0.0;
    }

    public setZero(): this {
        this.setScalar(0.0);

        return this;
    }

    public fromArray(array: DataArray, offset: number = 0): this {
        this.set(array[offset], array[offset + 1]);

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

    public equals(other: Viewport, threshold?: number): boolean {
        return (
            equals(this.width, other.width, threshold) &&
            equals(this.height, other.height, threshold)
        );
    }

    public equalsExactly(other: Viewport): boolean {
        return this.equals(other, 0.0);
    }

    public get aspect(): number {
        const aspect = this.width / this.height;

        return Number.isNaN(aspect) ? 0.0 : aspect;
    }

    public toString(): string {
        return `(${this.width}, ${this.height})`;
    }

    public static zero(): Viewport {
        return new Viewport(0.0, 0.0);
    }

    public static one(): Viewport {
        return new Viewport(1.0, 1.0);
    }

    public static positiveInfinity(): Viewport {
        return new Viewport(Infinity, Infinity);
    }

    public static fromArray(array: DataArray, offset?: number): Viewport {
        return Viewport.zero().fromArray(array, offset);
    }

    public get objectClassName(): string {
        return 'Viewport';
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        yield this.width;
        yield this.height;
    }
}
