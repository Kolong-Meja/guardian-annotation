import { GuardianError } from "./guardian.error.ts";

/** Thrown when a numeric value falls outside an allowed range. */
export class ValueError extends GuardianError {}

/** Thrown when a string/array/object length falls outside an allowed range. */
export class ValueLengthError extends GuardianError {}

/** Thrown when a value does not match an expected pattern. */
export class ValueNotMatchError extends GuardianError {}

/** Thrown when a value is `null` but must not be. */
export class NullValueError extends GuardianError {}

/** Thrown when a value is `undefined` but must be defined. */
export class UndefinedValueError extends GuardianError {}
