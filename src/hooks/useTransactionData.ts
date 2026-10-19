'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchTransactionsFromApi, generateDummyTransactions } from '@/services/transactionService';
import { Transaction } from '@/types/transaction';
import { useMemo } from 'react';

interface UseTransactionDataOptions {
  rowCount?: number;
  useClientGenerator?: boolean;
}

export function useTransactionData({
  rowCount = 5000,
  useClientGenerator = false,
}: UseTransactionDataOptions = {}) {
  const query = useQuery<Transaction[], Error>({
    queryKey: ['transactions', rowCount, useClientGenerator],
    queryFn: async () => {
      if (useClientGenerator) {
        return generateDummyTransactions(rowCount);
      }
      try {
        return await fetchTransactionsFromApi(rowCount);
      } catch {
        return generateDummyTransactions(rowCount);
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const transactions = useMemo(() => query.data ?? [], [query.data]);

  const summaryMetrics = useMemo(() => {
    if (!transactions.length) {
      return {
        totalRows: 0,
        totalVolume: 0,
        averageAmount: 0,
        completedCount: 0,
      };
    }

    let totalVolume = 0;
    let completedCount = 0;

    for (let i = 0; i < transactions.length; i++) {
      const item = transactions[i];
      totalVolume += item.amount;
      if (item.status === 'completed') {
        completedCount++;
      }
    }

    return {
      totalRows: transactions.length,
      totalVolume,
      averageAmount: Math.round(totalVolume / transactions.length),
      completedCount,
    };
  }, [transactions]);

  return {
    ...query,
    transactions,
    summaryMetrics,
  };
}
