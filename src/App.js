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
      id: {
            zero: "",
            one: "",
            two: "",
            three: "",
            four: "",
            five: ""
          },
      photoSrc: []
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

  //Marker Click Function
  onMarkerClick = (props, position, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: position,
    showingInfoWindow: true,
    // test: this.state.selectedPlace.venue.id
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
          venues: response.data.response.groups[0].items,
          id:{
              zero: response.data.response.groups[0].items[0].venue.id,
              one: response.data.response.groups[0].items[1].venue.id,
              two: response.data.response.groups[0].items[2].venue.id,
              three: response.data.response.groups[0].items[3].venue.id,
              four: response.data.response.groups[0].items[4].venue.id,
              five: response.data.response.groups[0].items[5].venue.id
            }
        })
        console.log(response.data.response.groups[0].items);
        console.log(response.data.response.groups[0].items[0].venue.id);
        console.log(response.data.response.groups[0].items[1].venue.id);
        console.log(response.data.response.groups[0].items[2].venue.id);
        console.log(response.data.response.groups[0].items[3].venue.id);
        console.log(response.data.response.groups[0].items[4].venue.id);
        console.log(response.data.response.groups[0].items[5].venue.id);

        this.getPhotos();
      }).catch(error => {
        console.log("ERROR " + error);
      })
  }

  //Get a list of Photos from Foursquare
  getPhotos = () =>{

    const endPoint = "https://api.foursquare.com/v2/venues/"
    let venue_id = this.state.id.zero;
    let venue_id_1 = this.state.id.one;
    let venue_id_2 = this.state.id.two;
    let venue_id_3 = this.state.id.three;
    let venue_id_4 = this.state.id.four;
    let venue_id_5 = this.state.id.five;
    const parameters = {
      client_id: "LRHE1U0H3SYJJCP1IODLD03CZS503LZ4LUYCXHVC3J51RKBM",
      client_secret: "DX4B5ES0CY51EQWZGPGCR5E2S5QW3WXVCU3TJMS3RGYA1AIZ",
      v: "20182507"
    }

    axios.get(endPoint + venue_id + "/photos?" + new URLSearchParams(parameters))
      .then((res) => {
        let pre = res.data.response.photos.items[0].prefix;
        console.log(pre);
        let suff = res.data.response.photos.items[0].suffix;
        console.log(suff);
        let img = pre + "200x200" + suff;
        console.log(pre + "200x200" + suff);
        let merge = this.state.photoSrc.concat(img);
        this.setState({
          photoSrc: merge
        })
        console.log(res.data.response.photos.items[0]);
        console.log(this.state.photoSrc);
        return axios.get(endPoint + venue_id_1 + "/photos?" + new URLSearchParams(parameters));
      })
      .then((res) => {
        let pre = res.data.response.photos.items[0].prefix;
        console.log(pre);
        let suff = res.data.response.photos.items[0].suffix;
        console.log(suff);
        let img = pre + "200x200" + suff;
        console.log(pre + "200x200" + suff);
        let merge = this.state.photoSrc.concat(img);
        this.setState({
          photoSrc: merge
        })
        console.log(res.data.response.photos.items[0]);
        console.log(this.state.photoSrc);
        return axios.get(endPoint + venue_id_2 + "/photos?" + new URLSearchParams(parameters));
      })
      .then((res) => {
        let pre = res.data.response.photos.items[0].prefix;
        console.log(pre);
        let suff = res.data.response.photos.items[0].suffix;
        console.log(suff);
        let img = pre + "200x200" + suff;
        console.log(pre + "200x200" + suff);
        let merge = this.state.photoSrc.concat(img);
        this.setState({
          photoSrc: merge
        })
        console.log(res.data.response.photos.items[0]);
        console.log(this.state.photoSrc);
        return axios.get(endPoint + venue_id_3 + "/photos?" + new URLSearchParams(parameters));
      })
      .then((res) => {
        let pre = res.data.response.photos.items[0].prefix;
        console.log(pre);
        let suff = res.data.response.photos.items[0].suffix;
        console.log(suff);
        let img = pre + "200x200" + suff;
        console.log(pre + "200x200" + suff);
        let merge = this.state.photoSrc.concat(img);
        this.setState({
          photoSrc: merge
        })
        console.log(res.data.response.photos.items[0]);
        console.log(this.state.photoSrc);
        return axios.get(endPoint + venue_id_4 + "/photos?" + new URLSearchParams(parameters));
      })
      .then((res) => {
        let pre = res.data.response.photos.items[0].prefix;
        console.log(pre);
        let suff = res.data.response.photos.items[0].suffix;
        console.log(suff);
        let img = pre + "200x200" + suff;
        console.log(pre + "200x200" + suff);
        let merge = this.state.photoSrc.concat(img);
        this.setState({
          photoSrc: merge
        })
        console.log(res.data.response.photos.items[0]);
        console.log(this.state.photoSrc);
        return axios.get(endPoint + venue_id_5 + "/photos?" + new URLSearchParams(parameters));
      })
      .then((res) => {
        let pre = res.data.response.photos.items[0].prefix;
        console.log(pre);
        let suff = res.data.response.photos.items[0].suffix;
        console.log(suff);
        let img = pre + "200x200" + suff;
        console.log(pre + "200x200" + suff);
        let merge = this.state.photoSrc.concat(img);
        this.setState({
          photoSrc: merge
        })
        console.log(res.data.response.photos.items[0]);
        console.log(this.state.photoSrc);
      })
      .catch((error) => {
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
                    <h1>{this.state.selectedPlace.id}</h1>
                    {photoSrc.map(src =>
                      <img src={src} alt={this.state.selectedPlace.name}/>
                    )}

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
