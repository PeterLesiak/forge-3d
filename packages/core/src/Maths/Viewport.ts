import type { Type } from '@/Types/Type';

export class Viewport implements Type {
    public width: number;

    public height: number;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public get aspect(): number {
        const aspect = this.width / this.height;

        return Number.isNaN(aspect) ? 0.0 : aspect;
    }

    public label: string = '';
}
