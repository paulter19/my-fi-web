import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { firestoreService } from '@/services/firestoreService';
import { setAccounts } from '@/store/slices/accountsSlice';
import { setTransactions } from '@/store/slices/transactionsSlice';
import { setBills } from '@/store/slices/billsSlice';
import { setIncome } from '@/store/slices/incomeSlice';
import type { RootState } from '@/store/store';

export const useFirestoreSync = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const accounts = useSelector((state: RootState) => state.accounts.items);
    const transactions = useSelector((state: RootState) => state.transactions.items);
    const bills = useSelector((state: RootState) => state.bills.items);
    const income = useSelector((state: RootState) => state.income.items);
    const hasLoadedRef = useRef(false);
    const isInitialLoadRef = useRef(false);
    const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Load data from Firestore when user logs in
    useEffect(() => {
        if (user && !hasLoadedRef.current) {
            hasLoadedRef.current = true;
            isInitialLoadRef.current = true;
            const loadData = async () => {
                try {
                    console.log('=== Starting Firestore Load ===');
                    console.log('User object:', user);
                    console.log('User UID:', user.uid);
                    console.log('User UID type:', typeof user.uid);
                    console.log('User UID length:', user.uid.length);
                    console.log('Expected UID: Nsg4M6RuaaSHjMG1tqmpDBULsRp1');
                    console.log('UIDs match?', user.uid === 'Nsg4M6RuaaSHjMG1tqmpDBULsRp1');
                    console.log('User email:', user.email);
                    
                    // First, try to list all users to see if we can access Firestore at all
                    try {
                        console.log('--- Testing: Can we access users collection? ---');
                        const allUsers = await firestoreService.listAllUsers();
                        console.log('✅ Successfully accessed users collection!');
                        console.log('Found users:', allUsers.map(u => u.id));
                    } catch (listError) {
                        console.error('❌ Failed to list users collection:', listError);
                    }
                    
                    const data = await firestoreService.loadAllUserData(user.uid);
                    console.log('Loaded data from Firestore:', data);
                    console.log('Bills count:', data.bills.length);
                    console.log('Accounts count:', data.accounts.length);
                    console.log('Transactions count:', data.transactions.length);
                    console.log('Income count:', data.income.length);
                    dispatch(setAccounts(data.accounts));
                    dispatch(setTransactions(data.transactions));
                    dispatch(setBills(data.bills));
                    dispatch(setIncome(data.income));
                    console.log('Dispatched all data to Redux');
                    console.log('=== Firestore Load Complete ===');
                    // Mark initial load as complete after a short delay
                    setTimeout(() => {
                        isInitialLoadRef.current = false;
                    }, 1000);
                } catch (error) {
                    console.error('Error loading data from Firestore:', error);
                    console.error('Error details:', error);
                    isInitialLoadRef.current = false;
                }
            };
            loadData();
        } else if (!user) {
            hasLoadedRef.current = false;
            isInitialLoadRef.current = false;
        }
    }, [user, dispatch]);

    // Sync data to Firestore when it changes (but not during initial load)
    useEffect(() => {
        if (!user || isInitialLoadRef.current) return;

        // Debounce sync to avoid excessive writes
        if (syncTimeoutRef.current) {
            clearTimeout(syncTimeoutRef.current);
        }

        syncTimeoutRef.current = setTimeout(async () => {
            if (!user) return;
            try {
                await Promise.all([
                    firestoreService.saveAccounts(user.uid, accounts),
                    firestoreService.saveTransactions(user.uid, transactions),
                    firestoreService.saveBills(user.uid, bills),
                    firestoreService.saveIncome(user.uid, income),
                ]);
            } catch (error) {
                console.error('Error syncing data to Firestore:', error);
            }
        }, 2000); // Wait 2 seconds after last change

        return () => {
            if (syncTimeoutRef.current) {
                clearTimeout(syncTimeoutRef.current);
            }
        };
    }, [user, accounts, transactions, bills, income]);
};

