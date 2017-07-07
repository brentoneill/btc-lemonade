import * as React from 'react';
import autobind from 'autobind-decorator';
import { Card, Header, Input } from 'semantic-ui-react';

import { store } from '../';
import { addAddress } from '../actions';

interface IProps {
    addresses?: any;
    onAddAddress: Function;
}

interface IState {
    newAddress?: string;
}

export interface IBitcoinAddress {
    name?: string;
    address: string;
    balance?: number;
    totalReceived?: number;
}

export default class AddressInput extends React.Component<IProps, IState> {
    private input;

    constructor(props: IProps) {
        super(props);
        this.state = {
            newAddress: ''
        };
    }

    @autobind
    handleAddAddressClick(event: React.MouseEvent<HTMLButtonElement>, data): void {
        this.props.onAddAddress(this.state.newAddress);
        this.setState({ newAddress: '' });
    }

    @autobind
    onAddressChange(event: React.ChangeEvent<HTMLInputElement>, data): void {
        this.setState({ newAddress: data.value });
    }

    render(): JSX.Element | null {
        return (
            <div className="AddressInput">
                <Card fluid>
                    <Card.Content>
                        <Header as={'h2'} color={'blue'}>Add Address to Watch</Header>
                        <Input fluid
                               value={this.state.newAddress}
                               onChange={this.onAddressChange}
                               action={{ color: 'blue', labelPosition: 'right', icon: 'plus', content: 'Add', onClick: this.handleAddAddressClick }}
                               placeholder="Some hash..."/>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}
