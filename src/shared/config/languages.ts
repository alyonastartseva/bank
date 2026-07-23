export const SUPPORTED_LANGUAGES = ["en", "ru", "de", "jp", "fr"] as const;
export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];
export const LANGUAGE_FLAGS: Record<LanguageCode, string> = {
  en: "https://flagcdn.com/w160/us.png",
  ru: "https://flagcdn.com/w160/ru.png",
  de: "https://flagcdn.com/w160/de.png",
  jp: "https://flagcdn.com/w160/jp.png",
  fr: "https://flagcdn.com/w160/fr.png",
};
