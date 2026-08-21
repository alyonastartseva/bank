import { useTranslation } from "react-i18next";
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_FLAGS,
  type LanguageCode,
} from "@/shared/config/languages";
import type { LangItem } from "../model/types";
export const useChangeLanguage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language).split(
    "-"
  )[0] as LanguageCode;
  const languages: LangItem[] = SUPPORTED_LANGUAGES.map((code) => ({
    id: code,
    label: t(`language.${code}`),
    flagUrl: LANGUAGE_FLAGS[code],
  }));
  const currentLanguageLabel = t(`language.${currentLanguage}`);
  const changeLanguage = (langId: LanguageCode) => {
    i18n.changeLanguage(langId);
  };
  return {
    languages,
    currentLanguage,
    currentLanguageLabel,
    changeLanguage,
  };
};
