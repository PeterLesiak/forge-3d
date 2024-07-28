import type { Type } from '@/Types/Type';

import { Preprocessor, type PreprocessorProperties, type Defined } from './Preprocessor';

export type ShaderConfiguration = {
    preprocessor?: PreprocessorProperties;
};

export class Shader implements Type {
    public readonly source: string;

    public readonly preprocessor = new Preprocessor({ expandMacros: false });

    public readonly defines: Record<string, Defined>;

    public constructor(source: string, configuration: ShaderConfiguration = {}) {
        this.source = source;

        if (configuration.preprocessor) {
            this.preprocessor = new Preprocessor(configuration.preprocessor);
        }

        this.preprocessor.process(this.source);

        this.defines = this.preprocessor.defines;
    }

    public get objectClassName(): string {
        return 'Shader';
    }

    public label: string = '';
}
