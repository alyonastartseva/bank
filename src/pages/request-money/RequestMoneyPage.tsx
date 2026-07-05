import { useTranslation } from "react-i18next";
import styles from "./RequestMoneyPage.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useGetUserQuery } from "@/entities/user/api/user-api";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const mockUser = {
  fullName: "Tanya Myronuk",
  email: "Tanya Myronuk@gmail.com",
  monthlyDueBy: ["28", "September", "2000"],
  joinedDate: "28 Jan 2021",
  description: "Tanya Myronuk",
  amount: "26.00.00",
};

const RequestMoneyPage = () => {
  const { t } = useTranslation();

  const { data: user } = useGetUserQuery(1);

  const [amount, setAmount] = useState(mockUser.amount);

  const handleSendMoney = () => {
    console.log("Отправка запроса:", {
      amount,
      payer: user?.fullName || mockUser.fullName,
      email: user?.email || mockUser.email,
      description: mockUser.description,
      monthlyDueBy: mockUser.monthlyDueBy.join(" "),
    });
  };

  return (
    <div className={styles.RequestMoneyPage}>
      <div className={styles.form}>
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>{t("requestMoney.payerName")}</span>
          <div className={styles.field}>
            <AccountCircleOutlinedIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>
              {user?.fullName || mockUser.fullName}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>{t("requestMoney.emailAddress")}</span>
          <div className={styles.field}>
            <EmailOutlinedIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>{user?.email || mockUser.email}</span>
          </div>
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>{t("requestMoney.description")}</span>
          <div className={styles.field}>
            <AccountCircleOutlinedIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>{mockUser.description}</span>
          </div>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <span className={styles.fieldLabel}>{t("requestMoney.monthlyDueBy")}</span>
        <div className={`${styles.field} ${styles.fieldDate}`}>
          <span className={styles.datePart}>{mockUser.monthlyDueBy[0]}</span>
          <span className={styles.dateSpacer}> </span>
          <span className={styles.datePart}>{mockUser.monthlyDueBy[1]}</span>
          <span className={styles.dateSpacer}> </span>
          <span className={styles.datePart}>{mockUser.monthlyDueBy[2]}</span>
        </div>
      </div>

      <Box className={styles.amountCard}>
        <div className={styles.amountHeader}>
          <span className={styles.amountLabel}>{t("requestMoney.enterAmount")}</span>
          <button className={styles.changeCurrency}>
            {t("requestMoney.changeCurrency")}
          </button>
        </div>
        <div className={styles.amountRow}>
          <span className={styles.currencySymbol}>USD</span>
          <input
            type="text"
            className={styles.amountValue}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </Box>

      <Button className={styles.sendButton} onClick={handleSendMoney}>
        {t("requestMoney.sendMoney")}
      </Button>
    </div>
  );
};

export default RequestMoneyPage;
