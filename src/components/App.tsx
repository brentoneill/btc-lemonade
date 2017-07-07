import * as React from 'react';

import './styles/main.scss';
import 'react-redux-toastr/src/styles/index';

interface IAppProps {}

interface IAppState {}

export default class App extends React.Component<IAppState, IAppProps> {

    private socketBlockChainInfo;

    constructor(props: IAppProps) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {
        return (
            <div className="App__container">
                {this.props.children}
            </div>
        );
    }
}
