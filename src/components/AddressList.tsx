import * as React from 'react';
import autobind from 'autobind-decorator';
import { Card, Header, Feed, Icon } from 'semantic-ui-react';

import { stringToColour } from '../util';

import './styles/AddressList.scss';

interface IProps {
    addresses?: any;
}

interface IState {
    addresses?: any;
    newAddress?: string;
    updatedAt?: number | string;
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
            newAddress: null
        };
    }

    componentWillReceiveProps(nextProps: IProps): void {
        if (nextProps.addresses !== this.state.addresses) {
            this.setState({ addresses: nextProps.addresses });
        }
    }

    renderCardFooter(timestamp): JSX.Element {
        return (
            <div>
                <Icon name={'refresh'} />
                <small className="BitcoinTicker--time"><i>Updated at...</i></small>
            </div>

        );
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
                                    <Feed.Content date={address.name} summary={address.address} />
                                </Feed.Event>
                            );
                        })}
                    </Feed>
                </Card.Content>
            );
        } else {
            return(
                <Card.Content>
                    <small className="gray text-center">You have not added any addresses yet. Click the button below to start watching you bitcoin wallet addresses!</small>
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
