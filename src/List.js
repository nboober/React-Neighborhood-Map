import React, { Component } from 'react';
import marker from './marker.png';

export class List extends Component{
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
}

  render() {

    return(
      <div aria-label="List of Venues">
        {this.props.locations.map(list => (
          <div tabindex="list" className="listSelection" onClick={(infoWindow, place, e) => {
            this.setState({
              selectedPlace: list,
              activeMarker: list,
              showingInfoWindow: true
              })
              this.props.onHandleListClick(list);
            }
          }
            name={list.venue.name}
            position={list.venue.position}
            key={list.venue.id}
          >
            <img className="markerIcon" src={marker} alt="Decorative Map Marker Icon"/>
            <p>{list.venue.name}</p>
           </div>
         ))}
      </div>


    )
  }
}
