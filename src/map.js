import React, { Component } from 'react';

export class Map extends Component{
  componentDidMount(prevProps, prevState) {
    if (prevProps.google !== this.props.google){
      this.loadMap();
    }
  }

  loadMap(){
    //...
  }

  render() {
    return
  }
}
