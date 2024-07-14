import { Shader } from '@/Shaders/Shader';

import { Material } from './Material';

export class StandardMaterial extends Material {
    public static readonly shader: Shader = new Shader('');

    public constructor() {
        super(StandardMaterial.shader);
    }
}
