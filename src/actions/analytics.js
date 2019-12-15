import {NUMBER_USERS, NUMBER_CONVOS,LOCATIONS, NUMBER_CONTRACTS, CONTRACTS_DETAILS,NUMBER_RUNS, RUNS_DETAILS } from "./types";

import axios from 'axios';
const BASE_URL = 'http://api.lendy.fr:27031/api';


export const getNumberUsers = (callback) => async dispatch => {
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.get(
            BASE_URL+'/analytics/users_stats',
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );

        dispatch({ type: NUMBER_USERS, payload: response.data });
        callback();
    } catch (e) {
        console.log(e);
    }
};

export const getNumberConvos = (callback) => async dispatch => {
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.get(
            BASE_URL+'/analytics/users_messages_stats',
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );

        dispatch({ type: NUMBER_CONVOS, payload: response.data.messages });
        callback();
    } catch (e) {
        console.log(e);
    }
};

export const getNumberRuns = (callback) => async dispatch => {
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.get(
            BASE_URL+'/analytics/runs',
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );

        dispatch({ type: NUMBER_RUNS, payload: response.data });
        callback();
    } catch (e) {
        console.log(e);
    }
};

export const getRunsDetails = (callback) => async dispatch => {
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.get(
            BASE_URL+'/analytics/runs_details',
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );

        dispatch({ type: RUNS_DETAILS, payload: response.data });
        callback();
    } catch (e) {
        console.log(e);
    }
};

export const getNumberContracts = (callback) => async dispatch => {
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.get(
            BASE_URL+'/analytics/contracts',
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );


        dispatch({ type: NUMBER_CONTRACTS, payload: response.data });
        callback();
    } catch (e) {
        console.log(e);
    }
};

export const getContractsDetails = (callback) => async dispatch => {
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.get(
            BASE_URL+'/analytics/contracts',
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );

        dispatch({ type: CONTRACTS_DETAILS, payload: response.data });
        callback();
    } catch (e) {
        console.log(e);
    }
};

export const getLocations = (callback) => async dispatch => {
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.get(
            BASE_URL+'/analytics/locations',
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );

        dispatch({ type: LOCATIONS, payload: response.data });
        callback();
    } catch (e) {
        console.log(e);
    }
};
