import { useSearchParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import StatisticChart from "@/entities/statisticChart/StatisticChart";
import {
  useGetBalanceQuery,
  useGetMyAccountsQuery,
} from "@/entities/account/api/account-api";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import React, { useEffect } from "react";
import TransactionTable from "@/widgets/transactionTable/TransactionTable.tsx";
import TransactionList from "@/widgets/transaction-list/TransactionList.tsx";

export default function StatisticsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 426px)");

  const { data: accountsData, isLoading: isAccountsLoading } = useGetMyAccountsQuery({
    page: 0,
    size: 20,
    sort: ["createdAt,DESC"],
  });

  const accountList = accountsData?.content || [];
  const firstNetworkAccountId = accountList[0]?.id;

  const accountId =
    searchParams.get("accountId") ||
    localStorage.getItem("lastAccountId") ||
    firstNetworkAccountId;

  useEffect(() => {
    if (accountId) {
      localStorage.setItem("lastAccountId", accountId);

      // Если в URL пусто, записываем туда наш актуальный ID для красоты ссылок
      if (!searchParams.get("accountId")) {
        setSearchParams({ accountId }, { replace: true });
      }
    }
  }, [accountId, searchParams, setSearchParams]);

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
        balance: balance.amount ?? balance.balance ?? 0,
      }
    : undefined;

  return (
    <Box className={layoutStyles.page}>
      <Box className={layoutStyles.container}>
        <div className={layoutStyles.stack}>
          <StatisticChart
            accountId={accountId}
            balance={balanceData}
            isLoading={isAccountsLoading || isLoading}
            error={error}
            onRefresh={refetch}
          />
          {isDesktop ? <TransactionTable /> : <TransactionList />}
        </div>
      </Box>
    </Box>
  );
}
