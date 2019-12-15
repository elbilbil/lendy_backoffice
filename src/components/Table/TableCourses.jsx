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
import React, {Component} from "react";
import {Grid, Row, Col, Table} from "react-bootstrap";

import Card from "../Card/Card.jsx";
import {thCourses} from "../../variables/Variables.jsx";
import {connect} from "react-redux";
import {userRoutes} from "../../routes";
import {NavLink} from "react-router-dom";
import * as moment from 'moment';
import 'moment/locale/fr';

class TableCourses extends Component {
    constructor(props) {
        moment.locale('fr');
        super(props);
        this.state = {};
        this.renderOther = this.renderOther.bind(this);
    }

    componentDidMount() {
        //console.log(this.props);
        this.props.myProps.getCourses(() => {
            console.log(this.props);
        }, {userId: this.props.match.params.userId});
    }

    renderOther(members){
        if (members[0].id === this.props.match.params.userId)
            return (
                <td key={members[1]._id}>
                    <NavLink
                        to={`/admin/userprofile/${members[1].id}`}
                        className="nav-link"
                        activeClassName="active"
                    >
                        {members[1].fullName}
                    </NavLink>
                </td>
            )
        else
            return (
                <td key={members[0]._id}>
                    <NavLink
                        to={`/admin/userprofile/${members[0].id}`}
                        className="nav-link"
                        activeClassName="active"
                    >
                        {members[0].fullName}
                    </NavLink>
                </td>
            )
    }

    renderTable() {
        return (
            this.props.courses.map((prop, key) => {
                const since = moment.unix(prop.meetingTime);
                const to = moment.unix(prop.to);
                return (
                    <tr key={prop._id}>
                        <td key={key}>{prop._id}</td>
                        {this.renderOther(prop.members)}
                        <td key={prop.meetingTime}>{since.format('DD/MM/YYYY')}</td>
                        <td key={key}>{prop.meetingPlace.address}</td>
                        <td key={key}>{prop.destPlace.address}</td>
                        <td key={prop.state}>{prop.state}</td>
                    </tr>
                );
            }));
    }

    renderContracts() {
        if (this.props.user === "") {
            return (<div></div>);
        } else {
            if (this.props.courses.length === 0) {
                return (
                    <div>
                        <p>Cet utilisateur n'a pas encore eu de courses</p>
                    </div>
                );
            } else {
                return (
                    <Card
                        title=""
                        category="Liste des dernieres courses"
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <Table striped hover>
                                <thead>
                                <tr>
                                    {thCourses.map((prop, key) => {
                                        return <th key={key}>{prop}</th>;
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderTable()}
                                </tbody>
                            </Table>
                        }
                    />
                );
            }
        }
    }

    render() {
        return (
            <div>
                {this.renderContracts()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        courses: state.user.courses
    }
}

export default connect(mapStateToProps)((TableCourses));
