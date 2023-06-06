function yankProps(a: object, b: object) {
  // when {}.__proto__.__proto__ just don't asign any props
  if (Object.getPrototypeOf(b) == null) {
      return;
  }
  // yank the rest of the props
  const props = Object.getOwnPropertyDescriptors(b);
  Object.defineProperties(a, props);
}

function applySuper(struct: any, b: any) {
  yankProps(struct.prototype, b)
  if (b.__proto__) applySuper(struct, b.__proto__)
  return struct;
}

function apply(struct: any, b: any) {
  yankProps(struct.prototype, b.prototype)
  if (b.__proto__.prototype) applySuper(struct, b.__proto__.prototype)
  return struct;
}

type ConstructorAux<T extends abstract new (..._args: any) => InstanceType<T>> = new (..._args: ConstructorParameters<T>) => InstanceType<T>;

export function mix<
  T extends ConstructorAux<T>,
  U extends ConstructorAux<T>
>(
  structToApply: T,
  struct: U,
  // @ts-ignore fix
  ignore?: Array<keyof T['prototype']>
): Struct<T, U> {
  return apply(structToApply, struct) as Struct<T, U>;
}

export type Struct<ToMix = {}, Final = {}> = Final extends new (
  ..._args: never[]
) => infer F
  ? ToMix extends new (
      ..._args: never[]
    ) => infer TM
    ? new (
        ..._args: ConstructorParameters<Final>
      ) => F & TM
    : never
  : never;
