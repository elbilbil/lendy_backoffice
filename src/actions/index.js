import {
    AUTH_USER,
    AUTH_ERROR,
    GET_DRIVERS,
    GET_MYSELF,
    GET_LENDERS,
    GET_USER,
    GET_CONTRATS,
    GET_COURSES
} from "./types";

import axios from 'axios';
const BASE_URL = 'http://api.lendy.fr:27031/api';
//const BASE_URL = 'http://localhost:27031/api';
export * from './carApiActions';
export * from './conversationActions';
export * from './analytics';


export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(
            BASE_URL+'/users/register',
            formProps
        );

        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(
            BASE_URL+'/users/login',
            formProps
        );

        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials'});
    }
};

export const getDrivers = (callback, params) => async dispatch => {
    let webApiUrl = BASE_URL+'/users/drivers';
    let tokenStr = localStorage.getItem('token');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenStr}`
    }
    try {
        const response = await axios.get(
            webApiUrl,
            {headers: headers, params: params}
            );
        dispatch({ type: GET_DRIVERS, payload: response.data });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const getLenders = (callback, params) => async dispatch => {
    let webApiUrl = BASE_URL+'/users/lenders';
    let tokenStr = localStorage.getItem('token');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenStr}`
    }
    try {
        const response = await axios.get(
            webApiUrl,
            {headers: headers, params: params}
        );
        dispatch({ type: GET_LENDERS, payload: response.data });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const getMyself = (callback) => async dispatch => {
    let webApiUrl = BASE_URL+'/users/myself';
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.get(
            webApiUrl,
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );
        dispatch({ type: GET_MYSELF, payload: response.data });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const getUser = (callback, param) => async dispatch => {
    let webApiUrl = BASE_URL+'/users/info';
    let tokenStr = localStorage.getItem('token');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenStr}`
    }
    try {
        const response = await axios.get(
            webApiUrl,
            {headers: headers, params: param}
        );
        dispatch({ type: GET_USER, payload: response.data });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const getCourses = (callback, param) => async dispatch => {
    let webApiUrl = BASE_URL+'/users/user_courses';
    let tokenStr = localStorage.getItem('token');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenStr}`
    }
    try {
        const response = await axios.get(
            webApiUrl,
            {headers: headers, params: param}
        );
        console.log(response.data);
        dispatch({ type: GET_COURSES, payload: response.data });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const getContrats = (callback, param) => async dispatch => {
    let webApiUrl = BASE_URL+'/users/user_contract';
    let tokenStr = localStorage.getItem('token');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenStr}`
    }
    try {
        const response = await axios.get(
            webApiUrl,
            {headers: headers, params: param}
        );
        dispatch({ type: GET_CONTRATS, payload: response.data });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const getUsers = (callback, param) => async dispatch => {
    let webApiUrl = BASE_URL+'/users/info';
    let tokenStr = localStorage.getItem('token');
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenStr}`
    }
    try {
        const response = await axios.get(
            webApiUrl,
            {headers: headers, params: param}
        );
        //return response.data;
        callback(response.data);
    }
    catch (e)
    {
        console.log(e);
    }
};

export const setCarUser = (values, callback) => async dispatch => {
    let webApiUrl = BASE_URL+'/users/update';
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.patch(
            webApiUrl,
            values,
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );
        dispatch({ type: GET_MYSELF, payload: response.data });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const updateUser = (values, callback) => async dispatch => {
    let webApiUrl = BASE_URL+'/users/update';
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.patch(
            webApiUrl,
            values,
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );
        dispatch({ type: GET_MYSELF, payload: response.data });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const signout = () => {
    localStorage.removeItem('token');
    return {
        type:AUTH_USER,
        payload:''
    }
};





