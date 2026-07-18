import {
  Decimal,
  Float,
  Integer,
  Long,
  UInteger,
  ULong,
} from "../generators/opaque-type.generator.ts";
import type { Mixed } from "../types/value.type.ts";

/**
 * Runtime type guards used throughout Guardian's decorators.
 *
 * Each function doubles as a TypeScript type predicate (`value is X`)
 * rather than a plain `boolean`, so callers get real compile-time
 * narrowing too:
 *
 * ```ts
 * import * as Validator from "@yourscope/guardian";
 *
 * if (Validator.isString(input)) {
 *   input.toUpperCase(); // input is narrowed to `string` here
 * }
 * ```
 *
 * @module
 */

export function isString(value: Mixed): value is string {
  return typeof value === "string";
}

export function isNumber(value: Mixed): value is number {
  return typeof value === "number";
}

export function isArray(value: Mixed): value is unknown[] {
  return Array.isArray(value);
}

export function isBoolean(value: Mixed): value is boolean {
  return typeof value === "boolean";
}

export function isDate(value: Mixed): value is Date {
  return value instanceof Date;
}

export function isSymbol(value: Mixed): value is symbol {
  return typeof value === "symbol";
}

export function isBigInt(value: Mixed): value is bigint {
  return typeof value === "bigint";
}

export function isObject(value: Mixed): value is object {
  return typeof value === "object" && value !== null;
}

export function isInteger(value: Mixed): value is Integer {
  return value instanceof Integer;
}

export function isUInteger(value: Mixed): value is UInteger {
  return value instanceof UInteger;
}

export function isLong(value: Mixed): value is Long {
  return value instanceof Long;
}

export function isULong(value: Mixed): value is ULong {
  return value instanceof ULong;
}

export function isFloat(value: Mixed): value is Float {
  return value instanceof Float;
}

export function isDecimal(value: Mixed): value is Decimal {
  return value instanceof Decimal;
}

export function isPositive(value: Mixed): value is number {
  return typeof value === "number" && value > 0;
}

export function isNegative(value: Mixed): value is number {
  return typeof value === "number" && value < 0;
}

export function isAlpha(value: Mixed): value is string {
  return typeof value === "string" && /^[a-zA-Z]*$/.test(value);
}

export function isAlphaNumeric(value: Mixed): value is string {
  return typeof value === "string" && /^[a-z0-9]*$/i.test(value);
}

export function isNull(value: Mixed): value is null {
  return value === null;
}

export function isUndefined(value: Mixed): value is undefined {
  return value === undefined;
}

/** `true` for `null` or `undefined`. */
export function isOptional(value: Mixed): value is null | undefined {
  return value === null || value === undefined;
}

export function isEmpty(value: Mixed): boolean {
  return (
    (typeof value === "string" && value === "") ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0)
  );
}

/** `true` for an empty string, or a string made up of whitespace only. */
export function isBlank(value: Mixed): value is string {
  return typeof value === "string" && value.trim().length === 0;
}

export function isFunction(
  value: Mixed,
): value is (...args: unknown[]) => unknown {
  return typeof value === "function";
}
