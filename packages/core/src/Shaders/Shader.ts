import type { Type } from '@/Types/Type';

import { Preprocessor, type Define } from './Preprocessor';

export type ShaderConfiguration = {
    defines?: Record<string, Define>;
};

export class Shader implements Type {
    public readonly source: string;

    public readonly preprocessor: Preprocessor = new Preprocessor();

    public constructor(source: string, configuration: ShaderConfiguration = {}) {
        this.source = source;

        if (configuration.defines) {
            this.preprocessor.defines = configuration.defines;
        }

        this.preprocessor.process(this.source);
    }

    public get objectClassName(): string {
        return 'Shader';
    }

    public label: string = '';
}
