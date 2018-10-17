import React, { Component } from 'react';
import hamburger from './Hamburger_icon.png';
import './App.css';
import $ from 'jquery';
import { List } from './List';
import { MapContainer } from './mapContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {center: {lat: 39.1883841,
                          lng: -77.2407077}
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
          <MapContainer center={this.state.center}/>
        </div>
      </div>
    );
  }
}

export default App;
