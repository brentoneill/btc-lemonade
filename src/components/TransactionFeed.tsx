import * as React from 'react';
import axios from 'axios';
import { Card, Feed, Header, Button, Icon, Modal } from 'semantic-ui-react';

import Socket from '../services/Socket';
import { stringToColour, convertBTCtoUSD, convertFromSatoshi } from '../util';

import './styles/TransactionFeed.scss';

export interface ITransactionFeedProps {
    transactions?: ITransaction[];
    btcToUSD?: number;
}

export interface ITransactionFeedState {
    transactions?: ITransaction[];
    btcToUSD?: number;
}

export interface ITransaction {
    value: number;     // value in satoshi
    confirmed: string; // date
    address: string;   // address of recipient
}

export default class TransactionFeed extends React.Component<ITransactionFeedProps, ITransactionFeedState> {

    constructor(props: ITransactionFeedProps) {
        super(props);
        this.state = {
            transactions: props.transactions
        };
    }

    componentWillReceiveProps(nextProps: ITransactionFeedProps) {
        let { transactions, btcToUSD } = this.state;

        if (nextProps.transactions !== this.props.transactions && nextProps.transactions) {
            transactions = nextProps.transactions;
        }

        if (nextProps.btcToUSD !== this.props.btcToUSD && nextProps.btcToUSD) {
            btcToUSD = nextProps.btcToUSD;
        }
        this.setState({ transactions, btcToUSD });
    }

    renderTransactions(transactions: ITransaction[]): JSX.Element[] | JSX.Element {
        if (transactions && transactions.length) {

            transactions = transactions.sort((a, b) => {
                 return (new Date(b.confirmed) as any) - (new Date(a.confirmed) as any);
            });

            return transactions.map((tx, i) => {
                return (
                    <Feed.Event key={i}>
                        <Feed.Label>
                            <div style={{ backgroundColor: stringToColour(tx.address) }} className={'circle'}></div>
                        </Feed.Label>
                        <Feed.Content>
                            <span className="block">You were paid {convertBTCtoUSD(convertFromSatoshi(tx.value), this.state.btcToUSD)} <span className="text-gray">({convertFromSatoshi(tx.value)}<Icon style={{ marginRight: 0 }}name="bitcoin"/>)</span></span>
                            <small>On {new Date(tx.confirmed).toLocaleDateString()} at {new Date(tx.confirmed).toLocaleTimeString()}</small>
                        </Feed.Content>
                    </Feed.Event>
                );
            });
        } else {
            return (
                <p className="text-center"><i>Sorry, no transactions to display. </i></p>
            );
        }
    }

    render(): JSX.Element {
        return (
            <div className="TransactionFeed">
                <Card fluid>
                    <Card.Content>
                        <Header as={'h2'} color={'blue'}>Transaction Feed</Header>
                    </Card.Content>
                    <Card.Content>
                        <Feed>{this.renderTransactions(this.state.transactions)}</Feed>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}
