import { functions } from '@/firebase';
import { httpsCallable } from 'firebase/functions';

export const stripeService = {
    createSession: async () => {
        const createFinancialConnectionsSession = httpsCallable(functions, 'createFinancialConnectionsSession');
        const result = await createFinancialConnectionsSession();
        return result.data as { clientSecret: string };
    },

    fetchAccounts: async (sessionId: string) => {
        const getAccounts = httpsCallable(functions, 'getAccounts');
        const result = await getAccounts({ sessionId });
        return result.data as any[];
    },

    fetchTransactions: async (accountId: string) => {
        const getTransactions = httpsCallable(functions, 'getTransactions');
        const result = await getTransactions({ accountId });
        return result.data as any[];
    }
};
