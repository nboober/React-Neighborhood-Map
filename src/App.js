import React, { Component } from 'react';
import hamburger from './Hamburger_icon.png';
import './App.css';
import $ from 'jquery';
import { List } from './List';
//I found the google-maps-react module from https://www.npmjs.com/package/google-maps-react
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class App extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    initialCenter: {
      lat: 39.1883841,
      lng: -77.2407077
    }
  };

  componentDidMount() {
    $('.hamburger').on('click', ()=>{
      $('.listViewBar').slideToggle(1000);
    })
  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {

    const style = {
      width: '100%',
      height: 'auto'
    }

    let locations = [
      {
        name: "My Neighborhood",
        title: "My Neighborhood",
        position: this.state.initialCenter
      },
      {
        name: "Daly Elementary School",
        title: "Daly Elementary School",
        position: {lat: 39.188864, lng: -77.2344043}
      },
      {
        name: 'Neelsville Middle School',
        title: 'Neelsville Middle School',
        position: {lat: 39.194103, lng: -77.2429888}
      },
      {
        name: 'Cider Barrel Landmark',
        title: 'Cider Barrel Landmark',
        position: {lat: 39.190063, lng: -77.241919}
      },
      {
        name: 'Best Buy',
        title: 'Best Buy',
        position: {lat: 39.1988538, lng: -77.2484713}
      },
      {
        name: 'Jersey Mike\'s Subs',
        title: 'Jersey Mike\'s Subs',
        position: {lat: 39.200285, lng: -77.2466828}
      }
    ]

    return (
      <div className="App">
        <header className="App-header">
          <img className="hamburger" src={hamburger} alt="hamburger icon" />
            <div className="title">My Neighborhood App</div>

          <div className="listViewBar" style={{display: "none"}}>
            <List locations= {locations} center={this.state.initialCenter}/>
          </div>
        </header>

        <div className="mapArea" ref='map'>
          <Map google={this.props.google} zoom={15}
            style={style}
            initialCenter={
              this.state.initialCenter
            }
            onClick={this.onMapClicked}
          >

             {locations.map(marker => (
              <Marker
                key = {marker.name}
                title = {marker.title}
                name = {marker.name}
                position = {marker.position}
                onClick={this.onMarkerClick}
              />
             ))}

            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                  <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                  </div>
              </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyC9Mj0z9LIsiHif3l_FiDMJL4l4o083lOA')
})(App)
