import type { DataArray } from '@/Types/Array';
import type { Type } from '@/Types/Type';
import { Observable, type Observer, type ObserverFunction } from '@/Observer';

import { equals } from './Utilities';

export type Vector4Array = [number, number, number, number];

export type OnVector4Update = ObserverFunction<{ dispatcher: Vector4; previous: Vector4 }>;

export class Vector4 implements Type, Iterable<number> {
    public readonly onUpdateObservable = new Observable<OnVector4Update>();

    public onUpdate(callback: OnVector4Update): Observer<OnVector4Update> {
        return this.onUpdateObservable.add(callback);
    }

    private _x: number;

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        const previous = this.clone();

        this._x = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _y: number;

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        const previous = this.clone();

        this._y = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _z: number;

    public get z(): number {
        return this._z;
    }

    public set z(value: number) {
        const previous = this.clone();

        this._z = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    private _w: number;

    public get w(): number {
        return this._w;
    }

    public set w(value: number) {
        const previous = this.clone();

        this._w = value;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });
    }

    public constructor(x: number, y: number, z: number, w: number) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }

    public copy(other: Vector4): this {
        this.set(other.x, other.y, other.z, other.w);

        return this;
    }

    public clone(): Vector4 {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    public set(x: number, y: number, z: number, w: number): this {
        const previous = this.clone();

        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public setScalar(scalar: number): this {
        this.set(scalar, scalar, scalar, scalar);

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
        this.set(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);

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
        this.set(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);

        return this;
    }

    public addScalar(scalar: number): this {
        this.set(this.x + scalar, this.y + scalar, this.z + scalar, this.w + scalar);

        return this;
    }

    public add(other: Vector4): this {
        this.addVectors(this, other);

        return this;
    }

    public subtractVectors(a: Vector4, b: Vector4): this {
        this.set(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);

        return this;
    }

    public subtractScalar(scalar: number): this {
        this.set(this.x - scalar, this.y - scalar, this.z - scalar, this.w - scalar);

        return this;
    }

    public subtract(other: Vector4): this {
        this.subtractVectors(this, other);

        return this;
    }

    public multiplyVectors(a: Vector4, b: Vector4): this {
        this.set(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);

        return this;
    }

    public multiplyScalar(scalar: number): this {
        this.set(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);

        return this;
    }

    public multiply(other: Vector4): this {
        this.multiplyVectors(this, other);

        return this;
    }

    public divideVectors(a: Vector4, b: Vector4): this {
        this.set(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);

        return this;
    }

    public divideScalar(scalar: number): this {
        this.set(this.x / scalar, this.y / scalar, this.z / scalar, this.w + scalar);

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
