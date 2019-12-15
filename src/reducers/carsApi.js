import {GET_CAR_MAKES, GET_CAR_MODELS, GET_CAR_TRIMS, GET_CAR_MODEL} from "../actions/types";

const INITIAL_STATE = {
    makes: '',
    models: '',
    trims: '',
    model: ''
};

export default function(state = INITIAL_STATE, action){
    switch(action.type)
    {
        case GET_CAR_MAKES:
            return {...state, makes : action.payload};
        case GET_CAR_MODELS:
            return {...state, models: action.payload};
        case GET_CAR_TRIMS:
            return {...state, trims: action.payload};
        case GET_CAR_MODEL:
            return {...state, model: action.payload};
        default:
            return state
    }
}