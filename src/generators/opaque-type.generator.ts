import { TypeNotMatchError } from "../errors/valid.error.ts";
import { ValueError } from "../errors/value.error.ts";
import type { Floating, Numeric } from "../types/value.type.ts";
import { getPrecisions } from "../utils/advance.utils.ts";

abstract class OpaqueNumeric<
  T extends string,
  U extends boolean,
  V extends number | bigint,
> {
  abstract readonly __type: T;
  abstract readonly __unsigned: U;
  abstract readonly __bitWidth: number;
  abstract readonly __minValue: number | bigint;
  abstract readonly __maxValue: number | bigint;
  abstract readonly __bitLength: number;

  constructor(public readonly value: V) {}

  toString(): string {
    return String(this.value);
  }

  valueOf(): V {
    return this.value;
  }
}

abstract class OpaqueFloating<
  T extends string,
  P extends number,
  V extends number,
> {
  abstract readonly __type: T;
  abstract readonly __precision: P;
  abstract readonly __bitWidth: number;
  abstract readonly __bitLength: number;

  constructor(public readonly value: V) {}

  toString(): string {
    return String(this.value);
  }

  valueOf(): V {
    return this.value;
  }
}

/** Throws a {@link ValueError} unless `min <= value <= max`. */
function assertInRange(
  value: number | bigint,
  min: number | bigint,
  max: number | bigint,
  typeName: string,
): void {
  if (value < min) {
    throw new ValueError(
      `Value (${value}) is below the minimum allowed ${typeName} value (${min}).`,
    );
  }

  if (value > max) {
    throw new ValueError(
      `Value (${value}) exceeds the maximum allowed ${typeName} value (${max}).`,
    );
  }
}

/** Throws a {@link TypeNotMatchError} unless `value` has no fractional part. */
function assertWholeNumber(value: number, typeName: string): void {
  if (getPrecisions(value) > 0) {
    throw new TypeNotMatchError(
      `Value must be a whole ${typeName} and must not have a fractional part.`,
    );
  }
}

/**
 * Throws a {@link TypeNotMatchError} unless `value` has between 1 and
 * `maxPrecision` digits after the decimal point.
 */
function assertPrecisionWithin(
  value: number,
  maxPrecision: number,
  typeName: string,
): void {
  const precisions = getPrecisions(value);

  if (precisions < 1) {
    throw new TypeNotMatchError(
      `Value must be a ${typeName} and have at least one decimal digit.`,
    );
  }

  if (precisions > maxPrecision) {
    throw new TypeNotMatchError(
      `Value must be a ${typeName} and have at most ${maxPrecision} decimal digits.`,
    );
  }
}

/** A validated, wrapped 32-bit signed integer. */
export class Integer extends OpaqueNumeric<"integer", false, number>
  implements Numeric<"integer", false> {
  override readonly __type = "integer";
  override readonly __unsigned = false;
  override readonly __bitWidth = 32;
  override readonly __minValue = -(2 ** 31);
  override readonly __maxValue = 2 ** 31 - 1;
  override readonly __bitLength = 4;

  constructor(value: number) {
    super(value);
    assertWholeNumber(value, this.__type);
    assertInRange(value, this.__minValue, this.__maxValue, this.__type);
  }

  static of(value: number): Integer {
    return new Integer(value);
  }
}

/** A validated, wrapped 32-bit unsigned integer. */
export class UInteger extends OpaqueNumeric<"unsigned integer", true, number>
  implements Numeric<"unsigned integer", true> {
  override readonly __type = "unsigned integer";
  override readonly __unsigned = true;
  override readonly __bitWidth = 32;
  override readonly __minValue = 0;
  override readonly __maxValue = 2 ** 32 - 1;
  override readonly __bitLength = 4;

  constructor(value: number) {
    super(value);
    assertWholeNumber(value, this.__type);
    assertInRange(value, this.__minValue, this.__maxValue, this.__type);
  }

  static of(value: number): UInteger {
    return new UInteger(value);
  }
}

/** A validated, wrapped 64-bit signed integer. */
export class Long extends OpaqueNumeric<"long", false, bigint>
  implements Numeric<"long", false> {
  override readonly __type = "long";
  override readonly __unsigned = false;
  override readonly __bitWidth = 64;
  override readonly __minValue = -(2n ** 63n);
  override readonly __maxValue = 2n ** 63n - 1n;
  override readonly __bitLength = 8;

  constructor(value: bigint) {
    super(value);
    assertInRange(value, this.__minValue, this.__maxValue, this.__type);
  }

  static of(value: bigint): Long {
    return new Long(value);
  }
}

/** A validated, wrapped 64-bit unsigned integer. */
export class ULong extends OpaqueNumeric<"unsigned long", true, bigint>
  implements Numeric<"unsigned long", true> {
  override readonly __type = "unsigned long";
  override readonly __unsigned = true;
  override readonly __bitWidth = 64;
  override readonly __minValue = 0n;
  override readonly __maxValue = 2n ** 64n - 1n;
  override readonly __bitLength = 8;

  constructor(value: bigint) {
    super(value);
    assertInRange(value, this.__minValue, this.__maxValue, this.__type);
  }

  static of(value: bigint): ULong {
    return new ULong(value);
  }
}

/** A validated, wrapped 32-bit float (up to 7 significant decimal digits). */
export class Float extends OpaqueFloating<"float", 7, number>
  implements Floating<"float", 7> {
  override readonly __type = "float";
  override readonly __precision = 7;
  override readonly __bitWidth = 32;
  override readonly __bitLength = 4;

  constructor(value: number) {
    super(value);
    assertPrecisionWithin(value, this.__precision, this.__type);
  }

  static of(value: number): Float {
    return new Float(value);
  }
}

/** A validated, wrapped 64-bit float (up to 15 significant decimal digits). */
export class Decimal extends OpaqueFloating<"decimal", 15, number>
  implements Floating<"decimal", 15> {
  override readonly __type = "decimal";
  override readonly __precision = 15;
  override readonly __bitWidth = 64;
  override readonly __bitLength = 8;

  constructor(value: number) {
    super(value);
    assertPrecisionWithin(value, this.__precision, this.__type);
  }

  static of(value: number): Decimal {
    return new Decimal(value);
  }
}
