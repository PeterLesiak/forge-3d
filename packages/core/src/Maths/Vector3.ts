import type { DataArray } from '@/Types/Array';
import type { Type } from '@/Types/Type';
import { Observable, type Observer, type ObserverFunction } from '@/Observer';

import { equals } from './Utilities';

export type Vector3Array = [number, number, number];

export type OnVector3Update = ObserverFunction<{ dispatcher: Vector3; previous: Vector3 }>;

export class Vector3 implements Type, Iterable<number> {
    public readonly onUpdateObservable = new Observable<OnVector3Update>();

    public onUpdate(callback: OnVector3Update): Observer<OnVector3Update> {
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

    public constructor(x: number, y: number, z: number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    public copy(other: Vector3): this {
        this.set(other.x, other.y, other.z);

        return this;
    }

    public clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    public set(x: number, y: number, z: number): this {
        const previous = this.clone();

        this._x = x;
        this._y = y;
        this._z = z;

        this.onUpdateObservable.dispatch({ dispatcher: this, previous });

        return this;
    }

    public setScalar(scalar: number): this {
        this.set(scalar, scalar, scalar);

        return this;
    }

    public get isZero(): boolean {
        return this.x == 0.0 && this.y == 0.0 && this.z == 0.0;
    }

    public setZero(): this {
        this.setScalar(0.0);

        return this;
    }

    public fromArray(array: DataArray, offset: number = 0): this {
        this.set(array[offset], array[offset + 1], array[offset + 2]);

        return this;
    }

    public toArray(array: DataArray, offset: number = 0): this {
        array[offset + 0] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;

        return this;
    }

    public asArray(): Vector3Array {
        return [this.x, this.y, this.z];
    }

    public addVectors(a: Vector3, b: Vector3): this {
        this.set(a.x + b.x, a.y + b.y, a.z + b.z);

        return this;
    }

    public addScalar(scalar: number): this {
        this.set(this.x + scalar, this.y + scalar, this.z + scalar);

        return this;
    }

    public add(other: Vector3): this {
        this.addVectors(this, other);

        return this;
    }

    public subtractVectors(a: Vector3, b: Vector3): this {
        this.set(a.x - b.x, a.y - b.y, a.z - b.z);

        return this;
    }

    public subtractScalar(scalar: number): this {
        this.set(this.x - scalar, this.y - scalar, this.z - scalar);

        return this;
    }

    public subtract(other: Vector3): this {
        this.subtractVectors(this, other);

        return this;
    }

    public multiplyVectors(a: Vector3, b: Vector3): this {
        this.set(a.x * b.x, a.y * b.y, a.z * b.z);

        return this;
    }

    public multiplyScalar(scalar: number): this {
        this.set(this.x * scalar, this.y * scalar, this.z * scalar);

        return this;
    }

    public multiply(other: Vector3): this {
        this.multiplyVectors(this, other);

        return this;
    }

    public divideVectors(a: Vector3, b: Vector3): this {
        this.set(a.x / b.x, a.y / b.y, a.z / b.z);

        return this;
    }

    public divideScalar(scalar: number): this {
        this.set(this.x / scalar, this.y / scalar, this.z / scalar);

        return this;
    }

    public divide(other: Vector3): this {
        this.divideVectors(this, other);

        return this;
    }

    public equals(other: Vector3, threshold?: number): boolean {
        return (
            equals(this.x, other.x, threshold) &&
            equals(this.y, other.y, threshold) &&
            equals(this.z, other.z, threshold)
        );
    }

    public exactlyEquals(other: Vector3): boolean {
        return this.equals(other, 0.0);
    }

    public get lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
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

    public get normalized(): Vector3 {
        return this.clone().normalize();
    }

    public dot(other: Vector3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    public toString(): string {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    public static Zero(): Vector3 {
        return new Vector3(0.0, 0.0, 0.0);
    }

    public static One(): Vector3 {
        return new Vector3(1.0, 1.0, 1.0);
    }

    public static Left(): Vector3 {
        return new Vector3(-1.0, 0.0, 0.0);
    }

    public static Right(): Vector3 {
        return new Vector3(1.0, 0.0, 0.0);
    }

    public static Up(): Vector3 {
        return new Vector3(0.0, 1.0, 0.0);
    }

    public static Down(): Vector3 {
        return new Vector3(0.0, -1.0, 0.0);
    }

    public static Forward(): Vector3 {
        return new Vector3(0.0, 0.0, 1.0);
    }

    public static Back(): Vector3 {
        return new Vector3(0.0, 0.0, -1.0);
    }

    public static PositiveInfinity(): Vector3 {
        return new Vector3(Infinity, Infinity, Infinity);
    }

    public static NegativeInfinity(): Vector3 {
        return new Vector3(-Infinity, -Infinity, -Infinity);
    }

    public static FromArray(array: DataArray, offset?: number): Vector3 {
        return Vector3.Zero().fromArray(array, offset);
    }

    public static Add(a: Vector3, b: Vector3): Vector3 {
        return Vector3.Zero().addVectors(a, b);
    }

    public static Subtract(a: Vector3, b: Vector3): Vector3 {
        return Vector3.Zero().subtractVectors(a, b);
    }

    public static Multiply(a: Vector3, b: Vector3): Vector3 {
        return Vector3.Zero().multiplyVectors(a, b);
    }

    public static Divide(a: Vector3, b: Vector3): Vector3 {
        return Vector3.Zero().divideVectors(a, b);
    }

    public label: string = '';

    public *[Symbol.iterator](): Iterator<number, void> {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}
