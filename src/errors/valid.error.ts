import { GuardianError } from "./guardian.error.ts";

/** Thrown when a value does not match the expected runtime type. */
export class TypeNotMatchError extends GuardianError {}

/** Thrown when a string fails email-format validation. */
export class NotValidEmailError extends GuardianError {}

/** Thrown when a string fails URL-format validation. */
export class NotValidURLError extends GuardianError {}

/** Thrown when a string fails name-format validation. */
export class NotValidNameError extends GuardianError {}

/** Thrown when a string fails phone-number-format validation. */
export class NotValidPhoneNumberError extends GuardianError {}
