import type { Type } from '@/Types/Type';

export type UID = number;

export class UIDGenerator implements Type {
    public current: UID = 0;

    public next(): UID {
        return this.current++;
    }

    public get objectClassName(): string {
        return 'UIDGenerator';
    }

    public label: string = '';
}
