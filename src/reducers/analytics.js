import {NUMBER_USERS, NUMBER_CONVOS,LOCATIONS, NUMBER_CONTRACTS, CONTRACTS_DETAILS,NUMBER_RUNS, RUNS_DETAILS} from "../actions/types";

const INITIAL_STATE = {
    numberUsers: '',
    numberConvos: '',
    locations:'',
    numberContracts: '',
    contractsDetails: '',
    numberRuns: '',
    runsDetails: ''
};

export default function(state = INITIAL_STATE, action){
    switch(action.type)
    {
        case NUMBER_USERS:
            return {...state, numberUsers: action.payload};
        case NUMBER_CONVOS:
            return {...state, numberConvos: action.payload};
        case LOCATIONS:
            return {...state, locations: action.payload};
        case NUMBER_CONTRACTS:
            return {...state, numberContracts: action.payload};
        case CONTRACTS_DETAILS:
            return {...state, contractsDetails: action.payload};
        case NUMBER_RUNS:
            return {...state, numberRuns: action.payload};
        case RUNS_DETAILS:
            return {...state, runsDetails: action.payload};
        default:
            return state
    }
};
