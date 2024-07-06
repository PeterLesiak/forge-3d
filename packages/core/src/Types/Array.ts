export type IntegerArray = Int8Array | Int16Array | Int32Array | Uint8Array;

export type UIntegerArray = Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array;

export type FloatArray = Float32Array;

export type TypedArray = IntegerArray | UIntegerArray | FloatArray;

export type DataArray = number[] | TypedArray;
