import { stripeService } from '@/services/stripeService';
import { addAccount } from '@/store/slices/accountsSlice';
import { addTransaction } from '@/store/slices/transactionsSlice';
import { nanoid } from '@reduxjs/toolkit';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Replace with your actual publishable key
const stripePromise = loadStripe('pk_live_51SXUzTAUrKH9sUUAz5mWuSlcEzGrnEweBBpBT6ueGU6rOKPyHrBJtUMag7s4scbIP9JoCrfnTCHSgjTGNIsrqqtS00Fk1LaGTt');

interface ConnectBankModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ConnectBankModal: React.FC<ConnectBankModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleConnect = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Initializing Stripe...');
            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error('Stripe failed to initialize');
            }

            console.log('Creating Financial Connections Session...');
            // 1. Get Client Secret from Backend
            const { clientSecret } = await stripeService.createSession();
            console.log('Session created, client secret obtained');

            // 2. Open Stripe Financial Connections Modal
            console.log('Opening Stripe modal...');
            const { error: stripeError, financialConnectionsSession } = await stripe.collectFinancialConnectionsAccounts({
                clientSecret,
            });

            if (stripeError) {
                console.error('Stripe Error:', stripeError);
                setError(stripeError.message || 'An unknown error occurred with Stripe.');
                setLoading(false);
                return;
            }

            if (financialConnectionsSession) {
                console.log('Session completed, fetching accounts...');
                // 3. Fetch Account Details from Backend
                const accounts = await stripeService.fetchAccounts(financialConnectionsSession.id);
                console.log('Accounts fetched:', accounts);

                for (const acc of accounts) {
                    const accountId = nanoid();

                    // Add Account
                    dispatch(addAccount({
                        id: accountId,
                        name: acc.institution_name + ' ' + acc.last4,
                        type: 'checking', // Simplified mapping
                        balance: acc.balance.current, // Assuming USD
                        currency: acc.currency,
                        source: 'stripe',
                        stripeAccountId: acc.id,
                        lastSynced: new Date().toISOString()
                    }));

                    // 4. Fetch Transactions
                    console.log(`Fetching transactions for account ${acc.id}...`);
                    const transactions = await stripeService.fetchTransactions(acc.id);
                    console.log(`Transactions fetched for ${acc.id}:`, transactions);

                    transactions.forEach((t: any) => {
                        dispatch(addTransaction({
                            id: t.id,
                            title: t.description,
                            amount: Math.abs(t.amount / 100), // Stripe amounts are in cents
                            date: new Date(t.transacted_at * 1000).toISOString().split('T')[0],
                            category: 'Uncategorized',
                            type: t.amount < 0 ? 'expense' : 'income',
                            accountId
                        }));
                    });
                }

                onClose();
            }
        } catch (e: any) {
            console.error('Connection failed', e);
            setError(e.message || 'Failed to connect to Stripe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md p-6 shadow-2xl rounded-2xl animate-fade-in m-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#635BFF] text-white text-xs font-bold px-2 py-1 rounded">Stripe Secured</div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <X size={24} className="text-slate-600 dark:text-slate-400" />
                    </button>
                </div>

                <div className="text-center py-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Connect your bank</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        Link your bank account to automatically sync balances and transactions.
                    </p>

                    {error && (
                        <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleConnect}
                        disabled={loading}
                        className="w-full py-3 bg-[#635BFF] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Connecting...
                            </>
                        ) : (
                            'Connect with Stripe'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
