import * as React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Button, Modal, Icon, Input } from 'semantic-ui-react';
import {toastr} from 'react-redux-toastr';

import { generateNewAddress, addAddress } from '../actions';

import './styles/Header.scss';

interface IProps {
    className?: string;
    generateNewAddress: Function;
    addAddress: Function;
}

interface IState {
    modalOpen?: boolean;
    addressLabel?: string;
    apiKey?: string;
}

class Header extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            modalOpen: false,
            addressLabel: '',
            apiKey: ''
        };
    }

    @autobind
    handleConfirmGenerateAddress() {
        const { apiKey, addressLabel } = this.state;
        this.props.generateNewAddress(apiKey, addressLabel)
            .then(action => {
                if (action.payload && action.payload.data) {
                    toastr.success('Address generated!', 'You will now see the address in your address list.');
                    this.props.addAddress(action.payload.data.data);
                } else {
                    toastr.warning('Could not generate', 'For some reason, we couldn\'t generate the address for you. Please try again.');
                }
                this.resetState();
            }, err => {
                console.error(err);
                this.resetState();
                toastr.warning('Could not generate', 'For some reason, we couldn\'t generate the address for you. Please try again.');
            });
    }

    @autobind
    resetState() {
        this.setState({ modalOpen: false, addressLabel: '', apiKey: '' });
    }

    @autobind
    onLabelChange(event: React.ChangeEvent<HTMLInputElement>, data): void {
        this.setState({ addressLabel: data.value });
    }

    @autobind
    onApiKeyChange(event: React.ChangeEvent<HTMLInputElement>, data): void {
        this.setState({ apiKey: data.value });
    }

    render() {
        const cssClasses = `Header ${this.props.className}`;

        return (
            <header className={cssClasses}>
                <h2 style={{ float: 'left' }}>Dashboard</h2>
                <Button primary
                        onClick={() => { this.setState({ modalOpen: true }); }}
                        floated={'right'}
                        labelPosition={'left'}
                        label={'Generate New Address'}
                        icon={'add square'} />
                <Modal
                    open={this.state.modalOpen}
                    dimmer={'blurring'}
                    basic
                    size="small"
                    closeOnDimmerClick={true}>
                    <Modal.Content>
                        <h3 className="header">Do you wish to create a new bitcoin wallet address (block.io only)?</h3>
                        <p>If so, please enter your block.io API Key and a custom label (optional) and click "YES" below.</p>
                        <Input fluid
                               value={this.state.apiKey}
                               onChange={this.onApiKeyChange}
                               placeholder="e.g., d83f-9301-959c-cbe3"/>
                               <br />
                        <Input fluid
                               value={this.state.addressLabel}
                               onChange={this.onLabelChange}
                               placeholder="e.g., My-new-address"/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color="red" inverted onClick={this.resetState}>
                            Cancel
                        </Button>
                        <Button disabled={!this.state.apiKey.length} color="green" inverted onClick={this.handleConfirmGenerateAddress}>
                            <Icon name="plus square" /> Generate New Address
                        </Button>
                    </Modal.Actions>
                </Modal>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        generateNewAddress: bindActionCreators(generateNewAddress, dispatch),
        addAddress: bindActionCreators(addAddress, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
