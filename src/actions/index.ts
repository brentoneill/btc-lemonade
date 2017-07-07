import axios from 'axios';

export interface IAction {
    type: string;
    payload?: any;
    error?: any;
    meta?: any;
}

export const FETCH_ADDRESS = 'FETCH_ADDRESS';
export const ADD_BLOCK = 'ADD_BLOCK';
export const UPDATE_BTC = 'UPDATE_BTC';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const GENERATE_ADDRESS = 'GENERATE_ADDRESS';

export function fetchAddress(address): IAction {
    const request = axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}`);
    return {
        type: FETCH_ADDRESS,
        payload: request
    };
}

export function updateBTC(data): IAction {
    return {
        type: UPDATE_BTC,
        payload: data
    };
}

export function addBlock(block): IAction {
    return {
        type: ADD_BLOCK,
        payload: block
    };
}

export function addTransactions(transactions): IAction {
    return {
        type: ADD_TRANSACTIONS,
        payload: transactions
    };
}

export function addAddress(address): IAction {
    return {
        type: ADD_ADDRESS,
        payload: address
    };
}

export function generateNewAddress(apiKey: string, label?: string): IAction {
    let labelString = (label && label.length) ? `&label=${label}` : '';
    const request = axios.get(`https://block.io/api/v2/get_new_address/?api_key=${apiKey}${labelString}`);

    return {
        type: GENERATE_ADDRESS,
        payload: request
    };
}
