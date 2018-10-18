import React, { Component } from 'react';
//I found the react-google-maps module from https://medium.com/@yelstin.fernandes/render-a-map-component-using-react-google-maps-5f7fb3e418bb
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

export class MapContainer extends Component{

  render() {
    const MyGoogleMap = withGoogleMap(props => (
     <GoogleMap
       defaultCenter = { { lat: this.props.center.lat, lng: this.props.center.lng } }
       defaultZoom = { 13 }
     >
     <Marker position={{ lat: this.props.center.lat, lng: this.props.center.lng }} />
     </GoogleMap>
    ));

    return (
      <div>
      <MyGoogleMap
        isMarkerShown

        containerElement={
          <div style={{ height: `100%`, width: '100%'}} />
        }

        mapElement={
          <div style={{ height: `95vh`, width: '99%' }} />
        }
      />
      </div>
    )
  }
}
