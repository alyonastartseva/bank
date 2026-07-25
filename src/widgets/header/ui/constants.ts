import logoutIcon from "@/shared/icons/out.svg";
import searchIcon from "@/shared/icons/loupe.svg";
import bellIcon from "@/shared/icons/bell.svg";
import addIcon from "@/shared/icons/Add.svg";
import editUserIcon from "@/shared/icons/editUser.svg";
import historyIcon from "@/shared/icons/history.svg";
import closeIcon from "@/shared/icons/close.svg";

export const headerConfig: Record<
  string,
  { titleKey: string; rightIcon?: string; rightAction?: () => void }
> = {
  "/home": {
    titleKey: "home.title",
    rightIcon: searchIcon,
  },
  "/statistics": {
    titleKey: "statistics.title",
    rightIcon: bellIcon,
  },
  "/my-cards": {
    titleKey: "myCards.title",
    rightIcon: addIcon,
  },
  "/settings": {
    titleKey: "settings.title",
    rightIcon: logoutIcon,
  },
  "/transaction-history": {
    titleKey: "transactionHistory.title",
    rightIcon: historyIcon,
  },
  "/profile": {
    titleKey: "profile.title",
    rightIcon: editUserIcon,
  },
  "/edit-profile": {
    titleKey: "editProfile.title",
  },
  "/add-new-card": {
    titleKey: "addNewCard.title",
  },
  "/all-cards": {
    titleKey: "all-cards.title",
  },
  "/search": {
    titleKey: "search.title",
    rightIcon: closeIcon,
  },
  "/send-money": {
    titleKey: "sendMoney.title",
  },
  "/language": {
    titleKey: "language.title",
  },
  "/request-money": {
    titleKey: "requestMoney.title",
  },
  "/change-password": {
    titleKey: "changePassword.title",
  },
  "/terms": {
    titleKey: "terms.title",
  },
  "/accounts-management": {
    titleKey: "accountsManagement.title",
  },
  "/notifications": {
    titleKey: "notifications.title",
  },
};
