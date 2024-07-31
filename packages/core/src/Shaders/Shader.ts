import type { Type } from '@/Types/Type';

import { Preprocessor, type Define } from './Preprocessor';

export class Shader implements Type {
    public readonly source: string;

    public readonly preprocessor = new Preprocessor();

    public constructor(source: string, defines: Record<string, Define> = {}) {
        this.source = source;

        this.preprocessor.defines = defines;
        this.preprocessor.process(this.source);
    }

    public get objectClassName(): string {
        return 'Shader';
    }

    public label: string = '';
}
