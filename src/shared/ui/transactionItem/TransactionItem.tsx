import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import style from "./TransactionItem.module.css";

interface TransactionItemProps {
  icon: string;
  name: string;
  category: string;
  price: string;
  onClick?: () => void;
}

const TransactionItem = ({
  icon,
  name,
  category,
  price,
  onClick,
}: TransactionItemProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const location = useLocation();
  const showBorder = isDesktop && location.pathname === "/my-cards";

  return (
    <Box
      onClick={onClick}
      className={`${style.transactionItem} ${showBorder ? style.desktop : ""}`}
    >
      <Box className={style.leftSide}>
        <Box className={style.icon}>
          <Box
            className={`${style.icon}${style[category.toLowerCase()] || ""}`}
            component="img"
            src={icon}
            style={{ width: 14, height: 18 }}
            alt="icon"
          />
        </Box>
        <Box className={style.textWrap}>
          <Typography className={style.name}>
            {t(`transactionItem.name.${name}`, { defaultValue: name })}
          </Typography>
          <Typography className={style.category}>
            {t(`transactionItem.category.${category}`)}
          </Typography>
        </Box>
      </Box>
      <Box className={`${style.price} `}>{price}</Box>
    </Box>
  );
};

export default TransactionItem;
