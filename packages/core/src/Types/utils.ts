export type SharedProperties<A, B> = { [K in keyof A & keyof B]: A[K] | B[K] };
