import {combineReducers} from 'redux';
import DashReducer from './reducer_dash';

export interface IAction {
    type: string;
    payload?: any;
    error?: any;
    meta?: any;
}

const rootReducer = combineReducers({
    // all dashboard info
    dash: DashReducer
});

export default rootReducer;
