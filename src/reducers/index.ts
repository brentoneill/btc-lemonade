import {combineReducers} from 'redux';
import DashReducer from './reducer_dash';

const rootReducer = combineReducers({
    // all dashboard info
    dash: DashReducer
});

export default rootReducer;
