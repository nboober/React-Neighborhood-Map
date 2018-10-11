import React, { Component } from 'react';
//I found the Google-maps-react library from https://www.npmjs.com/package/google-maps-react
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component{

  render() {
    return
  }
}

export default GoogleApiWrapper({
  apiKey: ()
})(MapContainer)
