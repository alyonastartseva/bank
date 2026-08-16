import type { CurrencyItem } from "@/entities/currency";

export const mockCurrencies: CurrencyItem[] = [
  {
    code: "USD",
    nameKey: "currencies.usd",
    flagUrl: "https://flagcdn.com/w160/us.png",
  },
  {
    code: "EUR",
    nameKey: "currencies.eur",
    flagUrl: "https://flagcdn.com/w160/eu.png",
  },
  {
    code: "GBP",
    nameKey: "currencies.gbp",
    flagUrl: "https://flagcdn.com/w160/gb.png",
  },
  {
    code: "CHF",
    nameKey: "currencies.chf",
    flagUrl: "https://flagcdn.com/w160/ch.png",
  },
  {
    code: "JPY",
    nameKey: "currencies.jpy",
    flagUrl: "https://flagcdn.com/w160/jp.png",
  },
  {
    code: "CNY",
    nameKey: "currencies.cny",
    flagUrl: "https://flagcdn.com/w160/cn.png",
  },
];

export const translationMap: Record<string, string> = {
  "selectCurrency.title": "Выберите валюту",
  "selectCurrency.searchPlaceholder": "Поиск валюты",
  "selectCurrency.done": "Готово",
  "currencies.usd": "Доллар США",
  "currencies.eur": "Евро",
  "currencies.gbp": "Фунт стерлингов",
  "currencies.chf": "Швейцарский франк",
  "currencies.jpy": "Японская иена",
  "currencies.cny": "Китайский юань",
};

export const mockT = (key: string) => translationMap[key] ?? key;
