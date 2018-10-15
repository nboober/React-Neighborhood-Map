import React, { Component } from 'react';
//I found the react-google-maps module from https://medium.com/@yelstin.fernandes/render-a-map-component-using-react-google-maps-5f7fb3e418bb
import { withGoogleMap, GoogleMap } from 'react-google-maps';

export class MapContainer extends Component{

  render() {
    const GoogleMapExample = withGoogleMap(props => (
     <GoogleMap
       defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
       defaultZoom = { 13 }
     >
     </GoogleMap>
    ));

    return (
      <div>
      <GoogleMapExample
        containerElement={
          <div style={{ height: `100vh`, width: '100vw' }} />
        }
        mapElement={
          <div style={{ height: `93%`, width: '99%' }} />
        }
      />
      </div>
    )
  }
}
