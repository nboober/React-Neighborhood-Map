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
      photoSrc: ""
        }
}

  componentDidMount() {
    //Controls Hamburger Icon
    $('.hamburger').on('click', ()=>{
      $('.listViewBar').slideToggle(1000);
    });

    //Calls getVenues function. Gets the Venues from foursquare
    this.getVenues();
  }

  //List Click Function
  onListClick = (props, e) =>{
    this.setState({
      selectedPlace: props.venue,
      activeMarker: props.venue.location,
      showingInfoWindow: true
    },
      function(){
        //Calls getPhotos function. Gets the Photos from foursquare
        this.getPhotos();
      });
  }

  //Marker Click Function
  onMarkerClick = (props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      activeMarker: props.position,
      showingInfoWindow: true
    },
    function(){
      //Calls getPhotos function. Gets the Photos from foursquare
      this.getPhotos();
    });
  }

  //Map Click Function
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  //Get a list of Venues from Foursquare depending on the initialCenter Location. Puts the returned list in the venues state
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
        //Passes the returned list of venues to the venues state
        this.setState({
          venues: response.data.response.groups[0].items
        })
      }).catch(error => {
        alert(`ERROR! Venues could not be rendered. (${error})`);
        console.log("ERROR " + error);
      })
  }

  //Gets Photos for the venues from Foursquare. The returned item from this is a photo url related only to the selected marker from the onMarkerClick function
  getPhotos = () =>{

    let venues = this.state.venues;
    console.log(venues);
    let selectedPlace = this.state.selectedPlace;
    console.log(selectedPlace);
    let venue_id;

    //Cycles through the venues array state. If the selected Marker name from onMarkerClick is the same as one of the venue names in the loop then the matched venue name passes its venue id to venue_id
    for(let i = 0; i < venues.length; i++){
      if (venues[i].venue.name === selectedPlace.name){
        venue_id = venues[i].venue.id;
      }
    }

    const endPoint = "https://api.foursquare.com/v2/venues/"
    const parameters = {
      client_id: "LRHE1U0H3SYJJCP1IODLD03CZS503LZ4LUYCXHVC3J51RKBM",
      client_secret: "DX4B5ES0CY51EQWZGPGCR5E2S5QW3WXVCU3TJMS3RGYA1AIZ",
      v: "20182507"
    }

    axios.get(endPoint + venue_id + "/photos?" + new URLSearchParams(parameters))
      .then((res) => {
        //Get the returned url prefix
        let pre = res.data.response.photos.items[0].prefix;
        console.log(pre);
        //Get the returned url suffix
        let suff = res.data.response.photos.items[0].suffix;
        console.log(suff);
        //Combine the prefix and suffix and add the desired size of the image to the url
        let img = pre + "200x200" + suff;
        console.log(pre + "200x200" + suff);
        //Pass the final url to the photoSrc state
        this.setState({
          photoSrc: img
        })
        console.log(res.data.response.photos.items[0]);
        console.log(this.state.photoSrc);
      })
      .catch((error) => {
        alert(`ERROR! Photos could not be rendered. (${error})`);
        console.log("ERROR " + error);
      })
  }

  render() {

    //Global Variables
    let venues = this.state.venues;
    console.log(venues);
    let photoSrc = this.state.photoSrc;
    console.log(photoSrc);

    const style = {
      width: '100%',
      height: '100vh'
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

    //Search Bar Functionality. If what is typed in the input field matches any of the venue names that are being constantly looped, then only return the matched items the searchedList Array
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
          <img className="hamburger" src={hamburger} alt="hamburger icon" role="button" aria-label="Button for Drop Down list of Venues"/>
            <div className="title">My Neighborhood App</div>
        </header>

        <div className="searchHolder">
          <form role="search">
            <input className="search" type="text" placeholder="Search By Location Here... (Case Sensitive)" aria-label="Venue Search" onChange={search} value={this.state.input}/>
          </form>
        </div>

        <div className="listViewBar" style={{display: "none"}}>
          <div className="list" aria-hidden="true">
          <List infoWindow={this.state.showingInfoWindow} marker={this.state.activeMarker} place={this.state.selectedPlace} locations= {searchedList} center={this.state.initialCenter} onHandleListClick={this.onListClick}/>
          </div>
        </div>

        <div className="mapArea" ref='map' aria-label="List of Venues">
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
                title = {marker.venue.name}
                position = {marker.venue.location}
                onClick={this.onMarkerClick}
              />
             ))}
            <InfoWindow
                position={this.state.activeMarker}
                onClose={this.onMapClicked}
                visible={this.state.showingInfoWindow}>
                  <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                    <img src={photoSrc} key={photoSrc} alt={this.state.selectedPlace.name}/>
                    {console.log(this.state.selectedPlace)}
                  </div>
              </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

const LoadingContainer = (props) => (
  <div>Loading Container...</div>
);
if(!GoogleApiWrapper){
  alert(`Error: Map Could Not Load Properly`);
  console.log("Error: Map Could Not Load Properly");
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyC9Mj0z9LIsiHif3l_FiDMJL4l4o083lOA'),
  LoadingContainer: LoadingContainer
})(App)
