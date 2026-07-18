/**
 * Base class for every error Guardian throws.
 *
 * Every specific error (`ValueError`, `TypeNotMatchError`, ...) used to
 * repeat the same four lines — call `super()`, set `this.name`, restore
 * the prototype chain — by hand. That boilerplate now lives here once,
 * using `new.target` so each subclass still gets its own correct
 * `.name` and `instanceof` behavior automatically.
 */
export class GuardianError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
