import * as React from 'react';

export default class App extends React.Component<{}, {}> {

    render(): JSX.Element {
        return (
            <div className="Base">
                {this.props.children}
            </div>
        );
    }
}
