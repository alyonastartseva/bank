import type { ReactElement } from "react";

export default interface IMenuItem {
  icon: ReactElement;
  primary: string;
  secondary: string;
  onClick: () => void;
}
