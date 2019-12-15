import {GET_CONVERSATIONS_UNREAD, GET_CONVERSATION, GET_CONVERSATIONS} from "./types";

import axios from 'axios';
const BASE_URL = 'http://api.lendy.fr:27031/api';
//const BASE_URL = 'http://localhost:27031/api';


export const unreadMessages = (callback) => async dispatch => {
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.get(
            BASE_URL+'/users/newDiscussion',
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );

        dispatch({ type: GET_CONVERSATIONS_UNREAD, payload: response.data });
        callback();
    } catch (e) {
        console.log(e)
    }
};

export const getConversations = (callback) => async dispatch => {
    let tokenStr = localStorage.getItem('token');
    try {
        const response = await axios.get(
            BASE_URL+'/users/discussion',
            {headers: {"Authorization": `Bearer ${tokenStr}`}}
        );

        dispatch({ type: GET_CONVERSATIONS, payload: response.data });
        callback();
    } catch (e) {
        console.log(e)
    }
};

export const getConversation = (callback, param) => async dispatch => {
    let tokenStr = localStorage.getItem('token');
    const webApiUrl = BASE_URL+'/users/message'
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenStr}`
    }
    try {
        const response = await axios.get(
            webApiUrl,
            {headers: headers, params: param}
        );

        dispatch({ type: GET_CONVERSATION, payload: response.data });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const postMessage = (callback, data) => async dispatch => {
    let tokenStr = localStorage.getItem('token');
    console.log(tokenStr);
    const webApiUrl = BASE_URL+'/users/message';
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenStr}`
    };
    try {
        await axios.post(
            webApiUrl,
            data,
            {headers: headers}
        );
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

