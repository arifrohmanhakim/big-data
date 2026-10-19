import { Transaction, TransactionPriority, TransactionStatus } from '@/types/transaction';

const CATEGORIES = [
  'Electronics',
  'Fashion & Apparel',
  'Home & Kitchen',
  'Health & Beauty',
  'Sports & Outdoors',
  'Automotive',
  'Books & Stationery',
  'Computers & Accessories',
];

const CITIES = [
  'New York',
  'London',
  'Tokyo',
  'San Francisco',
  'Singapore',
  'Berlin',
  'Sydney',
  'Toronto',
  'Paris',
  'Amsterdam',
];

const STATUSES: TransactionStatus[] = ['completed', 'pending', 'processing', 'cancelled'];
const PRIORITIES: TransactionPriority[] = ['low', 'medium', 'high', 'critical'];

const FIRST_NAMES = [
  'Alexander', 'Sophia', 'Liam', 'Olivia', 'Ethan', 'Emma', 'Noah', 'Ava', 'Lucas', 'Mia',
  'Oliver', 'Isabella', 'William', 'Charlotte', 'James', 'Amelia', 'Benjamin', 'Harper', 'Mason', 'Evelyn'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'
];

export function generateDummyTransactions(count: number = 5000): Transaction[] {
  const transactions: Transaction[] = new Array(count);
  const baseTime = Date.now();

  for (let index = 0; index < count; index++) {
    const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(index * 3) % LAST_NAMES.length];
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 10}@example.com`;
    const category = CATEGORIES[index % CATEGORIES.length];
    const city = CITIES[index % CITIES.length];
    const status = STATUSES[index % STATUSES.length];
    const priority = PRIORITIES[index % PRIORITIES.length];

    // Transaction amounts range from $15.00 to $4,500.00
    const rawAmount = 15 + ((index * 73) % 4485) + ((index % 100) / 100);
    const amount = Math.round(rawAmount * 100) / 100;

    const createdAt = new Date(baseTime - index * 180000).toISOString();

    transactions[index] = {
      id: `TRX-${(100000 + index).toString()}`,
      customerName: fullName,
      customerEmail: email,
      category,
      amount,
      status,
      priority,
      city,
      createdAt,
    };
  }

  return transactions;
}

export async function fetchTransactionsFromApi(count: number = 5000): Promise<Transaction[]> {
  const response = await fetch(`/api/transactions?count=${count}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transaction data from server.');
  }
  const payload = await response.json();
  return payload.data;
}
