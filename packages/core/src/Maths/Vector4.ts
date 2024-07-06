import type { DataArray } from '@/Types/Array';
import type { Type } from '@/Types/Type';

import { equals } from './Utilities';

export type Vector4Array = [number, number, number, number];

export class Vector4 implements Type, Iterable<number> {
    public x: number;

    public y: number;

    public z: number;

    public w: number;

    public constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public copy(other: Vector4): this {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        this.w = other.w;

        return this;
    }

    public clone(): Vector4 {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    public set(x: number, y: number, z: number, w: number): this {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }

    public setScalar(scalar: number): this {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        this.w = scalar;

        return this;
    }

    public get isZero(): boolean {
        return this.x == 0.0 && this.y == 0.0 && this.z == 0.0 && this.w == 0.0;
    }

    public setZero(): this {
        this.setScalar(0.0);

        return this;
    }

    public fromArray(array: DataArray, offset: number = 0): this {
        this.x = array[offset + 0];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];

        return this;
    }

    public toArray(array: DataArray, offset: number = 0): this {
        array[offset + 0] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;

        return this;
    }

    public asArray(): Vector4Array {
        return [this.x, this.y, this.z, this.w];
    }

    public addVectors(a: Vector4, b: Vector4): this {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;

        return this;
    }

    public addScalar(scalar: number): this {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        this.w += scalar;

        return this;
    }

    public add(other: Vector4): this {
        this.addVectors(this, other);

        return this;
    }

    public subtractVectors(a: Vector4, b: Vector4): this {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;

        return this;
    }

    public subtractScalar(scalar: number): this {
        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;
        this.w -= scalar;

        return this;
    }

    public subtract(other: Vector4): this {
        this.subtractVectors(this, other);

        return this;
    }

    public multiplyVectors(a: Vector4, b: Vector4): this {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        this.w = a.w * b.w;

        return this;
    }

    public multiplyScalar(scalar: number): this {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;

        return this;
    }

    public multiply(other: Vector4): this {
        this.multiplyVectors(this, other);

        return this;
    }

    public divideVectors(a: Vector4, b: Vector4): this {
        this.x = a.x / b.x;
        this.y = a.y / b.y;
        this.z = a.z / b.z;
        this.w = a.w / b.w;

        return this;
    }

    public divideScalar(scalar: number): this {
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
        this.w /= scalar;

        return this;
    }

    public divide(other: Vector4): this {
        this.divideVectors(this, other);

        return this;
    }

    public equals(other: Vector4, threshold?: number): boolean {
        return (
            equals(this.x, other.x, threshold) &&
            equals(this.y, other.y, threshold) &&
            equals(this.z, other.z, threshold) &&
            equals(this.w, other.w, threshold)
        );
    }

    public exactlyEquals(other: Vector4): boolean {
        return this.equals(other, 0.0);
    }

    public get lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    public get length(): number {
        return Math.sqrt(this.lengthSquared);
    }

    public normalize(): this {
        const length = this.length;

        if (length == 0.0) {
            this.setZero();

            return this;
        }

        this.multiplyScalar(1.0 / length);

        return this;
    }

    public get normalized(): Vector4 {
        return this.clone().normalize();
    }

    public dot(other: Vector4): number {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    }

    public toString(): string {
        return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    public static Zero(): Vector4 {
        return new Vector4(0.0, 0.0, 0.0, 0.0);
    }

    public static One(): Vector4 {
        return new Vector4(1.0, 1.0, 1.0, 1.0);
    }

    public static PositiveInfinity(): Vector4 {
        return new Vector4(Infinity, Infinity, Infinity, Infinity);
    }

    public static NegativeInfinity(): Vector4 {
        return new Vector4(-Infinity, -Infinity, -Infinity, -Infinity);
    }

    public static FromArray(array: DataArray, offset?: number): Vector4 {
        return Vector4.Zero().fromArray(array, offset);
    }

    public static Add(a: Vector4, b: Vector4): Vector4 {
        return Vector4.Zero().addVectors(a, b);
    }

    public static Subtract(a: Vector4, b: Vector4): Vector4 {
        return Vector4.Zero().subtractVectors(a, b);
    }

    public static Multiply(a: Vector4, b: Vector4): Vector4 {
        return Vector4.Zero().multiplyVectors(a, b);
    }

    public static Divide(a: Vector4, b: Vector4): Vector4 {
        return Vector4.Zero().divideVectors(a, b);
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }
}
