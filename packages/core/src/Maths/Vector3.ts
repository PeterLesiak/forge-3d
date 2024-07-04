import type { Type } from '@/Types/Type';

export type Vector3Array = [number, number, number];

export class Vector3 implements Type {
    public x: number;

    public y: number;

    public z: number;

    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public set(x: number, y: number, z: number): this {
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    public copy(other: Vector3): this {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;

        return this;
    }

    public clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    public label: string = '';

    public static Zero(): Vector3 {
        return new Vector3(0.0, 0.0, 0.0);
    }

    public static One(): Vector3 {
        return new Vector3(1.0, 1.0, 1.0);
    }
}
