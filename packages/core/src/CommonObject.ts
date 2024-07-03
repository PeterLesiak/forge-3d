export abstract class CommonObject {
    public abstract readonly objectClassName: string;

    public label: string = '';

    public toString(): string {
        if (this.label.length > 0) {
            return `${this.objectClassName}: ${this.label}`;
        }

        return this.objectClassName;
    }
}
