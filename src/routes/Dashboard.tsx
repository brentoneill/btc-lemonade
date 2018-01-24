import * as React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import axios from 'axios';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';

import Socket from '../services/Socket';
import { BitcoinTicker, TransactionFeed, AddressList, AddressInput } from '../components';
import { convertBTCtoUSD, convertFromSatoshi } from '../util';
import { addAddress, fetchAddress, addTransactions, updateBTC, updateETH, updateXRP } from '../actions';

import './styles/Dashboard.scss';

interface IDashboardProps {
    // redux actions
    updateBTC: Function;
    updateETH: Function;
    updateXRP: Function;
    addAddress: Function;
    addTransactions: Function;
    // data
    transactions: any[];
    addresses: any[];
    btcToUSD: number;
    btcUpdatedAt: number | string;
}

class Dashboard extends React.Component<IDashboardProps, {}> {

    public socket;

    constructor(props: IDashboardProps) {
        super(props);
        this.state = {
            transactions: props.transactions,
            addresses: props.addresses
        };

        const uri = 'wss://ws.blockchain.info/inv';
        const type = 'blockchain.info';

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
            this.socket.setupPing();
        };
    }


    componentDidMount() {
        // Hydrate with some of the more poopular BTC wallet addresses
        setTimeout(() => {
            if (!this.props.addresses.length) {
                this.onAddAddress('1dice8EMZmqKvrGE4Qc9bUFf9PX3xaYDp');
                this.onAddAddress('1LuckyR1fFHEsXYyx5QK4UFzv3PEAepPMK');
                this.onAddAddress('1VayNert3x1KzbpzMGt2qdqrAThiRovi8');
            }
        }, 1000);
    }

    componentWillReceiveProps(nextProps: IDashboardProps) {
        let { transactions, addresses, btcToUSD, btcUpdatedAt } = this.props;

        if (nextProps.transactions !== this.props.transactions) {
            transactions = nextProps.transactions;
        }

        if (nextProps.addresses !== this.props.addresses) {
            addresses = nextProps.addresses;
            // resubscribe to new addresses
            addresses.forEach(address => {
                // this.unsubscribeToAddress(address.address);
                this.subscribeToAddress(address.address);
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
    unsubscribeToAddress(address: string): void {
        this.socket.connection.send(JSON.stringify({ 'op': 'addr_unsub', 'addr': address }));
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
                    toastr.success('Address added', 'Check your address list and transaction feed for an updated balance and new payments.');
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
    updateBTCExchangeRate(order): void {
        this.props.updateBTC(order);
    }

    @autobind
    updateETHExchangeRate(order): void {
        this.props.updateETH(order);
    }

    @autobind
    updateXRPExchangeRate(order): void {
        this.props.updateXRP(order);
    }

    render() {
        const { transactions, addresses, btcToUSD, btcUpdatedAt } = this.props;

        return (
            <div className="Dashboard">
                <Grid stackable={true}>
                    <Grid.Row columns={16}>
                        <Grid.Column width={6}>
                            <BitcoinTicker title="BTC to USD"
                                           onChange={this.updateBTCExchangeRate}
                                           currencyPair={'btcusd'}
                                           animateOnUpdate={true}
                                           showTimestamp={true}/>
                           <BitcoinTicker title="ETH TO USD"
                                          onChange={this.updateETHExchangeRate}
                                          currencyPair={'ethusd'}
                                          animateOnUpdate={true}
                                          showTimestamp={true}/>
                           <BitcoinTicker title="XRP TO USD"
                                          onChange={this.updateXRPExchangeRate}
                                          currencyPair={'xrpusd'}
                                          animateOnUpdate={true}
                                          showTimestamp={true}/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <AddressInput onAddAddress={this.onAddAddress}/>
                            <AddressList addresses={addresses} btcToUSD={btcToUSD}/>
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
        fetchAddress: bindActionCreators(fetchAddress, dispatch),
        updateBTC: bindActionCreators(updateBTC, dispatch),
        updateETH: bindActionCreators(updateETH, dispatch),
        updateXRP: bindActionCreators(updateXRP, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
