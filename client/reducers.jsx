import { combineReducers } from 'redux';

import count from './components/count/reducer';
import async from './components/async/reducer';

const rootReducer = combineReducers({
    count,
    async,
});

export default rootReducer;
