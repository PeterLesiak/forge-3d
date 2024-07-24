import type { Type } from '@/Types/Type';

export class Shader implements Type {
    public readonly source: string;

    public constructor(source: string) {
        this.source = source;
    }

    public get objectClassName(): string {
        return 'Shader';
    }

    public label: string = '';
}
