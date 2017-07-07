import * as React from 'react';
import autobind from 'autobind-decorator';
import { Card, Header, Feed, Icon } from 'semantic-ui-react';

import { stringToColour, convertBTCtoUSD, convertFromSatoshi } from '../util';

import './styles/AddressList.scss';

interface IProps {
    addresses?: any;
    updatedAt?: number | string;
    btcToUSD?: number;
}

interface IState {
    addresses?: any;
    updatedAt?: number | string;
    btcToUSD?: number;
}

export interface IBitcoinAddress {
    name?: string;
    address: string;
    balance?: number;
    totalReceived?: number;
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
                <div>
                    <Icon name={'refresh'} />
                    <small className="BitcoinTicker--time"><i>Updated at {updatedAt}</i></small>
                </div>
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
                            return (
                                <Feed.Event key={i}>
                                    <Feed.Label>
                                        <div style={{ backgroundColor: stringToColour(address.address) }} className={'circle'}></div>
                                    </Feed.Label>
                                    <Feed.Content>
                                        <span className="block">{address.address}</span>
                                        <small>Balance: {convertBTCtoUSD(address.balance, this.state.btcToUSD)}&nbsp;
                                        <span className="text-gray">({convertFromSatoshi(address.balance)}<Icon style={{ marginRight: 0 }}name="bitcoin"/>)</span></small>
                                    </Feed.Content>
                                </Feed.Event>
                            );
                        })}
                    </Feed>
                </Card.Content>
            );
        } else {
            return(
                <Card.Content>
                    <small className="gray text-center">You have not added any addresses yet. Start watching your bitcoin wallet addresses by entering them in the box up and to the right!</small>
                </Card.Content>
            );
        }
    }

    render(): JSX.Element | null {
        const { addresses, updatedAt } = this.state;
        const cardContent = this.renderCardContent(addresses);
        const cardFooter = this.renderCardFooter(updatedAt);

        return (
            <div className="AddressList">
                <Card fluid>
                    <Card.Content>
                        <Header as={'h2'} color={'blue'}>Your Addresses</Header>
                    </Card.Content>
                    <Card.Content>
                        {cardContent}
                    </Card.Content>
                    <Card.Content extra>
                        {cardFooter}
                    </Card.Content>
                </Card>
            </div>
        );
    }
}
