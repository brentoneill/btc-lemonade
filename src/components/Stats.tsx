import * as React from 'react';
import { connect } from 'react-redux';

interface IStatsProps {
    fetchPosts?: any;
}

interface IStatsState {

}

export default class Stats extends React.Component<IStatsProps, IStatsState> {
    render() {
        return (
            <div className="Stats">
               Stats
            </div>
        );
    }
}
