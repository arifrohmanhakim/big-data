'use client';

import { useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Transaction } from '@/types/transaction';
import { PriorityBadge, StatusBadge } from '@/components/dashboard/StatusBadge';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface UseTransactionTableProps {
  data: Transaction[];
}

export function useTransactionTable({ data }: UseTransactionTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [data, selectedStatus, selectedCategory]);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    []
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    []
  );

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Transaction ID',
        size: 140,
        cell: (info) => (
          <span className="font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'customerName',
        header: 'Customer',
        size: 240,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {item.customerName}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {item.customerEmail}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 180,
        cell: (info) => (
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return (
            <button
              onClick={() => column.toggleSorting(isSorted === 'asc')}
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <span>Amount</span>
              {isSorted === 'asc' ? (
                <ArrowUp className="w-3.5 h-3.5" />
              ) : isSorted === 'desc' ? (
                <ArrowDown className="w-3.5 h-3.5" />
              ) : (
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              )}
            </button>
          );
        },
        size: 140,
        cell: (info) => (
          <span className="font-mono text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {currencyFormatter.format(info.getValue<number>())}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 130,
        cell: (info) => <StatusBadge status={info.getValue<Transaction['status']>()} />,
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        size: 110,
        cell: (info) => <PriorityBadge priority={info.getValue<Transaction['priority']>()} />,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 130,
        cell: (info) => (
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {info.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return (
            <button
              onClick={() => column.toggleSorting(isSorted === 'asc')}
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <span>Date & Time</span>
              {isSorted === 'asc' ? (
                <ArrowUp className="w-3.5 h-3.5" />
              ) : isSorted === 'desc' ? (
                <ArrowDown className="w-3.5 h-3.5" />
              ) : (
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              )}
            </button>
          );
        },
        size: 180,
        cell: (info) => (
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            {dateFormatter.format(new Date(info.getValue<string>()))}
          </span>
        ),
      },
    ],
    [currencyFormatter, dateFormatter]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return {
    table,
    globalFilter,
    setGlobalFilter,
    selectedStatus,
    setSelectedStatus,
    selectedCategory,
    setSelectedCategory,
    totalFilteredCount: table.getRowModel().rows.length,
  };
}
