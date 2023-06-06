type ConstructorAux<T extends abstract new (..._args: any) => InstanceType<T>> = new (..._args: ConstructorParameters<T>) => InstanceType<T>;
export declare function mix<T extends ConstructorAux<T>, U extends ConstructorAux<T>>(structToApply: T, struct: U, ignore?: Array<keyof T['prototype']>): Struct<T, U>;
export type Struct<ToMix = {}, Final = {}> = Final extends new (..._args: never[]) => infer F ? ToMix extends new (..._args: never[]) => infer TM ? new (..._args: ConstructorParameters<Final>) => F & TM : never : never;
export {};
