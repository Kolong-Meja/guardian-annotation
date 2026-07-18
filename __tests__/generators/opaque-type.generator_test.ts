import { assertEquals, assertThrows } from "@std/assert";
import {
  Decimal,
  Float,
  Integer,
  Long,
  UInteger,
  ULong,
} from "../../src/generators/opaque-type.generator.ts";
import { TypeNotMatchError } from "../../src/errors/valid.error.ts";
import { ValueError } from "../../src/errors/value.error.ts";

Deno.test("Integer accepts its exact 32-bit signed bounds and rejects one past them (regression: max bound used to be off by one)", () => {
  assertEquals(Integer.of(2 ** 31 - 1).valueOf(), 2 ** 31 - 1);
  assertEquals(Integer.of(-(2 ** 31)).valueOf(), -(2 ** 31));
  assertThrows(() => Integer.of(2 ** 31), ValueError);
});

Deno.test("Integer rejects non-whole numbers", () => {
  assertThrows(() => Integer.of(1.5), TypeNotMatchError);
});

Deno.test("UInteger rejects negative values and one past its max bound", () => {
  assertThrows(() => UInteger.of(-1), ValueError);
  assertEquals(UInteger.of(2 ** 32 - 1).valueOf(), 2 ** 32 - 1);
  assertThrows(() => UInteger.of(2 ** 32), ValueError);
});

Deno.test("Long accepts its exact 64-bit signed bounds precisely (regression: bounds were computed as JS `number`s, which lose precision above 2^53)", () => {
  const max = 2n ** 63n - 1n;
  const min = -(2n ** 63n);
  assertEquals(Long.of(max).valueOf(), max);
  assertEquals(Long.of(min).valueOf(), min);
  assertThrows(() => Long.of(max + 1n), ValueError);
  assertThrows(() => Long.of(min - 1n), ValueError);
});

Deno.test("ULong rejects negative values and enforces its 64-bit max bound", () => {
  assertThrows(() => ULong.of(-1n), ValueError);
  const max = 2n ** 64n - 1n;
  assertEquals(ULong.of(max).valueOf(), max);
  assertThrows(() => ULong.of(max + 1n), ValueError);
});

Deno.test("Float requires at least one and at most 7 decimal digits", () => {
  assertEquals(Float.of(1.5).valueOf(), 1.5);
  assertThrows(() => Float.of(1), TypeNotMatchError);
  assertThrows(() => Float.of(1.12345678), TypeNotMatchError);
});

Deno.test("Decimal allows up to 15 decimal digits", () => {
  assertEquals(Decimal.of(1.123456789012345).valueOf(), 1.123456789012345);
});
