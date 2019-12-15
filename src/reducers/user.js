import {GET_MYSELF, GET_USER, GET_COURSES, GET_CONTRATS} from "../actions/types";


const INITIAL_STATE = {
    myself: '',
    user: '',
    courses: '',
    contrats: ''
};

export default function(state = INITIAL_STATE, action){
    switch(action.type)
    {
        case GET_MYSELF:
            return {...state, myself: action.payload};
        case GET_USER:
            return {...state, user: action.payload};
        case GET_COURSES:
            return {...state, courses: action.payload};
        case GET_CONTRATS:
            return {...state, contrats: action.payload};
        default:
            return state
    }
}
