import React, { Component } from 'react';
import hamburger from './Hamburger_icon.png';
import './App.css';
import $ from 'jquery';
import axios from 'axios';
import { List } from './List';
//I found the google-maps-react module from https://www.npmjs.com/package/google-maps-react
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      initialCenter: {
        lat: 39.1883841,
        lng: -77.2407077
    },
      input: "",
    }
    this.getVenues = this.getVenues.bind(this);
}

  componentDidMount() {
    $('.hamburger').on('click', ()=>{
      $('.listViewBar').slideToggle(1000);
    })
    this.getVenues()
  }

  onMarkerClick = (props, position, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: position,
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

  getVenues = () =>{
    let lat = this.state.initialCenter.lat;
    let lng = this.state.initialCenter.lng;
    let latlng = lat + "," + lng;

    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "LRHE1U0H3SYJJCP1IODLD03CZS503LZ4LUYCXHVC3J51RKBM",
      client_secret: "DX4B5ES0CY51EQWZGPGCR5E2S5QW3WXVCU3TJMS3RGYA1AIZ",
      query: "food",
      ll: latlng,
      v: "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        console.log(response.data.response.groups[0].items);
      }).catch(error => {
        console.log("ERROR " + error);
      })

  }

  render() {

    const style = {
      width: '100%',
      height: 'auto'
    }

    let locations = [
      {
        name: "my neighborhood",
        title: "My Neighborhood",
        position: this.state.initialCenter
      },
      {
        name: "daly elementary school",
        title: "Daly Elementary School",
        position: {lat: 39.188864, lng: -77.2344043}
      },
      {
        name: 'neelsville middle school',
        title: 'Neelsville Middle School',
        position: {lat: 39.194103, lng: -77.2429888}
      },
      {
        name: 'cider barrel landmark',
        title: 'Cider Barrel Landmark',
        position: {lat: 39.190063, lng: -77.241919}
      },
      {
        name: 'best buy',
        title: 'Best Buy',
        position: {lat: 39.1988538, lng: -77.2484713}
      },
      {
        name: 'jersey mike\'s subs',
        title: 'Jersey Mike\'s Subs',
        position: {lat: 39.200285, lng: -77.2466828}
      }
    ]

    let searchedList = [];
    console.log(searchedList);

    for(let i = 0; i < locations.length; i++){
      if(locations[i].name.match(this.state.input)){
        console.log(locations[i]);
        searchedList.push(locations[i]);
        console.log(searchedList);
      }
    }

    let search = (e) => {
      this.setState({
        input: e.target.value,
        showingInfoWindow: false
      })
    };



    return (
      <div className="App">
        <header className="App-header">
          <img className="hamburger" src={hamburger} alt="hamburger icon" />
            <div className="title">My Neighborhood App</div>

          <div className="listViewBar" style={{display: "none"}}>
            <form>
              <input type="text" placeholder="Search By Location Here..." onChange={search} value={this.state.input}/>
            </form>
            <List infoWindow={this.state.showingInfoWindow} marker={this.state.activeMarker} place={this.state.selectedPlace} locations= {searchedList} center={this.state.initialCenter} onHandleClick={this.onMarkerClick}/>
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

             {searchedList.map(marker => (
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
                    <h1>{this.state.selectedPlace.title}</h1>
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
