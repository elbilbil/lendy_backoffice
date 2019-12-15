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
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";
import {connect} from "react-redux";
import TableContrats from "../components/Table/TableContrats";
import TableCourses from "../components/Table/TableCourses";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    this.props.myProps.getUser(() => {
        console.log(this.props.user);
    }, {userId: this.props.match.params.userId});
  }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.match.params.userId !== this.props.user.id)
          this.props.myProps.getUser(() => {
              console.log(this.props.user);
          }, {userId: this.props.match.params.userId});
  }

    renderUser(){
    if (this.props.user === "")
    {
      return (<></>);
    }
    else{
      return (
          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={8}>
                  <Card
                      title="Contrats"
                      content={
                        <TableContrats {...this.props}/>
                      }
                  />
                    <Card
                        title="Courses"
                        content={
                            <TableCourses {...this.props}/>
                        }
                    />
                </Col>
                <Col md={4}>
                  <UserCard
                      bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                      avatar="http://5.135.190.137/user/static/images/users/img-1576131725830.png"
                      name={this.props.user.firstname}
                      userName={this.props.user.lastname}
                      description={
                        <span>
                          {this.props.user.type}
                        </span>
                      }
                  />
                </Col>
              </Row>
            </Grid>
          </div>
      );
    }
  }

  render() {
    return (
        <div>{this.renderUser()}</div>
        );
  }
}

function mapStateToProps(state) {
  return {
    myself: state.myself,
    user: state.user.user,
    contrats: state.user.contrats,
    courses: state.user.courses
  }
}
export default connect(mapStateToProps)((UserProfile));
