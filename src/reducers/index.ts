import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import DashReducer from './reducer_dash';

const rootReducer = combineReducers({
    // all dashboard info
    dash: DashReducer,
    // toaster reducer (for notification messages)
    toastr: toastrReducer
});

export default rootReducer;
