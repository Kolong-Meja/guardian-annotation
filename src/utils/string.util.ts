/** Capitalizes the first letter of `s` and lowercases the rest. */
export const titleCase = <S extends string>(
  s: S,
  locale: string = "en-US",
) =>
  (s.charAt(0).toLocaleUpperCase(locale) +
    s.slice(1).toLocaleLowerCase(locale)) as Capitalize<typeof s>;

/** Applies {@link titleCase} to every space-separated word in `s`. */
export const toTitleCase = <S extends string>(
  s: S,
  locale: string = "en-US",
): string => {
  return s
    .split(" ")
    .map((a) => titleCase(a, locale))
    .join(" ");
};
