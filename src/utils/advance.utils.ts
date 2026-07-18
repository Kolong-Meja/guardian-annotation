import type { Mixed } from "../types/value.type.ts";

/**
 * Counts how many digits follow the decimal point in `value`.
 *
 * Used to tell whole numbers apart from fractional ones (e.g. for the
 * {@link Integer} vs {@link Float} opaque types) without string parsing.
 */
export function getPrecisions(value: number): number {
  if (!isFinite(value)) return 0;

  let e = 1;
  let p = 0;

  while (Math.round(value * e) / e !== value) {
    e *= 10;
    p++;
  }

  return p;
}

/** Returns `true` if `subjects` contains any duplicate values. */
export function itHasDuplicates<S extends Array<Mixed>>(subjects: S): boolean {
  return new Set(subjects).size !== subjects.length;
}
