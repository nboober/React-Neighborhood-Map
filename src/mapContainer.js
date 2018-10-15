import React, { Component } from 'react';
//I found the Google-maps-react library from https://www.npmjs.com/package/google-maps-react
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import {Map} from './map';

export class MapContainer extends Component{

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }

    if (!this.props.loaded) {
     return <div>Loading Map...</div>
     }

    return (
      <div style={{style}}>
        <Map google={this.props.google}/>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyC9Mj0z9LIsiHif3l_FiDMJL4l4o083lOA')
})(MapContainer)
