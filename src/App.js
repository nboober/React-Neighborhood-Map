import React, { Component } from 'react';
import hamburger from './Hamburger_icon.png';
import './App.css';
import $ from 'jquery';
import { List } from './List';
import { MapContainer } from './mapContainer';
//I found the react-google-maps module from https://medium.com/@yelstin.fernandes/render-a-map-component-using-react-google-maps-5f7fb3e418bb
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {lat: 39.1883841,
                  lng: -77.2407077
                }
  }

  componentDidMount() {
    $('.hamburger').on('click', ()=>{
      $('.listViewBar').slideToggle(1000);
    })
  }

  render() {

    $('.hamburger').on('click', ()=>{
      $('.listViewBar').toggle();
    })

    return (
      <div className="App">
        <header className="App-header">
          <img className="hamburger" src={hamburger} alt="hamburger icon" />
        </header>
        <div className="listViewBar" style={{display: "none"}}>
          <List/>
        </div>
        <div className="mapArea" >
          <MapContainer lat={this.state.lat} lng={this.state.lng}/>
        </div>
      </div>
    );
  }
}

export default App;
