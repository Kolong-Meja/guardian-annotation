import { assertEquals } from "@std/assert";
import {
  bytesToInt32,
  bytesToInt64,
  int32ToBytes,
  int64ToBytes,
} from "../../src/generators/byte.generator.ts";

Deno.test("int32ToBytes produces exactly 4 bytes and round-trips", () => {
  const bytes = int32ToBytes(-123456);
  assertEquals(bytes.length, 4);
  assertEquals(bytesToInt32(bytes).valueOf(), -123456);
});

Deno.test("int64ToBytes produces exactly 8 bytes (regression: the encoding loop used to stop at 4, silently truncating every 64-bit value)", () => {
  const bytes = int64ToBytes(123456789012345n);
  assertEquals(bytes.length, 8);
});

Deno.test("int64ToBytes / bytesToInt64 round-trip a value that only fits in 64 bits", () => {
  const original = 9_223_372_036_854_775_807n; // max signed 64-bit value
  const bytes = int64ToBytes(original);
  assertEquals(bytesToInt64(bytes).valueOf(), original);
});
