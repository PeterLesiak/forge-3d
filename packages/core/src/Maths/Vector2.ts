export class Vector2 {
    public x: number;

    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public set(x: number, y: number): this {
        this.x = x;
        this.y = y;

        return this;
    }

    public copy(other: Vector2): this {
        this.x = other.x;
        this.y = other.y;

        return this;
    }

    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    public static Zero(): Vector2 {
        return new Vector2(0.0, 0.0);
    }

    public static One(): Vector2 {
        return new Vector2(1.0, 1.0);
    }
}
