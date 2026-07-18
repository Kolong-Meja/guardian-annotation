# Guardian

A lightweight, **dependency-free** runtime validation toolkit for
TypeScript on Deno: type-guard functions, TC39 class-field decorators, and
validated opaque numeric types (`Integer`, `Long`, `Float`, `Decimal`, ...).

## Install

```bash
deno add jsr:@yourscope/guardian
```

```ts
import { Email, IsString, Min } from "@yourscope/guardian";
```

Also installable from npm-based projects via `npx jsr add @yourscope/guardian`.

## Usage

### Type guards

```ts
import * as Validator from "@yourscope/guardian";

if (Validator.isString(input)) {
  // input is narrowed to `string` here
  console.log(input.toUpperCase());
}
```

### Class-field decorators

```ts
import { Email, IsString, Min, MinLength } from "@yourscope/guardian";

class SignupForm {
  @IsString() @MinLength(2) name: string = "";
  @Email() email: string = "";
  @Min(18) age: number = 0;
}

try {
  new SignupForm(); // throws — the fields above still hold their defaults
} catch (err) {
  // every Guardian error extends `GuardianError`
  console.error(err.name, err.message);
}
```

Decorators throw a specific error from `src/errors/` the moment an
invalid value is assigned — they never terminate the process themselves,
so your application decides how to recover.

> **Note:** the `URL` decorator shares its name with the global `URL`
> class. If you need both in the same file, alias one on import:
> `import { URL as IsURL } from "@yourscope/guardian";`

### Opaque numeric types

```ts
import { Integer, Long } from "@yourscope/guardian";

const port = Integer.of(8080); // throws ValueError outside [-2^31, 2^31-1]
const id = Long.of(9_223_372_036_854_775_807n);
```

## Error hierarchy

Every error Guardian throws extends `GuardianError` (itself an `Error`
subclass), so you can catch broadly or narrowly:

```
GuardianError
├─ ValueError              (numeric value out of range)
├─ ValueLengthError        (string/array/object length out of range)
├─ ValueNotMatchError      (pattern mismatch)
├─ NullValueError
├─ UndefinedValueError
├─ TypeNotMatchError
├─ NotValidEmailError
├─ NotValidURLError
├─ NotValidNameError
└─ NotValidPhoneNumberError
```

## Development

```bash
deno task test          # run tests
deno task check         # typecheck the public API
deno task lint           # lint
deno task format         # format
deno task publish:dry    # dry-run the JSR publish
```

## Publishing to JSR

1. Create a scope at [jsr.io](https://jsr.io) and replace `yourscope` in
   `deno.json`'s `name` field with your real scope.
2. `deno task publish:dry` to confirm the package passes JSR's checks
   locally.
3. Either run `deno publish` from your machine (interactive OIDC login),
   or push to `main` and let `.github/workflows/publish.yml` publish
   automatically via GitHub Actions OIDC — no token to manage.

## License

GPL-3.0-only — see `LICENSE`.
