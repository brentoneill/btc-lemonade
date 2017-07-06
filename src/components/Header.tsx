import * as React from 'react';
import { Link } from 'react-router';
import { Button, Modal, Icon } from 'semantic-ui-react';

import './styles/Header.scss';

interface IProps {
    className?: string;
}

interface IState {}

class Header extends React.Component<IProps, IState> {
    render() {
        const cssClasses = `Header ${this.props.className}`;
        // Button that triggers the modal
        const trigger = (
            <Button primary
                    floated={'right'}
                    labelPosition={'left'}
                    label={'Generate New Address'}
                    icon={'add square'} />
        );

        return (
            <header className={cssClasses}>
                <h2 style={{ float: 'left' }}>Dashboard</h2>
                <Modal trigger={trigger}
                    dimmer={'blurring'}
                    basic
                    size="small"
                    closeOnDimmerClick={true}>
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
            </header>
        );
    }
}

export default Header;
