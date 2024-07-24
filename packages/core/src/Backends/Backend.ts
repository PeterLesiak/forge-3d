import type { Type } from '@/Types/Type';

export interface Backend extends Type {
    initialize(contextProvider: HTMLCanvasElement): boolean;
}
