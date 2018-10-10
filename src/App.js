import React, { Component } from 'react';
import hamburger from './Hamburger_icon.png';
import './App.css';
import $ from 'jquery';
import { List } from './List';
import { Map } from './Map';

class App extends Component {

  componentDidMount() {
    $('.hamburger').on('click', ()=>{
      $('.listViewBar').toggle();
    })
  }

  render() {

    $('.hamburger').on('click', ()=>{
      $('.listViewBar').toggle();
    })

    return (
      <div className="App">
        <header className="App-header">
          <img className="hamburger" src={hamburger} alt="hamburger icon" />
        </header>
        <div className="listViewBar">
          <List/>
        </div>
        <div className="mapArea">
          <Map/>
        </div>
      </div>
    );
  }
}

export default App;
