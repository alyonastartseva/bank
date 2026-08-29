import { Box, Typography } from "@mui/material";
import { cardMock } from '../card/cardMock';
import TransactionItem from '../../shared/ui/transactionItem/TransactionItem';
import { useGetTransactionsQuery } from "@/entities/transaction/api/transaction.api";
import { mapTransaction } from "@/entities/transaction/lib/mapTransaction";
import { useTranslation } from "react-i18next";
import { transactions, } from "@/entities/transaction";
import styles from './TransactionLatest.module.css'

const TRANSACTION_LIMIT = 5;

export const TransactionLatest = () => {

    //const { data, isLoading, isError, error } =
    // useGetTransactionsQuery({ page: 0, size: TRANSACTION_LIMIT });

    //const transactions = data?.content.map(mapTransaction);   

    //if(isLoading){
    //return <div>...Loading</div>
    ///}

    //if(isError){
    // return <div>Ошибка загрузки</div>
    //} !!!!!!!!!!КОД ДЛЯ ДАННЫХ С БЭКЕНДА!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const {t}= useTranslation();

    const data = transactions.slice(0, 5);//получаем данные через мок



    return (

        <Box component='section' className={styles.container}>
            <Typography>{t('Transactions List')}</Typography>
            {data?.map(transaction => (

                <TransactionItem key={transaction.id}
                    icon={transaction.icon}
                    name={transaction.name}
                    category={transaction.category}
                    price={transaction.amount} />


            ))}
        </Box>


    )

}

