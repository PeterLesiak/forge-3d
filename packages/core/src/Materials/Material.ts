import type { Type } from '@/Types/Type';
import type { Shader } from '@/Shaders/Shader';

export class Material implements Type {
    public shader: Shader;

    public constructor(shader: Shader) {
        this.shader = shader;
    }

    public copy(other: Material): this {
        this.shader = other.shader;

        return this;
    }

    public clone(): Material {
        const material = new Material(this.shader);

        return material;
    }

    public get objectClassName(): string {
        return 'Material';
    }

    public label: string = '';
}
