import React, { Component } from 'react';
import hamburger from './Hamburger_icon.png';
import './App.css';
import $ from 'jquery';
import { List } from './List';
import { Map } from './Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="hamburger" src={hamburger} alt="hamburger icon"/>
        </header>

        <List/>
        <Map/>
      </div>
    );
  }
}

export default App;
