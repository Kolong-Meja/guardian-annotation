import { assertEquals } from "@std/assert";
import * as Validator from "../../src/validators/guardian.validator.ts";

Deno.test("isString distinguishes strings from other types", () => {
  assertEquals(Validator.isString("hello"), true);
  assertEquals(Validator.isString(42), false);
});

Deno.test("isUndefined only matches undefined", () => {
  assertEquals(Validator.isUndefined(undefined), true);
  assertEquals(Validator.isUndefined(null), false);
  assertEquals(Validator.isUndefined(0), false);
});

Deno.test("isEmpty covers strings, arrays, and plain objects", () => {
  assertEquals(Validator.isEmpty(""), true);
  assertEquals(Validator.isEmpty([]), true);
  assertEquals(Validator.isEmpty({}), true);
  assertEquals(Validator.isEmpty("a"), false);
  assertEquals(Validator.isEmpty([1]), false);
  assertEquals(Validator.isEmpty({ a: 1 }), false);
});

Deno.test("isBlank matches empty and whitespace-only strings (regression: old check was `value === '' && value.indexOf(' ') >= 0`, which is never true)", () => {
  assertEquals(Validator.isBlank(""), true);
  assertEquals(Validator.isBlank("   "), true);
  assertEquals(Validator.isBlank("\t\n"), true);
  assertEquals(Validator.isBlank("hi"), false);
  assertEquals(Validator.isBlank(42), false);
});

Deno.test("isPositive / isNegative", () => {
  assertEquals(Validator.isPositive(5), true);
  assertEquals(Validator.isPositive(-5), false);
  assertEquals(Validator.isNegative(-5), true);
  assertEquals(Validator.isNegative(5), false);
});

Deno.test("isAlpha / isAlphaNumeric", () => {
  assertEquals(Validator.isAlpha("hello"), true);
  assertEquals(Validator.isAlpha("hello123"), false);
  assertEquals(Validator.isAlphaNumeric("hello123"), true);
  assertEquals(Validator.isAlphaNumeric("hello 123"), false);
});
