import React, { Component } from 'react';
import marker from './marker.png';
import $ from 'jquery';

export class List extends Component{
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
}

  componentDidMount() {
    $('.listSelection').on('mouseenter', (event)=>{
      $(event.currentTarget).css({border: "solid white"});
    }).on('mouseleave', (event)=>{
      $(event.currentTarget).css({border: "hidden"});
    })
  }

  render() {

    console.log(this.state.selectedPlace);
    console.log(this.state.activeMarker);
    console.log(this.state.showingInfoWindow);

    return(
      <div>
        {this.props.locations.map(list => (
          <div onClick={(infoWindow, place, e) => {
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
           className="listSelection"
          >
            <img className="markerIcon" src={marker} alt="Decorative Map Marker Icon"/>
            <p>{list.venue.name}</p>
           </div>
         ))}
      </div>


    )
  }
}
