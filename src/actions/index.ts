import axios from 'axios';

export const FETCH_PRICES = 'FETCH_PRICES';
export const ADD_BLOCK = 'ADD_BLOCK';
export const UPDATE_BTC = 'UPDATE_BTC';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';


export function fetchPrices() {
    const request = axios.get(`https://chain.so/api/v2/get_price/BTC`);
    return {
        type: FETCH_PRICES,
        payload: request
    };
}

export function updateBTC(data) {
    return {
        type: UPDATE_BTC,
        payload: data
    };
}

export function addBlock(block) {
    return {
        type: ADD_BLOCK,
        payload: block
    };
}

export function addTransaction(transaction) {
    return {
        type: ADD_TRANSACTION,
        payload: transaction
    };
}

export function addAddress(address) {
    return {
        type: ADD_ADDRESS,
        payload: address
    };
}
