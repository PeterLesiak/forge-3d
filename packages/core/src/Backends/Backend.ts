import type { Type } from '@/Types/Type';
import type { Nullable } from '@/Types/Utilities';

export interface Backend extends Type {
    get contextProvider(): Nullable<HTMLCanvasElement>;

    get initialized(): boolean;

    initialize(contextProvider: HTMLCanvasElement): boolean;
}
