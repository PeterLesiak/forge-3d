export class Vector4 {
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

    public set(x: number, y: number, z: number, w: number): this {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
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

    public static Zero(): Vector4 {
        return new Vector4(0.0, 0.0, 0.0, 0.0);
    }

    public static One(): Vector4 {
        return new Vector4(1.0, 1.0, 1.0, 1.0);
    }

    public static Identity(): Vector4 {
        return new Vector4(0.0, 0.0, 0.0, 1.0);
    }
}
