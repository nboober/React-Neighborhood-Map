import React, { Component } from 'react';
import marker from './marker.png';
import { App } from './App';
import $ from 'jquery';

export class List extends Component{
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    initialCenter: this.props.center
  };

  componentDidMount() {
    $('.listSelection').on('mouseenter', (event)=>{
      $(event.currentTarget).css({border: "solid white"});
    }).on('mouseleave', (event)=>{
      $(event.currentTarget).css({border: "hidden"});
    })
  }

  render() {

    return(
      <div>
        {this.props.locations.map(list => (
          <div onClick={this.onMarkerClick} key={list.name} className="listSelection">
            <img className="markerIcon" src={marker} alt="Decorative Map Marker Icon"/>
            <p>{list.name}</p>
           </div>
         ))}
      </div>
    )
  }
}
