import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth from './auth';
import drivers from './drivers';
import lenders from './lenders';
import myself from './user';
import user from './user';
import carApi from './carsApi';
import conversations from './conversations';
import analytics from './analytics';

export default combineReducers({
    auth: auth,
    form: formReducer,
    drivers: drivers,
    myself: myself,
    carApi: carApi,
    lenders: lenders,
    conversations: conversations,
    analytics,
    user: user,
});
