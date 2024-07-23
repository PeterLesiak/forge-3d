import type { DataArray } from '@/Types/Array';
import type { Type } from '@/Types/Type';

import { equals } from './Utilities';

export type Vector2Array = [number, number];

export class Vector2 implements Type, Iterable<number> {
    public x: number;

    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public copy(other: Vector2): this {
        this.set(other.x, other.y);

        return this;
    }

    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    public set(x: number, y: number): this {
        this.x = x;
        this.y = y;

        return this;
    }

    public setScalar(scalar: number): this {
        this.set(scalar, scalar);

        return this;
    }

    public isZero(): boolean {
        return this.x == 0.0 && this.y == 0.0;
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
        array[offset + 0] = this.x;
        array[offset + 1] = this.y;

        return this;
    }

    public asArray(): Vector2Array {
        return [this.x, this.y];
    }

    public addVectors(a: Vector2, b: Vector2): this {
        this.set(a.x + b.x, a.y + b.y);

        return this;
    }

    public addScalar(scalar: number): this {
        this.set(this.x + scalar, this.y + scalar);

        return this;
    }

    public add(other: Vector2): this {
        this.addVectors(this, other);

        return this;
    }

    public subtractVectors(a: Vector2, b: Vector2): this {
        this.set(a.x - b.x, a.y - b.y);

        return this;
    }

    public subtractScalar(scalar: number): this {
        this.set(this.x - scalar, this.y - scalar);

        return this;
    }

    public subtract(other: Vector2): this {
        this.subtractVectors(this, other);

        return this;
    }

    public multiplyVectors(a: Vector2, b: Vector2): this {
        this.set(a.x * b.x, a.y * b.y);

        return this;
    }

    public multiplyScalar(scalar: number): this {
        this.set(this.x * scalar, this.y * scalar);

        return this;
    }

    public multiply(other: Vector2): this {
        this.multiplyVectors(this, other);

        return this;
    }

    public divideVectors(a: Vector2, b: Vector2): this {
        this.set(a.x / b.x, a.y / b.y);

        return this;
    }

    public divideScalar(scalar: number): this {
        this.set(this.x / scalar, this.y / scalar);

        return this;
    }

    public divide(other: Vector2): this {
        this.divideVectors(this, other);

        return this;
    }

    public equals(other: Vector2, threshold?: number): boolean {
        return equals(this.x, other.x, threshold) && equals(this.y, other.y, threshold);
    }

    public equalsExactly(other: Vector2): boolean {
        return this.equals(other, 0.0);
    }

    public get lengthSquared(): number {
        return this.x * this.x + this.y * this.y;
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

    public normalized(): Vector2 {
        return this.clone().normalize();
    }

    public dot(other: Vector2): number {
        return this.x * other.x + this.y * other.y;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    public static zero(): Vector2 {
        return new Vector2(0.0, 0.0);
    }

    public static one(): Vector2 {
        return new Vector2(1.0, 1.0);
    }

    public static left(): Vector2 {
        return new Vector2(-1.0, 0.0);
    }

    public static right(): Vector2 {
        return new Vector2(1.0, 0.0);
    }

    public static up(): Vector2 {
        return new Vector2(0.0, 1.0);
    }

    public static down(): Vector2 {
        return new Vector2(0.0, -1.0);
    }

    public static positiveInfinity(): Vector2 {
        return new Vector2(Infinity, Infinity);
    }

    public static negativeInfinity(): Vector2 {
        return new Vector2(-Infinity, -Infinity);
    }

    public static fromArray(array: DataArray, offset?: number): Vector2 {
        return Vector2.zero().fromArray(array, offset);
    }

    public static add(a: Vector2, b: Vector2): Vector2 {
        return Vector2.zero().addVectors(a, b);
    }

    public static subtract(a: Vector2, b: Vector2): Vector2 {
        return Vector2.zero().subtractVectors(a, b);
    }

    public static multiply(a: Vector2, b: Vector2): Vector2 {
        return Vector2.zero().multiplyVectors(a, b);
    }

    public static divide(a: Vector2, b: Vector2): Vector2 {
        return Vector2.zero().divideVectors(a, b);
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        yield this.x;
        yield this.y;
    }
}
