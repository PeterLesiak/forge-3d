import type { Options } from 'tsup';

type MaybePromise<T> = T | Promise<T>;

export declare const makeConfig: (
    name: string,
) => Options | Options[] | ((overrideOptions: Options) => MaybePromise<Options | Options[]>);
