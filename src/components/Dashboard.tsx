import * as React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import axios from 'axios';
import autobind from 'autobind-decorator';

import BitcoinTicker from './BitcoinTicker';
import TransactionFeed, { ITransaction } from './TransactionFeed';
import AddressList from './AddressList';
import AddressInput from './AddressInput';
import Socket from '../services/Socket';
import { store } from '../';

interface IDashboardProps {}

interface IDashboardState {
    addresses?: any;
    transactions?: ITransaction[];
}

export interface ITransaction {
    amount: number;
    color: string;
    timestamp: string | number;
    payee: string;
}

import './styles/Dashboard.scss';

// Create the coinbase client - probably need to do on server
const CoinbaseClient = require('coinbase').Client;
const apiKey = 'nxv5LXg8Ge4DnKuM';
const apiSecret = '6wQhqnPCvsqVCJ6uCvsg15Elt3ScvYIy';
const version = null;
const ApiClient = new CoinbaseClient({ apiKey, apiSecret, version });

export default class Dashboard extends React.Component<IDashboardProps, IDashboardState> {

    public socket;

    constructor(props: IDashboardProps) {
        super(props);
        this.state = {
            transactions: [],
            addresses: store.getState().dash.addresses
        };

        const uri = 'wss://ws.blockchain.info/inv';
        const type = 'BitStamp';

        this.socket = new Socket(uri, type);

        this.socket.connection.onmessage = (message) => {
            console.log(message);
        };

        this.socket.connection.onopen = (evt) => {
            this.state.addresses.forEach(address => {
                this.subscribeToAddress(address.address);
            });
        };
    }

    componentWillMount() {
        // this.getAddressTransactions()
        //     .then(res => {
        //         console.log('res', res);
        //     }, err => {
        //         console.log(err);
        //     });
    }

    @autobind
    subscribeToAddress(address: string) {
        this.socket.connection.send({ 'op': 'addr_sub', 'addr': address });
    }

    getAddressTransactions() {
        const { addresses } = this.state;
        const addressString = addresses.map(address => address.address).join('|');
        return axios.get(`https://blockchain.info/multiaddr?active=${addressString}`);
    }

    render() {
        const { transactions, addresses } = this.state;

        return (
            <div className="Dashboard">
                <Grid>
                    <Grid.Row columns={16}>
                        <Grid.Column width={6}>
                            <BitcoinTicker currencyPair={'btcusd'} animateOnUpdate={true} showTimestamp={true}/>
                            <BitcoinTicker currencyPair={'ltcusd'} animateOnUpdate={true} showTimestamp={true}/>
                            <AddressList addresses={addresses} />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <AddressInput onAddAddress={this.subscribeToAddress}/>
                            <TransactionFeed transactions={transactions} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
