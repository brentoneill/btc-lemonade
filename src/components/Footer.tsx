import * as React from 'react';
import { Link } from 'react-router';

interface IProps {
    className?: string;
}

interface IState {}

class Footer extends React.Component<IProps, IState> {
    render(): JSX.Element {
        const cssClasses = `Footer ${this.props.className}`;

        return (
            <footer className={cssClasses}>
                <nav>
                </nav>
            </footer>
        );
    }
}

export default Footer;
