import {GET_CAR_MAKES, GET_CAR_MODELS, GET_CAR_TRIMS, GET_CAR_MODEL} from "./types";
import axios from 'axios';


export const getMakes = (callback) => async dispatch => {
    let webApiUrl = 'https://cors-anywhere.herokuapp.com/https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes';
    try {
        const response = await axios.get(
            webApiUrl
        );
        var jsonMakes = JSON.parse(response.data.substr(2).slice(0, -2));
        //console.log(response.data);
        dispatch({ type: GET_CAR_MAKES, payload: jsonMakes.Makes });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const getModels = (make, callback) => async dispatch => {
    let webApiUrl = 'https://cors-anywhere.herokuapp.com/https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make='+make;
    try {
        const response = await axios.get(
            webApiUrl
        );
        var jsonMakes = JSON.parse(response.data.substr(2).slice(0, -2));
        dispatch({ type: GET_CAR_MODELS, payload: jsonMakes.Models });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const getTrims = (make, model, callback) => async dispatch => {
    let webApiUrl = 'https://cors-anywhere.herokuapp.com/https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&make='+make+'&model='+model;
    try {
        const response = await axios.get(
            webApiUrl
        );
        var jsonMakes = JSON.parse(response.data.substr(2).slice(0, -2));
        dispatch({ type: GET_CAR_TRIMS, payload: jsonMakes.Trims });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};

export const getModel = (model, callback) => async dispatch => {
    let webApiUrl = 'https://cors-anywhere.herokuapp.com/https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModel&model='+model;
    try {
        const response = await axios.get(
            webApiUrl
        );
        var jsonMakes = JSON.parse(response.data.substr(2).slice(0, -2));
        dispatch({ type: GET_CAR_MODEL, payload: jsonMakes[0] });
        callback();
    }
    catch (e)
    {
        console.log(e);
    }
};