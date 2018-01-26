import React, { Component } from 'react';
import './App.css';

class AutocompleteTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      selectedItem: 0,
      results: [],
      hideResults: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputValue !== this.state.inputValue)
      this.updateResults()
  }

  handleInputChange(event) {
    if (event.target.value.length > 2)
      this.setState({ hideResults: false });
    else
      this.hideResults();
    this.setState({ inputValue: event.target.value })
  }

  updateResults() {
    const query = this.state.inputValue;
    const results = this.props.data.filter((item) =>
      item.length >= query.length && item.startsWith(query)
    );
    this.setState({ results: results })
  }

  setSelected(event) {
    this.setState({ 
      selectedItem: event.currentTarget.id,
      inputValue: event.currentTarget.textContent
    })
    this.hideResults();
  }

  getResultsMarkup() {
    return this.state.results.map((item, i) =>
      <li 
        key={i} 
        id={i} 
        className={this.state.selectedItem == i ? "selected" : ""}
        onClick={this.setSelected.bind(this)}
      >
        {item.slice(0, this.state.inputValue.length)}
        <strong>{item.slice(this.state.inputValue.length)}</strong>
      </li>
    , this);
  }

  //  up=38, down=40, enter=13
  handleKeyPress(event) {
    const KEY_ENTER = 13,
          KEY_UP = 38,
          KEY_DOWN = 40;
    if (event.keyCode ===  KEY_ENTER)
      this.setState({ 
        inputValue: this.state.results[this.state.selectedItem],
        hideResults: true
      })
    if (event.keyCode === KEY_UP && this.state.selectedItem > 0)
      this.setState({ selectedItem: this.state.selectedItem - 1 })
    if (event.keyCode === KEY_DOWN && this.state.selectedItem < this.state.results.length - 1)
      this.setState({ selectedItem: this.state.selectedItem + 1 })
  }

  hideResults() {
    this.setState({ hideResults: true });
  }

  render() {
    return (
      <div className="autocomplete-wrapper">
        <input 
          type="text" 
          value={this.state.inputValue}
          onChange={this.handleInputChange.bind(this)}
          onKeyDown={this.handleKeyPress.bind(this)}
          placeholder="Search for a city"
          autoFocus 
        />
        {!this.state.hideResults ?
          <ul className="autocomplete-results">
            {this.getResultsMarkup()}
          </ul> : null
        }
      </div>
    );
  }
}

export default AutocompleteTextInput;
