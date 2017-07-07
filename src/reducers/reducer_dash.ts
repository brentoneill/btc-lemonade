import { UPDATE_BTC, ADD_TRANSACTIONS, ADD_ADDRESS, FETCH_ADDRESS, GENERATE_ADDRESS } from '../actions/index';
import { addAddress, IAction } from '../actions';

const INITIAL_STATE = {
    btcToUSD: null,
    btcUpdatedAt: null,
    transactions: [],
    addresses: [],
    updating: false
};

// Single function for actual reducer w/ a swtich statement to catch different
// actions coming through the reducer. Each switch statement returns a new state
export default function(state = INITIAL_STATE, action: IAction) {
    switch (action.type) {
        case UPDATE_BTC:
            const btcToUSD = action.payload.price;
            const btcUpdatedAt = action.payload.timestamp;
            console.info('updated btc at', new Date().toLocaleTimeString());
            return {...state, btcToUSD, btcUpdatedAt};

        case ADD_ADDRESS:
            const addresses = [...state.addresses, action.payload];
            return {...state, addresses};

        case ADD_TRANSACTIONS:
            let transactions = state.transactions.concat(action.payload);
            return {...state, transactions};

        case GENERATE_ADDRESS:
            let address = action.payload.data;
            return {...state};

        case FETCH_ADDRESS:
            const { data } = action.payload;
            return {...state };

        default:
            return state;
    }
}
