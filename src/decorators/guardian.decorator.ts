import * as Validator from "../validators/guardian.validator.ts";
import { toTitleCase } from "../utils/string.util.ts";
import {
  NullValueError,
  UndefinedValueError,
  ValueError,
  ValueLengthError,
  ValueNotMatchError,
} from "../errors/value.error.ts";
import {
  NotValidEmailError,
  NotValidNameError,
  NotValidPhoneNumberError,
  NotValidURLError,
  TypeNotMatchError,
} from "../errors/valid.error.ts";
import type { FieldDecoratorFn } from "../types/decorator.type.ts";
import type {
  EmailOptions,
  MatchesOptions,
  MaxOptions,
  MinOptions,
  NameOptions,
  PhoneNumberOptions,
  RangeOptions,
  StringValueOptions,
  URLOptions,
} from "../types/props.type.ts";
import type { Mixed } from "../types/value.type.ts";

/**
 * Class-field decorators built on top of `guardian.validator.ts`.
 *
 * Every decorator here throws a specific Guardian error (see
 * `src/errors/`) the moment an invalid value is assigned — it never
 * terminates the process itself, so the host application decides how to
 * handle (or recover from) a failed validation.
 *
 * @module
 */

/** Throws {@link UndefinedValueError} if `value` is `undefined`. */
function assertDefined(value: Mixed, propertyName: string): void {
  if (Validator.isUndefined(value)) {
    throw new UndefinedValueError(`"${propertyName}" must not be undefined.`);
  }
}

// ---------------------------------------------------------------------------
// Primitive type guards
// ---------------------------------------------------------------------------

export function IsString<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isString(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a string, but received ${typeof value}.`,
        );
      }
      return value;
    };
  };
}

export function IsNumber<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isNumber(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a number, but received ${typeof value}.`,
        );
      }
      return value;
    };
  };
}

export function IsArray<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isArray(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be an array, but received ${typeof value}.`,
        );
      }
      return value;
    };
  };
}

export function IsBoolean<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isBoolean(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a boolean, but received ${typeof value}.`,
        );
      }
      return value;
    };
  };
}

export function IsDate<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isDate(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a Date, but received ${typeof value}.`,
        );
      }
      return value;
    };
  };
}

export function IsSymbol<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isSymbol(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a symbol, but received ${typeof value}.`,
        );
      }
      return value;
    };
  };
}

export function IsBigInt<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isBigInt(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a bigint, but received ${typeof value}.`,
        );
      }
      return value;
    };
  };
}

// ---------------------------------------------------------------------------
// Opaque numeric types (see src/generators/opaque-type.generator.ts)
// ---------------------------------------------------------------------------

export function IsInteger<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isInteger(value)) {
        throw new TypeNotMatchError(`"${propertyName}" must be an Integer.`);
      }
      return value;
    };
  };
}

export function IsUInteger<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isUInteger(value)) {
        throw new TypeNotMatchError(`"${propertyName}" must be a UInteger.`);
      }
      return value;
    };
  };
}

export function IsLong<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isLong(value)) {
        throw new TypeNotMatchError(`"${propertyName}" must be a Long.`);
      }
      return value;
    };
  };
}

export function IsULong<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isULong(value)) {
        throw new TypeNotMatchError(`"${propertyName}" must be a ULong.`);
      }
      return value;
    };
  };
}

export function IsFloat<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isFloat(value)) {
        throw new TypeNotMatchError(`"${propertyName}" must be a Float.`);
      }
      return value;
    };
  };
}

export function IsDecimal<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isDecimal(value)) {
        throw new TypeNotMatchError(`"${propertyName}" must be a Decimal.`);
      }
      return value;
    };
  };
}

// ---------------------------------------------------------------------------
// Number sign / string content
// ---------------------------------------------------------------------------

export function IsPositive<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isPositive(value)) {
        throw new ValueError(`"${propertyName}" must be a positive number.`);
      }
      return value;
    };
  };
}

export function IsNegative<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isNegative(value)) {
        throw new ValueError(`"${propertyName}" must be a negative number.`);
      }
      return value;
    };
  };
}

export function IsAlpha<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isAlpha(value)) {
        throw new ValueNotMatchError(
          `"${propertyName}" must contain only alphabetic characters.`,
        );
      }
      return value;
    };
  };
}

export function IsAlphaNumeric<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isAlphaNumeric(value)) {
        throw new ValueNotMatchError(
          `"${propertyName}" must contain only alphanumeric characters.`,
        );
      }
      return value;
    };
  };
}

// ---------------------------------------------------------------------------
// Nullability
// ---------------------------------------------------------------------------

export function NotNull<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (Validator.isNull(value)) {
        throw new NullValueError(`"${propertyName}" must not be null.`);
      }
      return value;
    };
  };
}

export function NotEmpty<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (Validator.isNull(value)) {
        throw new NullValueError(`"${propertyName}" must not be null.`);
      }
      if (Validator.isEmpty(value)) {
        throw new ValueLengthError(`"${propertyName}" must not be empty.`);
      }
      return value;
    };
  };
}

export function NotBlank<T>(): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isString(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a string, but received ${typeof value}.`,
        );
      }
      if (Validator.isEmpty(value) || Validator.isBlank(value)) {
        throw new ValueLengthError(
          `"${propertyName}" must not be empty or made up of only whitespace.`,
        );
      }
      return value;
    };
  };
}

// ---------------------------------------------------------------------------
// Format validators
// ---------------------------------------------------------------------------

export function Name<T>(options?: NameOptions): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isString(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a string, but received ${typeof value}.`,
        );
      }

      let nameRegex = /^[a-zA-Z\s,.'\-\p{Letter}]+$/u;
      if (options?.allowTitles) {
        nameRegex = /^[\p{Letter}\s\-.']+$/u;
      }
      if (options?.regex) {
        nameRegex = options.regex;
      }

      if (!value.toLocaleLowerCase("en-US").match(nameRegex)) {
        throw new NotValidNameError(
          options?.message ??
            `"${propertyName}" value "${value}" is not a valid name.`,
        );
      }
      return value;
    };
  };
}

export function Email<T>(options?: EmailOptions): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isString(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a string, but received ${typeof value}.`,
        );
      }

      const emailRegex =
        options?.regex ?? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (options?.domainBlackList !== undefined) {
        const [, domain] = value.split("@");
        if (domain !== undefined && options.domainBlackList.includes(domain)) {
          throw new NotValidEmailError(
            `"${value}" email domain is on the blacklist.`,
          );
        }
      }

      if (!value.toLocaleLowerCase("en-US").match(emailRegex)) {
        throw new NotValidEmailError(
          options?.message ??
            `"${propertyName}" value "${value}" is not a valid email.`,
        );
      }
      return value;
    };
  };
}

export function PhoneNumber<T>(
  options?: PhoneNumberOptions,
): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isString(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a string, but received ${typeof value}.`,
        );
      }

      const phoneNumberRegex =
        options?.regex ??
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

      if (!value.toLocaleLowerCase().match(phoneNumberRegex)) {
        throw new NotValidPhoneNumberError(
          options?.message ??
            `"${propertyName}" value "${value}" is not a phone number.`,
        );
      }
      return value;
    };
  };
}

export function URL<T>(options?: URLOptions): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isString(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a string, but received ${typeof value}.`,
        );
      }

      const urlRegex =
        options?.regex ??
        /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;

      if (!value.toLocaleLowerCase().match(urlRegex)) {
        throw new NotValidURLError(
          options?.message ??
            `"${propertyName}" value "${value}" is not a valid URL.`,
        );
      }
      return value;
    };
  };
}

// ---------------------------------------------------------------------------
// Length / pattern
// ---------------------------------------------------------------------------

function measureLength(value: string, options?: StringValueOptions): number {
  let measured = value;
  if (options?.trim) {
    measured = measured.trim();
  }
  if (options?.ignoreWhitespace) {
    measured = measured.replace(/\s/g, "");
  }
  return measured.length;
}

export function MinLength<T>(
  minLength: number,
  options?: StringValueOptions,
): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isString(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a string, but received ${typeof value}.`,
        );
      }

      const length = measureLength(value, options);
      if (length < minLength) {
        throw new ValueLengthError(
          options?.message ??
            `Length of "${propertyName}" (${length}) is below the minimum length (${minLength}).`,
        );
      }
      return value;
    };
  };
}

export function MaxLength<T>(
  maxLength: number,
  options?: StringValueOptions,
): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isString(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a string, but received ${typeof value}.`,
        );
      }

      const length = measureLength(value, options);
      if (length > maxLength) {
        throw new ValueLengthError(
          options?.message ??
            `Length of "${propertyName}" (${length}) exceeds the maximum length (${maxLength}).`,
        );
      }
      return value;
    };
  };
}

export function Matches<T>(
  regex: RegExp,
  options?: MatchesOptions,
): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isString(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a string, but received ${typeof value}.`,
        );
      }

      if (!value.match(regex)) {
        throw new ValueNotMatchError(
          options?.message ?? `"${propertyName}" does not match ${regex}.`,
        );
      }
      return value;
    };
  };
}

// ---------------------------------------------------------------------------
// Case transforms — these MODIFY the value, they don't just validate it
// ---------------------------------------------------------------------------

function prepareForCasing(
  value: Mixed,
  options: StringValueOptions | undefined,
  propertyName: string,
): string {
  assertDefined(value, propertyName);
  if (!Validator.isString(value)) {
    throw new TypeNotMatchError(
      `"${propertyName}" must be a string, but received ${typeof value}.`,
    );
  }

  let prepared = value;
  if (options?.trim) {
    prepared = prepared.trim();
  }
  if (options?.ignoreWhitespace) {
    prepared = prepared.replace(/\s/g, "");
  }
  return prepared;
}

export function LowerCase<T>(
  locale: string,
  options?: StringValueOptions,
): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      return prepareForCasing(value, options, propertyName).toLocaleLowerCase(
        locale,
      ) as typeof value;
    };
  };
}

export function UpperCase<T>(
  locale: string,
  options?: StringValueOptions,
): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      return prepareForCasing(value, options, propertyName).toLocaleUpperCase(
        locale,
      ) as typeof value;
    };
  };
}

export function TitleCase<T>(
  locale: string,
  options?: StringValueOptions,
): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      return toTitleCase(
        prepareForCasing(value, options, propertyName),
        locale,
      ) as typeof value;
    };
  };
}

// ---------------------------------------------------------------------------
// Numeric range
// ---------------------------------------------------------------------------

export function Min<T>(
  minValue: number,
  options?: MinOptions,
): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isNumber(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a number, but received ${typeof value}.`,
        );
      }
      if (value < minValue) {
        throw new ValueError(
          options?.message ??
            `"${propertyName}" value (${value}) is below the minimum value (${minValue}).`,
        );
      }
      return value;
    };
  };
}

export function Max<T>(
  maxValue: number,
  options?: MaxOptions,
): FieldDecoratorFn<T> {
  return function (_target, context) {
    const propertyName = String(context.name);
    return function (value) {
      assertDefined(value, propertyName);
      if (!Validator.isNumber(value)) {
        throw new TypeNotMatchError(
          `"${propertyName}" must be a number, but received ${typeof value}.`,
        );
      }
      if (value > maxValue) {
        throw new ValueError(
          options?.message ??
            `"${propertyName}" value (${value}) exceeds the maximum value (${maxValue}).`,
        );
      }
      return value;
    };
  };
}

// ---------------------------------------------------------------------------
// Not yet implemented — fail loudly and immediately (at class-definition
// time, before any instance is ever created) rather than silently
// no-op'ing or throwing a generic error deep inside a setter.
// ---------------------------------------------------------------------------

function notImplemented(decoratorName: string): never {
  throw new Error(
    `Guardian: the "${decoratorName}" decorator is not implemented yet.`,
  );
}

export function Range<T>(
  _initial: number,
  _end: number,
  _options?: RangeOptions,
): FieldDecoratorFn<T> {
  return notImplemented("Range");
}

export function ArrayMinSize<T>(_minSize: number): FieldDecoratorFn<T> {
  return notImplemented("ArrayMinSize");
}

export function ArrayMaxSize<T>(_maxSize: number): FieldDecoratorFn<T> {
  return notImplemented("ArrayMaxSize");
}

export function ArrayUnique<T>(): FieldDecoratorFn<T> {
  return notImplemented("ArrayUnique");
}

export function EachElement<T>(): FieldDecoratorFn<T> {
  return notImplemented("EachElement");
}
