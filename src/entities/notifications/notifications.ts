import spotifyIcon from "@/shared/icons/spotify.svg";
import mastercardIcon from "@/shared/icons/mastercard.svg";
import recieveIcon from "@/shared/icons/receive.svg";
import sendIcon from "@/shared/icons/send.svg";
import warningIcon from "@/shared/icons/warning.svg";

import { type Notification } from "./types";

export const notifications: Notification[] = [
  {
    id: 1,
    title: "Платёж получен",
    description: "Вы получили $250.00 от Apple Store",
    time: "2 мин назад",
    isRead: true,
    icon: recieveIcon,
    date: "today",
  },
  {
    id: 2,
    title: "Перевод отправлен",
    description: "Вы отправили $120.00 в Spotify",
    time: "15 мин назад",
    isRead: true,
    icon: sendIcon,
    date: "today",
  },
  {
    id: 3,
    title: "Предупреждение безопасности",
    description: "Обнаружен новый вход из Chrome на macOS",
    time: "1 час назад",
    isRead: false,
    icon: warningIcon,
    date: "today",
  },
  {
    id: 4,
    title: "Оплата картой",
    description: "Оплата $45.99 в Netflix",
    time: "Вчера, 20:45",
    isRead: true,
    icon: mastercardIcon,
    date: "yesterday",
  },
  {
    id: 5,
    title: "Продление подписки",
    description: "Подписка Spotify Premium продлена",
    time: "Вчера, 18:30",
    isRead: false,
    icon: spotifyIcon,
    date: "yesterday",
  },
  {
    id: 6,
    title: "Депозит успешно зачислен",
    description: "Депозит $1,500.00 успешно завершён",
    time: "7 июня 2025",
    isRead: true,
    icon: recieveIcon,
    date: "thisWeek",
  },
  {
    id: 7,
    title: "Предупреждение о низком балансе",
    description: "Баланс вашего счёта ниже $100",
    time: "6 июня 2025",
    isRead: false,
    icon: warningIcon,
    date: "thisWeek",
  },
];
