import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { cardMock } from '../card/cardMock';
import TransactionItem from "../../shared/ui/transactionItem/TransactionItem";
import { useGetTransactionsQuery } from "@/entities/transaction/api/transaction.api";
import { mapTransaction } from "@/entities/transaction/lib/mapTransaction";
import { useTranslation } from "react-i18next";
import { transactions, } from "@/entities/transaction";
import styles from "./TransactionLatest.module.css";

const TRANSACTION_LIMIT = 5;

export const TransactionLatest = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
    // const { data, isLoading, isError, error } =
    // useGetTransactionsQuery({ page: 0, size: TRANSACTION_LIMIT });
    const { t } = useTranslation();
    //const transactions = data?.content.map(mapTransaction);

    //if (isLoading) {
    //return <Typography className={styles.notification}>{t("transactionLatest.loading")}</Typography>
    //}

    //if (!transactions?.length) {
    //return (
    // <Typography className={styles.notification}>{t("transactionLatest.empty")}</Typography>
    // )
    //}

    //if (isError) {
    //return <Typography className={styles.notification}>{t("transactionLatest.errorMessage")}</Typography>
    // } 


    const data = transactions.slice(0, TRANSACTION_LIMIT); // получаем данные через мок

    return (
        <Box component="section" className={styles.container}>
            <Box component="div" className={styles.titleContainer}>
                <Typography className={styles.title}>{t("transactionLatest.title")}</Typography>
                <Button>{t("transactionLatest.seeAll")}</Button>
            </Box>
            <Box className={styles.transitionsContainer}>

                {data?.map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        icon={transaction.icon}
                        name={transaction.name}
                        category={transaction.category}
                        //price={transaction.price}
                        price={transaction.amount}
                    />
                ))}
            </Box>
        </Box>
    );
};
