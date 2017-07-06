import * as React from 'react';
import { connect } from 'react-redux';

interface ISettingsProps {
}

interface ISettingsState {
}

class Settings extends React.Component<ISettingsProps, ISettingsState> {

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

function mapStateToProps(state) {
    return {};
}

// 1st arg is mapStateToProps, 2nd is mapDispatchToProps
export default connect(mapStateToProps, {
})(Settings);

// NOTE: What is the difference between functional and class based components?

// Functional component - above is an example of class based
// export default () => {
//     return <div>List of blog posts</div>;
// };
