import React, { Component } from 'react';
import marker from './marker.png';
import $ from 'jquery';

export class List extends Component{
  constructor(props){
    super(props);
    this.state= {input: ""};
  }

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
          <div onClick={(props, position, e) => this.props.onHandleClick(list)} key={list.name} className="listSelection">
            <img className="markerIcon" src={marker} alt="Decorative Map Marker Icon"/>
            <p>{list.title}</p>
           </div>
         ))}
      </div>


    )
  }
}
