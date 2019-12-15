/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import reducers from './reducers';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';

import {BrowserRouter, Route, Switch, Redirect, HashRouter} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import Signin from "./layouts/Signin";

const store = createStore(reducers, {
    //On récupere le token qu'on a stocké en local storage s'il existe pour boot l'application avec en mode connecté
    auth: {authenticated: localStorage.getItem('token')}
}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path="/" exact render={props => <AdminLayout {...props} />}/>
                <Route path="/admin" render={props => <AdminLayout {...props} />}/>
                <Route path="/dashboard" render={props => <AdminLayout {...props} />}/>
                <Route path="/login" render={props => <Signin {...props} />}/>
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById("root")
);
