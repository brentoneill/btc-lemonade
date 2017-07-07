const currencyFormatter = require('currency-formatter');

export const SATOSHI = 100000000;

export function convertFromSatoshi(input: number): number {
    return input / SATOSHI;
}

export function convertToSatoshi(input: number): number {
    return input * SATOSHI;
}

export function convertBTCtoUSD(exchangeRate: number, bitcoinAmount: number): number {
    return currencyFormatter.format(convertFromSatoshi(bitcoinAmount) * exchangeRate, { code: 'USD' });
}

export function convertUSDtoBTC(exchangeRate: number, usdAmount: number): number {
    return usdAmount / exchangeRate;
}

/*
* From: https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
* Used to transform address hash in to a unique background color for the wallet addresses
*
*/
export function stringToColour(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let colour = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }

    return colour;
}
