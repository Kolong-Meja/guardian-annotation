/**
 * Guardian — a lightweight, dependency-free runtime validation toolkit
 * for TypeScript on Deno: type-guard functions, TC39 class-field
 * decorators, and validated opaque numeric types (`Integer`, `Long`,
 * `Float`, `Decimal`, ...).
 *
 * ```ts
 * import { IsString, Email, Min } from "@yourscope/guardian";
 *
 * class SignupForm {
 *   @IsString() @MinLength(2) name: string = "";
 *   @Email() email: string = "";
 *   @Min(18) age: number = 0;
 * }
 * ```
 *
 * @module
 */

export * from "./src/validators/guardian.validator.ts";
export * from "./src/decorators/guardian.decorator.ts";

export {
  Decimal,
  Float,
  Integer,
  Long,
  UInteger,
  ULong,
} from "./src/generators/opaque-type.generator.ts";

export {
  bytesToInt32,
  bytesToInt64,
  int32ToBytes,
  int64ToBytes,
} from "./src/generators/byte.generator.ts";

export { GuardianError } from "./src/errors/guardian.error.ts";

export {
  NullValueError,
  UndefinedValueError,
  ValueError,
  ValueLengthError,
  ValueNotMatchError,
} from "./src/errors/value.error.ts";

export {
  NotValidEmailError,
  NotValidNameError,
  NotValidPhoneNumberError,
  NotValidURLError,
  TypeNotMatchError,
} from "./src/errors/valid.error.ts";

export type { Floating, Mixed, Numeric } from "./src/types/value.type.ts";
export type { FieldDecoratorFn } from "./src/types/decorator.type.ts";
export type {
  EmailOptions,
  MatchesOptions,
  MaxOptions,
  MinOptions,
  NameOptions,
  PhoneNumberOptions,
  RangeOptions,
  StringValueOptions,
  URLOptions,
} from "./src/types/props.type.ts";
