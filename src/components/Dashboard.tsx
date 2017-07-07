import * as React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import axios from 'axios';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BitcoinTicker from './BitcoinTicker';
import TransactionFeed, { ITransaction } from './TransactionFeed';
import AddressList from './AddressList';
import AddressInput from './AddressInput';
import Socket from '../services/Socket';
import { convertBTCtoUSD, convertFromSatoshi } from '../util';
import {toastr} from 'react-redux-toastr';

import { addAddress, addTransactions, updateBTC, fetchAddress } from '../actions';

interface IDashboardProps {
    // redux actions
    updateBTC: Function;
    addAddress: Function;
    addTransactions: Function;
    // data
    transactions: any[];
    addresses: any[];
    btcToUSD: number;
    btcUpdatedAt: number | string;
}

interface IDashboardState {
    addresses?: any;
    transactions?: ITransaction[];
    btcToUSD?: number;
    btcUpdatedAt?: number | string;
}

export interface ITransaction {
    amount: number;
    color: string;
    timestamp: string | number;
    payee: string;
}

import './styles/Dashboard.scss';

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {

    public socket;

    constructor(props: IDashboardProps) {
        super(props);
        this.state = {
            transactions: props.transactions,
            addresses: props.addresses
        };

        const uri = 'wss://ws.blockchain.info/inv';
        const type = 'BitStamp';

        this.socket = new Socket(uri, type);

        this.socket.connection.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.op === 'utx') {
                // do some data conversion to difference in apis
                data.confirmed = new Date(0).setUTCSeconds(data.x.time);
                data.value = data.x.out.map(out => {
                    return out.value;
                }).reduce((prevVal, elem) => {
                    return prevVal + elem;
                });
                data.payee = data.x.relayed_by;
                data.address = data.address ? data.address : '';
                // add the transactions
                this.props.addTransactions([data]);
            }
        };

        this.socket.connection.onopen = (evt) => {
            this.state.addresses.forEach(address => {
                this.subscribeToAddress(address.address);
                // this.pingSubscribedAddresses();
            });
        };
    }

    componentWillMount() {
        // Test addreses - uncomment to hydrate components
        // this.onAddAddress('1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX');
        // this.onAddAddress('1NxaBCFQwejSZbQfWcYNwgqML5wWoE3rK4');
    }

    componentWillReceiveProps(nextProps: IDashboardProps) {
        let { transactions, addresses, btcToUSD, btcUpdatedAt } = this.state;

        if (nextProps.transactions !== this.props.transactions) {
            transactions = nextProps.transactions;
        }

        if (nextProps.addresses !== this.props.addresses) {
            addresses = nextProps.addresses;
            // resubscribe to new addresses
            addresses.forEach(address => {
                this.subscribeToAddress(address.address);
                // this.pingSubscribedAddresses();
            });
        }

        if (nextProps.btcToUSD) {
            btcToUSD = nextProps.btcToUSD;
        }

        if (nextProps.btcUpdatedAt) {
            btcUpdatedAt = nextProps.btcUpdatedAt;
        }

        this.setState({ transactions, addresses, btcToUSD, btcUpdatedAt });
    }

    @autobind
    subscribeToAddress(address: string): void {
        this.socket.connection.send(JSON.stringify({ 'op': 'addr_sub', 'addr': address }));
    }

    @autobind
    pingSubscribedAddresses(): void {
        this.socket.connection.send(JSON.stringify({ 'op': 'ping_tx' }));
    }

    @autobind
    onAddAddress(address: string) {
        return this.getAddressTransaction(address)
            .then(res => {
                const address = res.data;
                this.props.addAddress(address);
                if (address.txrefs && address.txrefs.length) {
                    // Remap the properties here
                    address.txrefs = address.txrefs.map(tx => {
                        tx.address = address.address;
                        return tx;
                    });

                    this.props.addTransactions(address.txrefs);
                    toastr.success('Address added', 'We have successfully added that bitcoin address you wanted. Check your address list and transaction feed for an updated balance and new payments.');
                }
            }, error => {
                toastr.warning('Could not find address', 'Sorry, we weren\'t able to find that address to add to your list. Please try again soon!');
                console.error(error);
            });
    }

    getAddressTransaction(address: string) {
        return axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}`);
    }

    @autobind
    updateBTCExchangerate(order): void {
        this.props.updateBTC(order);
    }

    render() {
        const { transactions, addresses, btcToUSD, btcUpdatedAt } = this.state;

        return (
            <div className="Dashboard">
                <Grid>
                    <Grid.Row columns={16}>
                        <Grid.Column width={6}>
                            <BitcoinTicker onChange={this.updateBTCExchangerate}
                                           currencyPair={'btcusd'}
                                           animateOnUpdate={true}
                                           showTimestamp={true}/>
                            <AddressList addresses={addresses} btcToUSD={btcToUSD}/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <AddressInput onAddAddress={this.onAddAddress}/>
                            <TransactionFeed transactions={transactions} btcToUSD={btcToUSD} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transactions: state.dash.transactions,
        addresses: state.dash.addresses,
        btcToUSD: state.dash.btcToUSD,
        btcUpdatedAt: state.dash.btcUpdatedAt
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAddress: bindActionCreators(addAddress, dispatch),
        addTransactions: bindActionCreators(addTransactions, dispatch),
        updateBTC: bindActionCreators(updateBTC, dispatch),
        fetchAddress: bindActionCreators(fetchAddress, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
