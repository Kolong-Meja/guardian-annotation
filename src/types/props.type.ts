type BaseOptions = {
  /** Overrides the default error message thrown on validation failure. */
  message?: string;
};

type RegexBaseOptions = BaseOptions & {
  /** Overrides the default pattern used to validate the value. */
  regex?: RegExp;
};

export type NameOptions = RegexBaseOptions & {
  /** Allow honorifics/titles (Dr., Mrs., ...) in the name. */
  allowTitles?: boolean;
};

export type EmailOptions = RegexBaseOptions & {
  /** Email domains that are rejected even if otherwise well-formed. */
  domainBlackList?: string[];
};

export type URLOptions = RegexBaseOptions & {
  /** Reserved for a future check restricting which protocols are valid. Not yet enforced. */
  allowedProtocols?: string[];
};

export type PhoneNumberOptions = RegexBaseOptions & {
  /** Reserved for future country-aware validation. Not yet enforced. */
  defaultCountry?: string;
};

export type MatchesOptions = BaseOptions;
export type MinOptions = BaseOptions;
export type MaxOptions = BaseOptions;
export type RangeOptions = BaseOptions;

export type StringValueOptions = BaseOptions & {
  /** Trim leading/trailing whitespace before measuring length. */
  trim?: boolean;
  /** Strip all whitespace before measuring length. */
  ignoreWhitespace?: boolean;
};
