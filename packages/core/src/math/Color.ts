export class Color {
    public r: number;

    public g: number;

    public b: number;

    public a: number = 1.0;

    public constructor(r: number, g: number, b: number, a: number = 1.0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public set(r: number, g: number, b: number, a: number = this.a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
