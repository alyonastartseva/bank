import style from "./TransactionItem.module.css";
import { useTheme, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";

interface TransactionItemProps {
  icon: string;
  name: string;
  category: string;
  price: string;
}

const TransactionItem = ({ icon, name, category, price }: TransactionItemProps) => {
  const checkPrice = !price.includes("-");

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const location = useLocation();
  const showBorder = isDesktop && location.pathname === "/my-cards";

  return (
    <div className={`${style.transactionItem} ${showBorder ? style.desktop : ""}`}>
      <div className={style.leftSide}>
        <div className={style.icon}>
          <img src={icon} style={{ width: 14, height: 18 }} alt="icon" />
        </div>
        <div>
          <div className={style.name}>{name}</div>
          <div className={style.category}>{category}</div>
        </div>
      </div>
      <div className={checkPrice ? style.plusPrice : ""}>{price}</div>
    </div>
  );
};

export default TransactionItem;
