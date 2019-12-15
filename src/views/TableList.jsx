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

import Card from "components/Card/Card.jsx";
import {thArray, tdArray} from "variables/Variables.jsx";
import {connect} from "react-redux";
import {userRoutes} from "../routes";
import {NavLink} from "react-router-dom";
import SearchField from "react-search-field";
import _ from 'lodash';

class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchDriver: '',
            searchLender: ''
        };
        this.onChangeDrivers = this.onChangeDrivers.bind(this);
        this.onChangeLenders = this.onChangeLenders.bind(this);
        this.renderDrivers = this.renderDrivers.bind(this);
    }


    componentDidMount() {
        this.props.myProps.getDrivers(() => {
            this.props.myProps.getLenders(() => {
                this.setState({...this.state, drivers: this.props.drivers, lenders: this.props.lenders})
            });
        })
    }

    renderDrivers() {
        if (this.props.drivers === "") {
            return (<></>);
        } else {


            const search = this.state.searchDriver;

            const drivers = this.props.drivers;
            // ignore user's typing case
            const searchDriver = search.toLowerCase();
            const filteredDrivers = drivers.filter((drivers) => {
                    return (
                        drivers.firstname.toLowerCase().includes(searchDriver) ||
                        drivers.lastname.toLowerCase().includes(searchDriver) ||
                        drivers.fullName.toLowerCase().includes(searchDriver)
                    )
                }
            );

            return (
                filteredDrivers.map((prop, key) => {
                    return (
                        <tr key={prop.id}>
                            <td key={prop.id}>{prop.id}</td>
                            <td key={prop.fullName}>{prop.fullName}</td>
                            <td key={prop.username}>{prop.username}</td>
                            <td key={prop.location.latitude}>{prop.location.latitude}</td>
                            <td key={prop.location.longitude}>{prop.location.longitude}</td>
                            <NavLink
                                to={`userprofile/${prop.id}`}
                                className="nav-link"
                                activeClassName="active"
                            >
                                Voir
                            </NavLink>
                        </tr>
                    );
                }));
        }
    }

    renderLenders() {
        if (this.props.lenders === "") {
            return (<></>);
        } else {
            const search = this.state.searchLender;

            const lenders = this.props.lenders;
            // ignore user's typing case
            const searchLender = search.toLowerCase();
            const filteredLenders = lenders.filter(l => {
                    return (
                        l.firstname.toLowerCase().includes(searchLender) ||
                        l.lastname.toLowerCase().includes(searchLender) ||
                        l.fullName.toLowerCase().includes(searchLender)
                    )
                }
            );

            return (
                filteredLenders.map((prop, key) => {
                    return (
                        <tr key={prop.id}>
                            <td key={prop.id}>{prop.id}</td>
                            <td key={prop.fullName}>{prop.fullName}</td>
                            <td key={prop.username}>{prop.username}</td>
                            <td key={prop.location.latitude}>{prop.location.latitude}</td>
                            <td key={prop.location.longitude}>{prop.location.longitude}</td>
                            <NavLink
                                to={`userprofile/${prop.id}`}
                                className="nav-link"
                                activeClassName="active"
                            >
                                Voir
                            </NavLink>
                        </tr>
                    );
                }));
        }
    }

    onChangeDrivers(value, event) {
        this.setState({searchDriver: value});
    }

    onChangeLenders(value, event) {
        this.setState({searchLender: value});
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Chauffeurs sur Lendy"
                                category="Liste des derniers chauffeurs"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
                                        <SearchField
                                            placeholder='Recherche par prénom ou nom'
                                            onChange={this.onChangeDrivers}
                                        />
                                        <Table striped hover>
                                            <thead>
                                            <tr>
                                                {thArray.map((prop, key) => {
                                                    return <th key={key}>{prop}</th>;
                                                })}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.renderDrivers()}

                                            </tbody>
                                        </Table>
                                    </div>
                                }
                            />
                        </Col>

                        <Col md={12}>
                            <Card
                                plain
                                title="Prêteurs sur Lendy"
                                category="Liste des derniers prêteurs"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
                                        <SearchField
                                            placeholder='Recherche par prénom ou nom'
                                            onChange={this.onChangeLenders}
                                        />
                                        <Table hover>
                                            <thead>
                                            <tr>
                                                {thArray.map((prop, key) => {
                                                    return <th key={key}>{prop}</th>;
                                                })}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.renderLenders()}
                                            </tbody>
                                        </Table>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        myself: state.myself,
        drivers: state.drivers.drivers,
        lenders: state.lenders.lenders
    }
}

export default connect(mapStateToProps)((TableList));
