import { useSearchParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import StatisticChart from "@/entities/statisticChart/StatisticChart";
import { useGetBalanceQuery } from "@/entities/account/api/account-api";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import React, { useEffect } from "react";
import TransactionTable from "@/widgets/transactionTable/TransactionTable.tsx";
import TransactionList from "@/widgets/transaction-list/TransactionList.tsx";

export default function StatisticsPage() {
  const [searchParams] = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 426px)");

  const accountId =
    searchParams.get("accountId") || localStorage.getItem("lastAccountId") || "";

  useEffect(() => {
    if (accountId) {
      localStorage.setItem("lastAccountId", accountId);
    }
  }, [accountId]);

  const {
    data: balance,
    isLoading,
    error,
    refetch,
  } = useGetBalanceQuery(accountId, {
    skip: !accountId,
    pollingInterval: 30000,
  });

  const balanceData = balance
    ? {
        currency: balance.currency,
        balance: balance.amount ?? balance.balance ?? 0, // Сначала проверяем amount, потом balance
      }
    : undefined;

  return (
    <Box className={layoutStyles.page}>
      <Box className={layoutStyles.container}>
        <div className={layoutStyles.stack}>
          <StatisticChart
            accountId={accountId}
            balance={balanceData}
            isLoading={isLoading}
            error={error}
            onRefresh={refetch}
          />
          {isDesktop ? <TransactionTable /> : <TransactionList />}
        </div>
      </Box>
    </Box>
  );
}
