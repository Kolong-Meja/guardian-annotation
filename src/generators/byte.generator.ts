import { Integer, Long } from "./opaque-type.generator.ts";

const INT32_BYTE_LENGTH = 4;
const INT64_BYTE_LENGTH = 8;

/** Encodes a 32-bit integer into 4 little-endian bytes. */
export function int32ToBytes(value: number): number[] {
  const view = new DataView(new ArrayBuffer(INT32_BYTE_LENGTH));
  view.setInt32(0, value, true);
  return Array.from({ length: INT32_BYTE_LENGTH }, (_, i) => view.getUint8(i));
}

/** Encodes a 64-bit integer into 8 little-endian bytes. */
export function int64ToBytes(value: bigint): number[] {
  const view = new DataView(new ArrayBuffer(INT64_BYTE_LENGTH));
  view.setBigInt64(0, value, true);
  return Array.from({ length: INT64_BYTE_LENGTH }, (_, i) => view.getUint8(i));
}

/** Decodes 4 little-endian bytes back into a validated {@link Integer}. */
export function bytesToInt32(bytes: number[]): Integer {
  const view = new DataView(new Uint8Array(bytes).buffer);
  return new Integer(view.getInt32(0, true));
}

/** Decodes 8 little-endian bytes back into a validated {@link Long}. */
export function bytesToInt64(bytes: number[]): Long {
  const view = new DataView(new Uint8Array(bytes).buffer);
  return new Long(view.getBigInt64(0, true));
}
