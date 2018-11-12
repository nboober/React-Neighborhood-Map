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
        lat: 39.18839,
        lng: -77.23853
      },
      input: "",
      venues: [],
      venuePhotos: []
    }
}

  componentDidMount() {
    //Controls Hamburger Icon
    $('.hamburger').on('click', ()=>{
      $('.listViewBar').slideToggle(1000);
    });
    //Calls getValues function
    this.getVenues();
    //Calls getVenuePhotos function
    this.getVenuePhotos();
  }

  //Marker Click Function
  onMarkerClick = (props, position, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: position,
    showingInfoWindow: true
  });

  //Map Click Function
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  //Get a list of Venues from Foursquare depending on the initialCenter Location
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
      v: "20182507",
      limit: 6,
      venuePhotos: 1
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        })
        console.log(response.data.response.groups[0].items);
      }).catch(error => {
        console.log("ERROR " + error);
      })

  }

  //Get a list of Photos from Foursquare
  getVenuePhotos = () =>{

    let venue_id = "4a8f42d4f964a520941420e3";

    const endPoint = "https://api.foursquare.com/v2/venues/"
    const parameters = {
      client_id: "LRHE1U0H3SYJJCP1IODLD03CZS503LZ4LUYCXHVC3J51RKBM",
      client_secret: "DX4B5ES0CY51EQWZGPGCR5E2S5QW3WXVCU3TJMS3RGYA1AIZ",
      v: "20182507"
    }

    let venues = this.state.venues;
    let id = [];


    for(let i = 0; i<venues.length; i++){
      console.log(venues[i].venue.id);
      id.push(venues[i].venue.id);
    }

    axios.get(endPoint + venue_id + "/photos?" + new URLSearchParams(parameters))
      .then(response => {
        console.log(response.data.response.photos.items[0]);
        this.setState({
          venuePhotos: response.data.response.photos.items[0]
        })
      }).catch(error => {
        console.log("ERROR " + error);
      })
  }

  render() {

    //Global Variables
    let venues = this.state.venues;
    console.log(venues);
    let photos = this.state.venuePhotos;
    console.log(photos);
    let pre = this.state.venuePhotos.prefix;
    console.log(pre);
    let suff = this.state.venuePhotos.suffix;
    let img = pre + "200x200" + suff;
    console.log(pre + "200x200" + suff);


    const style = {
      width: '100%',
      height: 'auto'
    }

    //Holds the Search Results. This adjusts the side Bar list and the markers shown
    let searchedList = [];
    console.log(searchedList);

    //Input function for Searchbar
    let search = (e) => {
      this.setState({
        input: e.target.value,
        showingInfoWindow: false
      })
    };

    //Search Bar Functionality
    for(let i = 0; i < venues.length; i++){
      if(venues[i].venue.name.match(this.state.input)){
        console.log(venues[i]);
        searchedList.push(venues[i]);
        console.log(searchedList);
      }
    }

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
          <Map google={this.props.google} zoom={14}
            style={style}
            initialCenter={
              this.state.initialCenter
            }
            onClick={this.onMapClicked}
          >

             {searchedList.map(marker => (

              <Marker
                key = {marker.venue.id}
                name = {marker.venue.name}
                position = {marker.venue.location}
                onClick={this.onMarkerClick}
              />
             ))}

            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                  <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                    <img src={img} alt={this.state.selectedPlace.name}/>
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
