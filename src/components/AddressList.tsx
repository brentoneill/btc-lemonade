import * as React from 'react';
import autobind from 'autobind-decorator';
import axios from 'axios';
import { Card, Header, Feed, Icon } from 'semantic-ui-react';

import { ICryptoAddress } from '../actions';
import { stringToColour, convertBTCtoUSD, convertFromSatoshi } from '../util';

import './styles/AddressList.scss';

interface IProps {
    addresses: any;
    btcToUSD: number;
}

interface IState {
    addresses?: any;
    updatedAt?: number | string;
    btcToUSD?: number;
}

export default class AddressInput extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            addresses: props.addresses,
        };
    }

    componentWillReceiveProps(nextProps: IProps): void {
        let { addresses, updatedAt, btcToUSD } = this.state;

        if (nextProps.btcToUSD) {
            btcToUSD = nextProps.btcToUSD;
        }

        if (nextProps.addresses !== this.state.addresses) {
            addresses = nextProps.addresses;
            updatedAt = new Date().toLocaleTimeString();
        }

        this.setState({ addresses, btcToUSD, updatedAt });
    }

    renderCardFooter(timestamp: number | string): JSX.Element {
        const { updatedAt } = this.state;
        if (updatedAt) {
            return (
                <Card.Content>
                    <Icon name={'refresh'} className="text-gray"/>
                    <small className="text-gray"><i>Updated at {updatedAt}</i></small>
                </Card.Content>
            );
        } else {
            return null;
        }
    }

    renderCardContent(addresses): JSX.Element {
        if (addresses && addresses.length) {
            return (
                <Card.Content>
                    <Feed>
                        {addresses.map((address, i) => {
                            if (address.address) {
                                return (
                                    <Feed.Event key={i}>
                                        <Feed.Label>
                                            <div style={{ backgroundColor: stringToColour(address.address) }} className={'circle'}></div>
                                        </Feed.Label>
                                        <Feed.Content>
                                            <small className="block">{address.name}</small>
                                            <span className="block">{address.address}</span>
                                            <small>Balance: {convertBTCtoUSD(this.state.btcToUSD, convertFromSatoshi(address.balance))}&nbsp;
                                            <span className="text-gray">({address.balance && convertFromSatoshi(address.balance) || !address.balance && 0}<Icon style={{ marginRight: 0 }}name="bitcoin"/>)</span></small>
                                        </Feed.Content>
                                    </Feed.Event>
                                );
                            }
                        })}
                    </Feed>
                </Card.Content>
            );
        } else {
            return(
                <Card.Content>
                    <small className="text-center">You have not added any addresses yet. Start watching your bitcoin wallet addresses by entering them in the box up and to the right!</small>
                </Card.Content>
            );
        }
    }

    getTotalBalance(addresses: ICryptoAddress[]): number {
        let total = 0;

        if (addresses && addresses.length) {
            addresses.forEach(address => {
                total = total + convertFromSatoshi(address.final_balance);
            });
        }

        return total;
    }

    renderTotalBalance(balance: number): JSX.Element | null {
        if (balance) {
            return <small className="AddressList__balance">Your balance: {balance}</small>
        } else {
            return null;
        }
    }

    render(): JSX.Element | null {
        const { addresses, updatedAt, btcToUSD } = this.state;
        const cardContent = this.renderCardContent(addresses);
        const cardFooter = this.renderCardFooter(updatedAt);
        const totalBalanceMarkup = this.renderTotalBalance(convertBTCtoUSD(btcToUSD, this.getTotalBalance(addresses)));

        return (
            <div className="AddressList">
                <Card fluid>
                    <Card.Content>
                        <Header as={'h2'} color={'blue'}>
                            Your Addresses
                            {totalBalanceMarkup}
                        </Header>
                    </Card.Content>
                    {cardContent}
                    {cardFooter}
                </Card>
            </div>
        );
    }
}
