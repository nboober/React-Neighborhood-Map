import React, { Component } from 'react';
//I found the react-google-maps module from https://medium.com/@yelstin.fernandes/render-a-map-component-using-react-google-maps-5f7fb3e418bb
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

export class MapContainer extends Component{

  render() {

    const MyGoogleMap = withGoogleMap(props => (
     <GoogleMap
       defaultCenter = { { lat: this.props.center.lat, lng: this.props.center.lng } }
       defaultZoom = { 13 }
     >
     <Marker position={{ lat: this.props.center.lat, lng: this.props.center.lng }} title={'Home'}/>
     <Marker position={{ lat: 39.188864, lng: -77.2344043 }} title={'Daly Elementary School'}/>
     <Marker position={{lat: 39.194103, lng: -77.2429888}} title={'Neelsville Middle School'}/>
     <Marker position={{lat: 39.190063, lng: -77.241919}} title={'Cider Barrel Landmark'}/>
     <Marker position={{lat: 39.1988538, lng: -77.2484713}} title={'Best Buy'}/>
     <Marker position={{lat: 39.200285, lng: -77.2466828}} title={'Jersey Mike\'s Subs'}/>
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
