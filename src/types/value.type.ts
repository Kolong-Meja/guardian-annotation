import type {
  Decimal,
  Float,
  Integer,
  Long,
  UInteger,
  ULong,
} from "../generators/opaque-type.generator.ts";

export type Numeric<T extends string, U extends boolean> = {
  readonly __type: T;
  readonly __unsigned: U;
  readonly __bitWidth: number;
  readonly __minValue: number | bigint;
  readonly __maxValue: number | bigint;
  readonly __bitLength: number;
};

export type Floating<T extends string, P extends number> = {
  readonly __type: T;
  readonly __precision: P;
  readonly __bitWidth: number;
  readonly __bitLength: number;
};

/**
 * The union of every value type Guardian's validators and decorators can
 * evaluate.
 *
 * This deliberately does **not** include `any`. A union containing `any`
 * collapses to `any` as a whole, which silently disables type-checking
 * for every function that accepts `Mixed` — the exact opposite of what a
 * validation library should do.
 */
export type Mixed =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | object
  | undefined
  | null
  | Integer
  | UInteger
  | Long
  | ULong
  | Float
  | Decimal;
