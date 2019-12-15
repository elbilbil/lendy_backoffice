import {GET_LENDERS} from "../actions/types";

const INITIAL_STATE = {
    lenders: ''
};

export default function(state = INITIAL_STATE, action){
    switch(action.type)
    {
        case GET_LENDERS:
            return {...state, lenders: action.payload};
        default:
            return state
    }
}