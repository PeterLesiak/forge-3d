export type UID = number;

export class UIDGenerator {
    public current: UID = 0;

    public next(): UID {
        return this.current++;
    }
}
