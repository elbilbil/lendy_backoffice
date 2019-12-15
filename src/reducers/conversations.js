import {GET_CONVERSATIONS_UNREAD, GET_CONVERSATION, GET_CONVERSATIONS} from "../actions/types";

const INITIAL_STATE = {
    unread: '',
    total:'',
    current:''
};

export default function(state = INITIAL_STATE, action){
    switch(action.type)
    {
        case GET_CONVERSATIONS_UNREAD:
            return {...state, unread: action.payload};
        case GET_CONVERSATIONS:
            return {...state, total: action.payload};
        case GET_CONVERSATION:
            return {...state, current: action.payload};
        default:
            return state
    }
}