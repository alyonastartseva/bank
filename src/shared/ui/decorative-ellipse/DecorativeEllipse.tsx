import styles from "./DecorativeEllipse.module.css";

type Props = {
  round?: boolean;
};

export const DecorativeEllipse = ({ round }: Props) => {
  return <div className={`${styles.ellipse} ${round ? styles.round : ""}`} />;
};
