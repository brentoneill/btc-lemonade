import { UPDATE_BTC, ADD_TRANSACTION, ADD_ADDRESS } from '../actions/index';
import { IAction } from './';

const INITIAL_STATE = {
    btcToUSD: null,
    btcUpdatedAt: null,
    transactions: [],
    addresses: [
        {
            address: '1FztQpGD4fb45H32DhPtbM2g2HrH1f3TVG',
            name: 'My Bitcoin Wallet'
        },
        {
            address: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
            name: 'Silkroad Seized Coins'
        }
    ]
};

// Single function for actual reducer w/ a swtich statement to catch different
// actions coming through the reducer. Each switch statement returns a new state
export default function(state = INITIAL_STATE, action: IAction) {
    switch (action.type) {
        case UPDATE_BTC:
            const btcToUSD = action.payload.price;
            const btcUpdatedAt = action.payload.timestamp;
            return {...state, btcToUSD, btcUpdatedAt};
        default:
            return state;
    }
}
