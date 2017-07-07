import * as React from 'react';

interface ISettingsProps {
}

interface ISettingsState {
}

export default class Settings extends React.Component<ISettingsProps, ISettingsState> {

    // Lifecycle method that fires right before rendered to DOM the FIRST time
    // Not called on subsequent re-renders
    componentWillMount() {
        // this.props.fetchPosts();
    }

    render() {
        return (
            <div className="Settings">
               Settings
            </div>
        );
    }
}
