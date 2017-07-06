import * as React from 'react';
import autobind from 'autobind-decorator';
import { Card, Header, Input, Icon, Feed } from 'semantic-ui-react';

import { store } from '../';
import { addAddress } from '../actions';
import { stringToColour } from '../util';
import './styles/AddressInput.scss';

interface IProps {
    addresses?: any;
}

interface IState {
    addresses?: any;
    newAddress?: string;
}

export interface IBitcoinAddress {
    name?: string;
    address: string;
}

export default class AddressInput extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            addresses: store.getState().dash.addresses,
            newAddress: null
        };
    }

    componentWillReceiveProps(nextProps: IProps): void {
        if (nextProps.addresses !== this.state.addresses) {
            this.setState({ addresses: nextProps.addresses });
        }
    }

    addAddress(): void {
        const { newAddress } = this.state;
        if (newAddress && newAddress.length) {
            store.dispatch(addAddress(newAddress));
        }
    }

    @autobind
    handleAddAddressClick(event: React.MouseEvent<HTMLButtonElement>, data): void {
        console.log(event);
        console.log(data);
    }

    renderCardFooter(): JSX.Element {
        return (
            <Input
              fluid
              onChange={(event, data) => { this.setState({ newAddress: data.value}); }}
              action={{ color: 'blue', labelPosition: 'right', icon: 'plus', content: 'Add Address' }}
              placeholder="e.g., 1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX"/>
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
        const { addresses } = this.state;
        const cardContent = this.renderCardContent(addresses);
        const cardFooter = this.renderCardFooter();

        return (
            <div className="AddressInput">
            <Card fluid>
                <Card.Content>
                    <Header as={'h2'} color={'blue'}>Watched Addresses</Header>
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
