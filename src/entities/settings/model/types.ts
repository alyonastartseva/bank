export type Language = "RU" | "EN" | "DE" | "FR" | "JP";

export interface UserSettings {
  userId: number;
  notificationEnabled: boolean;
  language: Language;
  darkModeEnabled: boolean;
}

export interface UpdateUserSettings {
  notificationEnabled: boolean;
  language: Language;
  darkModeEnabled: boolean;
}
