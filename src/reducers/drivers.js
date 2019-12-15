import {GET_DRIVERS} from "../actions/types";

const INITIAL_STATE = {
    drivers: '',
    myself: '',
    driver: '',
};

export default function(state = INITIAL_STATE, action){
    switch(action.type)
    {
        case GET_DRIVERS:
            return {...state, drivers: action.payload};
        default:
            return state
    }
}
