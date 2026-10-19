export type TransactionStatus = 'completed' | 'pending' | 'processing' | 'cancelled';
export type TransactionPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  category: string;
  amount: number;
  status: TransactionStatus;
  priority: TransactionPriority;
  city: string;
  createdAt: string;
}

export interface TransactionFilterOptions {
  searchQuery: string;
  statusFilter: TransactionStatus | 'all';
  categoryFilter: string;
}

export interface PerformanceMetrics {
  renderDurationMs: number;
  renderedDomRows: number;
  totalDataCount: number;
}
