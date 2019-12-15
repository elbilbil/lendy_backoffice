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
import { Map, GoogleApiWrapper, Marker , InfoWindow} from 'google-maps-react';
import Button from 'components/CustomButton/CustomButton';
import _ from 'lodash';

import {connect} from "react-redux";
import InfoWindowEx from "../components/Card/InfoWindowEx";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';


const mapStyles = {
    width: 1180,
    height: 600,
};

class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            address: '',
            latLng : {lat: 43.3, lng: 5.4}
        };
        this.renderPins = this.renderPins.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }


    componentDidMount() {
        this.props.myProps.getDrivers(() => {
            this.props.myProps.getLenders(() => {
            });
        })
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }


    renderPins(google) {
        var markers = [];
        const lenderArray = [];
        const driverArray = [];
        if (this.props.lenders === "") {
            return (<></>);
        } else {

            this.props.drivers.forEach((prop, key) => {
                driverArray.push(<Marker
                    key={prop.id}
                    onClick={this.onMarkerClick}
                    title={prop.fullName}
                    name={prop.fullName}
                    position={{ lat: prop.location.latitude, lng: prop.location.longitude}}
                    icon={{
                        url: "/marker-chauffeur.png",
                        anchor: new google.maps.Point(32,32),
                        scaledSize: new google.maps.Size(34,34)
                    }}
                    id={prop.id}
                    type={prop.type}
                />)
            });

            this.props.lenders.forEach((prop, key) => {
                lenderArray.push(<Marker
                    key={prop.id}
                    onClick={this.onMarkerClick}
                    title={prop.fullName}
                    name={prop.fullName}
                    position={{ lat: prop.location.latitude, lng: prop.location.longitude}}
                    icon={{
                        url: "/marker-preteur.png",
                        anchor: new google.maps.Point(32,32),
                        scaledSize: new google.maps.Size(34,34)
                    }}
                    id={prop.id}
                    type={prop.type}
                />)
            });
        }
        if (this.state.selected === '')
            markers = _.union(lenderArray, driverArray);
        else if (this.state.selected === 'drivers')
            markers = driverArray;
        else if (this.state.selected === 'lenders')
        {
            markers = lenderArray;
        }
        return markers;
    }

    redirectToTarget(id){
        this.props.history.push(`/admin/userprofile/${id}`)
    }


    handleChange = address => {
        this.setState({ address });
    };

    handleSelect(address) {
        this.setState({address: address});
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then((latLng) => {this.setState({latLng: latLng})})
            .catch(error => console.error('Error', error));
    };

    render() {
        const searchStyle = {
            width : '400px',
            margin: '20px'
        };

        return (
            <div>
            <Button onClick={() => {this.setState({selected: ''})}}>Tout le monde</Button>
            <Button onClick={() => {this.setState({selected: 'lenders'})}} bsStyle="danger">Prêteurs</Button>
            <Button onClick={() => {this.setState({selected: 'drivers'})}} bsStyle="primary">Chauffeurs</Button>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    searchOptions={{types: ['address'], componentRestrictions: {country: ['fr']}}}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                style={searchStyle}
                                {...getInputProps({
                                    placeholder: 'Recherche par adressse ...',
                                    className: 'location-search-input',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            <Map
                google={this.props.google}
                zoom={12}
                style={mapStyles}
                center={{ lat: this.state.latLng.lat, lng: this.state.latLng.lng}}
            >
                {this.renderPins(this.props.google)}
                <InfoWindowEx
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                        <p>{this.state.selectedPlace.type}</p>
                        <Button onClick={() =>  {
                            this.redirectToTarget(this.state.selectedPlace.id)
                        }}>Voir le profil
                        </Button>
                    </div>
                </InfoWindowEx>
            </Map>
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

export default connect(mapStateToProps)(GoogleApiWrapper({
    apiKey: 'AIzaSyCztRpaXkxh9IhAns4buznZi1eAnXKj_fA'
})(Maps));

