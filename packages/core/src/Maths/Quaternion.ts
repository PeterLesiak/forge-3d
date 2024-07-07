import type { DataArray } from '@/Types/Array';
import type { Type } from '@/Types/Type';
import { Observable, type Observer, type ObserverFunction } from '@/Observer';

import { equals } from './Utilities';

export type QuaternionArray = [number, number, number, number];

export type OnQuaternionUpdate = ObserverFunction<{
    dispatcher: Quaternion;
    previous: Quaternion;
}>;

export class Quaternion implements Type, Iterable<number> {
    public onUpdateObservable = new Observable<OnQuaternionUpdate>();

    public onUpdate(callback: OnQuaternionUpdate): Observer<OnQuaternionUpdate> {
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

    public copy(other: Quaternion): this {
        this.set(other.x, other.y, other.z, other.w);

        return this;
    }

    public clone(): Quaternion {
        return new Quaternion(this.x, this.y, this.z, this.w);
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

    public get isIdentity(): boolean {
        return this.x == 0.0 && this.y == 0.0 && this.z == 0.0 && this.w == 1.0;
    }

    public setIdentity(): this {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.w = 1.0;

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

    public asArray(): QuaternionArray {
        return [this.x, this.y, this.z, this.w];
    }

    public multiplyQuaternions(a: Quaternion, b: Quaternion): this {
        const previous = this.clone();

        const ax = a.x;
        const ay = a.y;
        const az = a.z;
        const aw = a.w;

        const bx = b.x;
        const by = b.y;
        const bz = b.z;
        const bw = b.w;

        this._x = ax * bw + aw * bx + ay * bz - az * by;
        this._y = ay * bw + aw * by + az * bx - ax * bz;
        this._z = az * bw + aw * bz + ax * by - ay * bx;
        this._w = aw * bw - ax * bx - ay * by - az * bz;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public multiplyFlat(x: number, y: number, z: number, w: number): this {
        this.set(this.x * x, this.y * y, this.z * z, this.w * w);

        return this;
    }

    public multiplyScalar(scalar: number): this {
        this.set(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);

        return this;
    }

    public multiply(other: Quaternion): this {
        this.multiplyQuaternions(this, other);

        return this;
    }

    public premultiply(other: Quaternion): this {
        this.multiplyQuaternions(other, this);

        return this;
    }

    public equals(other: Quaternion, threshold?: number): boolean {
        return (
            equals(this.x, other.x, threshold) &&
            equals(this.y, other.y, threshold) &&
            equals(this.z, other.z, threshold) &&
            equals(this.w, other.w, threshold)
        );
    }

    public exactlyEquals(other: Quaternion): boolean {
        return this.equals(other, 0.0);
    }

    public conjugate(): this {
        this.multiplyFlat(-1.0, -1.0, -1.0, 1.0);

        return this;
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

    public get normalized(): Quaternion {
        return this.clone().normalize();
    }

    public dot(other: Quaternion): number {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    }

    public invert(): this {
        const dot = this.dot(this);

        if (dot == 0.0) {
            this.setZero();

            return this;
        }

        this.multiplyFlat(-1.0 / dot, -1.0 / dot, -1.0 / dot, 1.0 / dot);

        return this;
    }

    public get inverse(): Quaternion {
        return this.clone().invert();
    }

    public toString(): string {
        return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    public static Identity(): Quaternion {
        return new Quaternion(0.0, 0.0, 0.0, 1.0);
    }

    public static Zero(): Quaternion {
        return new Quaternion(0.0, 0.0, 0.0, 0.0);
    }

    public static FromArray(array: DataArray, offset?: number): Quaternion {
        return Quaternion.Identity().fromArray(array, offset);
    }

    public static Multiply(a: Quaternion, b: Quaternion): Quaternion {
        return Quaternion.Zero().multiplyQuaternions(a, b);
    }

    public static Conjugate(other: Quaternion): Quaternion {
        return other.clone().conjugate();
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }
}
