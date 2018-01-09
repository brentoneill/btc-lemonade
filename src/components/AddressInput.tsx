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
    loading?: boolean;
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
        this.setState({ loading: true });
        this.props.onAddAddress(this.state.newAddress)
            .then(res => {
                this.setState({ newAddress: '', loading: false });
            });
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
                    </Card.Content>
                    <Card.Content>
                        <Input fluid
                               value={this.state.newAddress}
                               onChange={this.onAddressChange}
                               action={{ loading: this.state.loading, disabled: this.state.newAddress.length < 25, color: 'blue', labelPosition: 'right', icon: 'plus', content: 'Add', onClick: this.handleAddAddressClick }}
                               placeholder="Some hash..."/>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}
