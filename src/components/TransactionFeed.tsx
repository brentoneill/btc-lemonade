import * as React from 'react';
import axios from 'axios';
import { Card, Feed, Header, Button, Icon, Modal } from 'semantic-ui-react';

import Socket from '../services/Socket';
import { stringToColor, convertBTCtoUSD, convertFromSatoshi } from '../util';

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
        let { transactions } = this.state;

        if (nextProps.transactions !== this.props.transactions && nextProps.transactions) {
            transactions = nextProps.transactions;
        }

        // if (nextProps.btcToUSD !== this.props.btcToUSD && nextProps.btcToUSD) {
        //     btcToUSD = nextProps.btcToUSD;
        // }

        this.setState({ transactions });
    }

    renderTransactions(transactions: ITransaction[]): JSX.Element[] | JSX.Element {
        if (transactions && transactions.length) {

            transactions = transactions.sort((a, b) => {
                 return (new Date(b.confirmed) as any) - (new Date(a.confirmed) as any);
            }).splice(0, 10);

            return transactions.map((tx, i) => {
                return (
                    <Feed.Event key={i}>
                        <Feed.Label>
                            <div style={{ backgroundColor: stringToColor(tx.address) }} className={'circle'}></div>
                        </Feed.Label>
                        <Feed.Content>
                            <span className="block">You were paid {convertFromSatoshi(tx.value)}<Icon style={{ marginRight: 0 }}name="bitcoin"/></span>
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
