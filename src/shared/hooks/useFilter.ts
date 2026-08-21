import { notifications } from "../../entities/notifications/notifications";

export const useFilter = () => {
  const today = notifications.filter((notification) => notification.date === "today");
  const yesterday = notifications.filter(
    (notification) => notification.date === "yesterday"
  );
  const thisWeek = notifications.filter(
    (notification) => notification.date === "thisWeek"
  );

  return { today, yesterday, thisWeek };
};
