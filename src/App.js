import React, { Component } from 'react';
import InfinityScroll from './component/infinity-scroll';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="infinity-scroll-logo.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Infinity Scroll</h1>
        </header>
       
        {/* offset param is zero by default */}
        <InfinityScroll offset={0} limit={6} />
        
      </div>
    );
  }
}

export default App;
