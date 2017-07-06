import * as React from 'react';
import { connect } from 'react-redux';

interface IStatsProps {
    fetchPosts?: any;
}

interface IStatsState {

}

export default class Stats extends React.Component<IStatsProps, IStatsState> {

    // Lifecycle method that fires right before rendered to DOM the FIRST time
    // Not called on subsequent re-renders
    componentWillMount() {
        // this.props.fetchPosts();
    }

    render() {
        return (
            <div className="Stats">
               Stats
            </div>
        );
    }
}
