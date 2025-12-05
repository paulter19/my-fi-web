const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

admin.initializeApp();

exports.createFinancialConnectionsSession = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  try {
    const session = await stripe.financialConnections.sessions.create({
      account_holder: {
        type: "customer",
        customer: await getOrCreateStripeCustomer(context.auth.uid, context.auth.token.email),
      },
      permissions: ["balances", "ownership", "payment_method", "transactions"],
    });

    return { clientSecret: session.client_secret };
  } catch (error) {
    console.error("Error creating session:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});

exports.getAccounts = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const { sessionId } = data;

  try {
    const session = await stripe.financialConnections.sessions.retrieve(sessionId);
    const accounts = await stripe.financialConnections.accounts.list({
      account_holder: { customer: session.account_holder.customer },
    });

    return accounts.data;
  } catch (error) {
    console.error("Error getting accounts:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});

exports.getTransactions = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const { accountId } = data;

  try {
    // Note: This is a simplified transaction fetch. 
    // In a real app, you might need to refresh the session or use webhooks.
    // For Financial Connections, we typically list transactions on the account.
    // However, the 'transactions' permission must be active.
    
    // We need to use the financialConnections.transactions.list API
    const transactions = await stripe.financialConnections.transactions.list({
      account: accountId,
      limit: 100,
    });

    return transactions.data;
  } catch (error) {
    console.error("Error getting transactions:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});

async function getOrCreateStripeCustomer(uid, email) {
  const customerSnapshot = await admin.firestore().collection("customers").doc(uid).get();
  if (customerSnapshot.exists) {
    return customerSnapshot.data().stripeId;
  }

  const customer = await stripe.customers.create({
    email: email,
    metadata: { firebaseUID: uid },
  });

  await admin.firestore().collection("customers").doc(uid).set({
    stripeId: customer.id,
  });

  return customer.id;
}
