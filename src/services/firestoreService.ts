import { db } from '@/firebase';
import { 
    doc, 
    getDoc, 
    setDoc,
    getDocFromCache,
    getDocFromServer,
    collection,
    getDocs
} from 'firebase/firestore';
import type { Account } from '@/store/slices/accountsSlice';
import type { Transaction } from '@/store/slices/transactionsSlice';
import type { Bill } from '@/store/slices/billsSlice';
import type { Income } from '@/store/slices/incomeSlice';

export const firestoreService = {
    // Debug: List all documents in users collection
    async listAllUsers() {
        try {
            console.log('=== Attempting to list all users ===');
            console.log('Database instance:', db);
            console.log('Database app name:', db.app.name);
            console.log('Database app options projectId:', db.app.options.projectId);
            
            // Check which database we're connected to
            const dbInfo = (db as { _databaseId?: { databaseId?: string; projectId?: string } })._databaseId;
            console.log('🔍 Database ID being used:', dbInfo?.databaseId || '(default)');
            console.log('🔍 Database project ID:', dbInfo?.projectId);
            console.log('🔍 Full database ID object:', dbInfo);
            
            const usersCollection = collection(db, 'users');
            console.log('Collection path:', usersCollection.path);
            console.log('Collection ID:', usersCollection.id);
            console.log('Collection parent:', usersCollection.parent);
            
            const querySnapshot = await getDocs(usersCollection);
            console.log('Query snapshot size:', querySnapshot.size);
            console.log('Query snapshot empty:', querySnapshot.empty);
            console.log('Query snapshot metadata:', querySnapshot.metadata);
            
            const users: Array<{ id: string; data: Record<string, unknown> }> = [];
            querySnapshot.forEach((doc) => {
                console.log('Found document ID:', doc.id);
                console.log('Document exists:', doc.exists());
                const data = doc.data();
                console.log('Document data keys:', Object.keys(data));
                users.push({ id: doc.id, data });
            });
            
            console.log('All user documents:', users);
            
            // Also try to get a specific document by ID to see if that works
            const testUserId = 'Nsg4M6RuaaSHjMG1tqmpDBULsRp1';
            console.log('--- Trying to get specific document by ID ---');
            const testDocRef = doc(db, 'users', testUserId);
            console.log('Test document path:', testDocRef.path);
            const testDoc = await getDoc(testDocRef);
            console.log('Test document exists:', testDoc.exists());
            if (testDoc.exists()) {
                console.log('✅ Found document by ID!');
                console.log('Test document data keys:', Object.keys(testDoc.data()));
            } else {
                console.log('❌ Document not found by ID');
            }
            
            // Try to write a test document to see if we can write
            console.log('--- Testing: Can we write to Firestore? ---');
            const testWriteDocRef = doc(db, 'users', 'TEST_WRITE_' + Date.now());
            try {
                await setDoc(testWriteDocRef, { test: true, timestamp: new Date().toISOString() });
                console.log('✅ Successfully wrote test document!');
                console.log('Test document path:', testWriteDocRef.path);
                
                // Try to read it back
                const testReadDoc = await getDoc(testWriteDocRef);
                console.log('Test document exists after write:', testReadDoc.exists());
                if (testReadDoc.exists()) {
                    console.log('✅ Successfully read test document back!');
                    console.log('Test document data:', testReadDoc.data());
                }
                
                // Now try to query again to see if our test document shows up
                console.log('--- Querying again after write ---');
                const querySnapshot2 = await getDocs(usersCollection);
                console.log('Query snapshot size after write:', querySnapshot2.size);
                querySnapshot2.forEach((doc) => {
                    console.log('Found document after write:', doc.id);
                });
            } catch (writeError: unknown) {
                const firebaseWriteError = writeError as { code?: string; message?: string };
                console.error('❌ Failed to write test document');
                console.error('Write error code:', firebaseWriteError?.code);
                console.error('Write error message:', firebaseWriteError?.message);
            }
            
            // Try to create/read the actual user document to see what happens
            console.log('--- Testing: Can we create/read the actual user document? ---');
            const actualUserDocRef = doc(db, 'users', 'Nsg4M6RuaaSHjMG1tqmpDBULsRp1');
            try {
                // The document "doesn't exist" because it has no top-level fields
                // We need to add a top-level field to make it "exist" in Firestore
                // But first, let's try to read it even if it "doesn't exist"
                const actualUserDoc = await getDoc(actualUserDocRef);
                console.log('Actual user document exists (before write):', actualUserDoc.exists());
                
                // Even if exists() is false, try to get data() - sometimes nested data exists
                const existingData = actualUserDoc.data();
                console.log('Existing data (even if doc "doesn\'t exist"):', existingData);
                
                // Try to write a top-level field to make the document "exist"
                // This will preserve existing nested data
                await setDoc(actualUserDocRef, { 
                    _exists: true, // Top-level field to make document "exist"
                    _lastSynced: new Date().toISOString()
                }, { merge: true });
                console.log('✅ Successfully wrote top-level field to make document exist');
                
                // Try to read it back now
                const actualUserDocAfter = await getDoc(actualUserDocRef);
                console.log('Actual user document exists after write:', actualUserDocAfter.exists());
                if (actualUserDocAfter.exists()) {
                    const data = actualUserDocAfter.data();
                    console.log('✅ Successfully read actual user document!');
                    console.log('Document data keys:', Object.keys(data || {}));
                    console.log('Has data field?', 'data' in (data || {}));
                    if (data?.data) {
                        console.log('Data field keys:', Object.keys(data.data));
                        console.log('Data.bills:', data.data.bills);
                        console.log('Data.income:', data.data.income);
                    }
                }
            } catch (actualUserError: unknown) {
                const firebaseActualUserError = actualUserError as { code?: string; message?: string };
                console.error('❌ Failed to write to actual user document');
                console.error('Error code:', firebaseActualUserError?.code);
                console.error('Error message:', firebaseActualUserError?.message);
            }
            
            return users;
        } catch (error: unknown) {
            console.error('Error listing users:', error);
            const firebaseError = error as { code?: string; message?: string };
            console.error('Error code:', firebaseError?.code);
            console.error('Error message:', firebaseError?.message);
            throw error;
        }
    },

    // Helper to get existing data and merge properly
    async getExistingData(userId: string) {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data();
        }
        return {};
    },

    // Accounts
    async saveAccounts(userId: string, accounts: Account[]) {
        const userDocRef = doc(db, 'users', userId);
        const existing = await this.getExistingData(userId);
        await setDoc(userDocRef, { 
            ...existing,
            data: { 
                ...(existing?.data || {}),
                accounts: { 
                    items: accounts 
                } 
            } 
        }, { merge: true });
    },

    async loadAccounts(userId: string): Promise<Account[]> {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const data = userDoc.data();
            return data?.data?.accounts?.items || [];
        }
        return [];
    },

    // Transactions
    async saveTransactions(userId: string, transactions: Transaction[]) {
        const userDocRef = doc(db, 'users', userId);
        const existing = await this.getExistingData(userId);
        await setDoc(userDocRef, { 
            ...existing,
            data: { 
                ...(existing?.data || {}),
                transactions: { 
                    items: transactions 
                } 
            } 
        }, { merge: true });
    },

    async loadTransactions(userId: string): Promise<Transaction[]> {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const data = userDoc.data();
            return data?.data?.transactions?.items || [];
        }
        return [];
    },

    // Bills
    async saveBills(userId: string, bills: Bill[]) {
        const userDocRef = doc(db, 'users', userId);
        const existing = await this.getExistingData(userId);
        await setDoc(userDocRef, { 
            ...existing,
            data: { 
                ...(existing?.data || {}),
                bills: { 
                    items: bills 
                } 
            } 
        }, { merge: true });
    },

    async loadBills(userId: string): Promise<Bill[]> {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const data = userDoc.data();
            console.log('Firestore data structure:', data);
            console.log('Bills path:', data?.data?.bills);
            const bills = data?.data?.bills?.items || [];
            console.log('Loaded bills:', bills);
            return bills;
        }
        console.log('User document does not exist');
        return [];
    },

    // Income
    async saveIncome(userId: string, income: Income[]) {
        const userDocRef = doc(db, 'users', userId);
        const existing = await this.getExistingData(userId);
        await setDoc(userDocRef, { 
            ...existing,
            data: { 
                ...(existing?.data || {}),
                income: { 
                    items: income 
                } 
            } 
        }, { merge: true });
    },

    async loadIncome(userId: string): Promise<Income[]> {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const data = userDoc.data();
            return data?.data?.income?.items || [];
        }
        return [];
    },

    // Load all user data
    async loadAllUserData(userId: string) {
        try {
            console.log('=== Firestore Load Debug ===');
            console.log('Attempting to load data for userId:', userId);
            const userDocRef = doc(db, 'users', userId);
            console.log('Document path:', userDocRef.path);
            console.log('Expected full path: users/' + userId);
            console.log('Collection: users');
            console.log('Document ID:', userId);
            console.log('Using Firestore (default database)');
            
            // Try to get from server first, then fallback to cache
            let userDoc;
            try {
                userDoc = await getDocFromServer(userDocRef);
                console.log('Got document from server');
            } catch (serverError: unknown) {
                console.warn('Error getting from server, trying cache:', serverError);
                const firebaseServerError = serverError as { code?: string };
                if (firebaseServerError?.code === 'unavailable' || firebaseServerError?.code === 'permission-denied') {
                    try {
                        userDoc = await getDocFromCache(userDocRef);
                        console.log('Got document from cache');
                    } catch (cacheError) {
                        console.error('Error getting from cache:', cacheError);
                        // Fallback to regular getDoc
                        userDoc = await getDoc(userDocRef);
                    }
                } else {
                    userDoc = await getDoc(userDocRef);
                }
            }
            
            console.log('Document exists:', userDoc.exists());
            console.log('Document metadata:', userDoc.metadata);
            console.log('Document from cache:', userDoc.metadata.fromCache);
            
            if (userDoc.exists()) {
                const data = userDoc.data();
                console.log('Loading all user data. Full document:', JSON.stringify(data, null, 2));
                console.log('Data object:', data);
                console.log('Data.data:', data?.data);
                console.log('Data.data.bills:', data?.data?.bills);
                console.log('Data.data.income:', data?.data?.income);
                
                // Try both structures - items array and direct array
                const result = {
                    accounts: data?.data?.accounts?.items || data?.data?.accounts || [],
                    transactions: data?.data?.transactions?.items || data?.data?.transactions || [],
                    bills: data?.data?.bills?.items || data?.data?.bills || [],
                    income: data?.data?.income?.items || data?.data?.income || [],
                };
                console.log('Parsed data:', result);
                console.log('Bills count:', result.bills.length);
                console.log('Income count:', result.income.length);
                return result;
            } else {
                console.warn('⚠️ Document does not exist at path:', userDocRef.path);
                console.warn('User ID being used:', userId);
                console.warn('Expected document path: users/' + userId);
                console.warn('User ID matches expected?', userId === 'Nsg4M6RuaaSHjMG1tqmpDBULsRp1');
                
                // Try to check cache
                try {
                    const cachedDoc = await getDocFromCache(userDocRef);
                    console.log('Cached document exists:', cachedDoc.exists());
                    if (cachedDoc.exists()) {
                        console.log('✅ Found document in cache!');
                        const cachedData = cachedDoc.data();
                        console.log('Cached data structure:', Object.keys(cachedData || {}));
                    }
                } catch {
                    console.log('No cached document found');
                }
            }
        } catch (error: unknown) {
            console.error('Error in loadAllUserData:', error);
            const firebaseError = error as { code?: string; message?: string };
            console.error('Error code:', firebaseError?.code);
            console.error('Error message:', firebaseError?.message);
            console.error('Error details:', error);
            
            // Check for permission errors
            if (firebaseError?.code === 'permission-denied') {
                console.error('PERMISSION DENIED - Check Firestore security rules!');
            }
        }
        
        return {
            accounts: [],
            transactions: [],
            bills: [],
            income: [],
        };
    },
};

