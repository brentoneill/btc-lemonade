import * as React from 'react';
import { Link } from 'react-router';

import './styles/Header.scss';

interface IProps {
    className?: string;
}

interface IState {}

class Header extends React.Component<IProps, IState> {
    render() {
        const cssClasses = `Header ${this.props.className}`;

        return (
            <header className={cssClasses}>
                <h3>Dashboard</h3>
            </header>
        );
    }
}

export default Header;
