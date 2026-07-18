import type { Mixed } from "./value.type.ts";

/**
 * The shape every Guardian class-field decorator factory returns, per the
 * TC39 Stage-3 decorators proposal that Deno/TypeScript implement natively.
 *
 * Generic over `V` (the *decorated field's own* declared type) so that,
 * for example, `@Min(0) amount: number = 0` keeps `amount` typed as
 * `number` instead of widening it to `Mixed`. `V extends Mixed` still
 * bounds it to something Guardian's validators know how to check.
 *
 * Declaring this once and reusing it (instead of letting TypeScript infer
 * a fresh nested function type per decorator) keeps every decorator's
 * public signature explicit — which is required for `deno publish` to
 * JSR without the `--allow-slow-types` escape hatch.
 */
export type FieldDecoratorFn<T> = <V extends Mixed>(
  target: undefined,
  context: ClassFieldDecoratorContext<T, V>,
) => (this: T, value: V) => V;
