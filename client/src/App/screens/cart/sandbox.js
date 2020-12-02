import SandboxApiUser from "mtn-pay/lib/sandboxApiUser";
import Transaction, {
    TransactionTypes,
    resourceUrlsMap,
    transactionReceipientTypesMap,
    } from 'mtn-pay/lib/transaction';
import uuidv4  from 'uuidjs';

//https://ericssonbasicapi2.azure-api.net/v1_0
const baseURL = process.env.REACT_APP_BASE_URL;
// delete if done
//0296b709a11e4b3fb94d4fc694d6dba3
const subscriptionKey = process.env.REACT_APP_SUBSCRIPTION_KEY;

const sandboxApiUser = new SandboxApiUser({baseURL, subscriptionKey});

const getCredentials = async () => {
    const response = await sandboxApiUser.initialize();
    const user = await sandboxApiUser.getUser();

    const apiKey = user.apiKey;
    const apiUserId = user.referenceId;
    return {apiKey, apiUserId};
}
console.log(getCredentials());
export const completePayment = async(partyId, amountPaid) => {
    const transactionType = TransactionTypes.COLLECTION; 
    const receipient = {
        partyIdType: 'msisdn',
        partyId: partyId // The phone number of receipient of the request, not your own number
    }
    console.log(getCredentials());
    const transactionConfig = {
        amount: amountPaid, //<money amount to pay or receive>,
        currency: 'UGX', // in sandbox, it is 'EUR'
        externalId: uuidv4(),
        payeeNote: 'A note for the payee',
        receipient,
        payerMessage: 'A message for the payer',
        subscriptionKey: process.env.REACT_APP_SUBSCRIPTION_KEY,
        targetEnvironment: process.env.REACT_APP_TARGET_ENVIRONMENT, // for sandbox, put 'sandbox'
        // apiuserId: apiUserId,
        // apiKey: apiKey,
        timeout: 35000, // the time in milliseconds for polling status to time out; default: 35000
        interval: 31000, // the interval at which status is polled in ms: defaults to 30000; never goes below 30000
        baseURL: process.env.REACT_APP_BASE_URL,
        authBaseURL: process.env.REACT_APP_AUTH_URL,
        resourceUrl: resourceUrlsMap[transactionType],
        receipientType: transactionReceipientTypesMap[transactionType],
        };
    
    const transaction = new Transaction(transactionType, transactionConfig);

    const details = await transaction.getDetails();
    /*
    * or you could go step by step but why!!!
    * await transaction.initialize();
    * await transaction.pollStatus();
    * const details = await transaction.getDetails();
    */
const {
    amount,
    currency,
    externalId,
    payee, // or payer if we are requesting for payment i.e. transactionType === 'collection'
    status,
    reason
} = details;
console.log(amount,
    currency,
    externalId,
    payee,
    status,
    reason);

}
