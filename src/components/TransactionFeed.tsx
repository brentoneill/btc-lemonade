import * as React from 'react';
import axios from 'axios';
import { Card, Feed, Header, Button, Icon, Modal } from 'semantic-ui-react';

import { store } from '../';
import Socket from '../services/Socket';
import { stringToColour } from '../util';

import './styles/TransactionFeed.scss';

interface ITransactionFeedProps {
    transactions?: ITransaction[];
}

interface ITransactionFeedState {
    transactions?: ITransaction[];
}

export interface ITransaction {
    amount: number;
    timestamp: string | number;
    payee: string;
    address: string;
}

export default class TransactionFeed extends React.Component<ITransactionFeedProps, ITransactionFeedState> {

    constructor(props: ITransactionFeedProps) {
        super(props);
        this.state = {
            transactions: props.transactions
        };
    }

    renderTransactions(transactions: ITransaction[]): JSX.Element {
        if (transactions && transactions.length) {
            transactions.map((tx, i) => {
                return (
                    <Feed.Event key={i}>
                        <Feed.Label>
                            <div style={{ backgroundColor: stringToColour(tx.address) }} className={'circle'}></div>
                        </Feed.Label>
                        <Feed.Content date={tx.timestamp} summary={tx.payee} />
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
                        <Feed>
                            {this.renderTransactions(this.state.transactions)}
                        </Feed>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}
