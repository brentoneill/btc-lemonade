import * as React from 'react';
import axios from 'axios';
import { Card, Feed, Header, Button, Icon, Modal } from 'semantic-ui-react';

import './styles/TransactionFeed.scss';

interface ITransactionFeedProps {
    transactions?: any;
}

interface ITransactionFeedState {
    transactions?: any;
}

// Create the coinbase client
const CoinbaseClient = require('coinbase').Client;
const apiKey = 'nxv5LXg8Ge4DnKuM';
const apiSecret = '6wQhqnPCvsqVCJ6uCvsg15Elt3ScvYIy';
const version = null;
const ApiClient = new CoinbaseClient({ apiKey, apiSecret, version });

export default class TransactionFeed extends React.Component<ITransactionFeedProps, ITransactionFeedState> {

    constructor(props: ITransactionFeedProps) {
        super(props);
        this.state = {
            transactions: props.transactions
        };
    }

    componentWillMount() {
        axios.get(`http://btc.blockr.io/api/v1/address/info/${'11AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F'}`)
            .then(res => {
                console.log(res);
            }, error => {
                console.log(error);
            });

        // ApiClient.getAccount('primary', function(err, account) {
        //     console.log(err);
        //     account.createAddress(function(err, addr) {
        //         console.log(addr);
        //         const address = addr;
        //     }, );
        // });
    }

    generateAddress() {
        return ApiClient.getAccount('primary', function(err, account) {
            account.createAddress(function(err, addr) {
                console.log(addr);
                const address = addr;
            });
        });
    }

    render(): JSX.Element | null {
        // Button that triggers the modal
        const trigger = (
            <Button primary
                    floated={'right'}
                    labelPosition={'left'}
                    label={'Generate New Address'}
                    icon={'add square'} />
        );

        // <Feed>
        //     {this.state.transactions && this.state.transactions.map((tx, i) => {
        //         const { date, amount, payee } = tx;
        //         const summary = `You were paid ${amount} by ${payee}`;
        //         return (
        //             <Feed.Event key={i}>
        //                 <Feed.Label>
        //                     <div className={'circle'}></div>
        //                 </Feed.Label>
        //                 <Feed.Content date={date} summary={summary} />
        //             </Feed.Event>
        //         );
        //     })}
        // </Feed>

        return (
            <div className="TransactionFeed">
                <Card fluid>
                    <Card.Content>
                        <Header as={'h2'} color={'blue'}>Transaction Feed</Header>
                        <Modal trigger={trigger}
                            dimmer={'blurring'}
                            basic
                            size="small"
                            closeOnDimmerClick={true}>
                            <Header icon="plus" content="Generate a New Address" />
                            <Modal.Content>
                                <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button basic color="red" inverted>
                                    <Icon name="remove" /> No
                                </Button>
                                <Button color="green" inverted>
                                    <Icon name="checkmark" /> Yes
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </Card.Content>
                    <Card.Content>

                    </Card.Content>
                </Card>
            </div>
        );
    }
}
