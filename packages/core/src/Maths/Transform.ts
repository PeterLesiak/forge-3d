import { CommonObject } from '@/CommonObject';

import { Vector3 } from './Vector3';
import { Quaternion } from './Quaternion';
import { Matrix } from './Matrix';

export class Transform extends CommonObject {
    public readonly objectClassName: string = 'Transform';

    public readonly position: Vector3 = Vector3.Zero();

    public readonly rotation: Quaternion = Quaternion.Identity();

    public readonly scale: Vector3 = Vector3.One();

    public readonly localMatrix: Matrix = Matrix.Identity();
}
