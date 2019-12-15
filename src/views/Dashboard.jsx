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
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import {connect} from "react-redux";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderCards = this.renderCards.bind(this);
    this.renderPie = this.renderPie.bind(this);
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  componentDidMount() {
    if (this.props.analytics.numberUsers === '') {
      this.props.myProps.getNumberUsers(() => {
        this.props.myProps.getNumberRuns(() => {
          this.props.myProps.getRunsDetails(() => {
            this.props.myProps.getNumberContracts(() => {
              this.props.myProps.getContractsDetails(() => {
                this.props.myProps.getLocations(() => {
                  this.props.myProps.getNumberConvos(() => {
                    console.log(this.props);
                  })
                })
              })
            })
          })
        })
      })
    }
  }

  renderCards(){
    if (this.props.analytics.numberUsers === '')
      return (<></>);
    else {
      return (
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                  bigIcon={<i className="pe-7s-server text-warning"/>}
                  statsText="Nombre d'utilisateurs"
                  statsValue={this.props.analytics.numberUsers.numberUsers}
                  statsIcon={<i className="fa fa-refresh"/>}
                  statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                  bigIcon={<i className="pe-7s-wallet text-success"/>}
                  statsText="Nombre de conversations"
                  statsValue={this.props.analytics.numberConvos}
                  statsIcon={<i className="fa fa-refresh"/>}
                  statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                  bigIcon={<i className="pe-7s-graph1 text-danger"/>}
                  statsText="Nombre de contrats"
                  statsValue={this.props.analytics.numberContracts}
                  statsIcon={<i className="fa fa-refresh"/>}
                  statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                  bigIcon={<i className="fa fa-twitter text-info"/>}
                  statsText="Nombre de courses"
                  statsValue={this.props.analytics.numberRuns}
                  statsIcon={<i className="fa fa-refresh"/>}
                  statsIconText="Updated now"
              />
            </Col>
          </Row>
      );
    }
  }

  renderPie(){
    if (this.props.analytics.numberUsers === '')
      return (<></>);
    else {

      const dataPie = {
        labels: [this.props.analytics.numberUsers.preteur, this.props.analytics.numberUsers.emprunteur],
        series: [this.props.analytics.numberUsers.preteur, this.props.analytics.numberUsers.emprunteur]
      };

      const legendPie = {
        names: ["Preteurs", "Chauffeurs"],
        types: ["info", "danger"]
      };

      return (
          <Col md={4}>
            <Card
                statsIcon="fa fa-clock-o"
                title="Repartition des utilisateurs"
                category=""
                stats="Updated now"
                content={
                  <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie"/>
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
            />
          </Col>
      )
    }
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          {this.renderCards()}
          <Row>
            {this.renderPie()}
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myself: state.myself,
    analytics: state.analytics
  }
}

export default connect(mapStateToProps)((Dashboard));
