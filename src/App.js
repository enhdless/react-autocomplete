import React, { Component } from 'react';
import AutocompleteTextInput from './AutocompleteTextInput'
import './App.css';

const cities = [
  'san jose', 'santiago', 'san francisco', 'santa rosa', 'san juan', 
  'sabadell', 'salamanca', 'salt lake city', 'salinas', 'salem', 
  'sausalito', 'taipei', 'tel aviv', 'tempe', 'termez', 'temuco', 
  'tiajuna', 'tieling', 'thousand oaks', 'thunder bay', 'tokyo', 'tulsa'
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Autocomplete Demo</h1>
        </header>
        <main className="App-content">
          <AutocompleteTextInput
            data={cities}
          ></AutocompleteTextInput>
        </main>
      </div>
    );
  }
}

export default App;
