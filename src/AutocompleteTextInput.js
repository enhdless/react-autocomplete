import React, { Component } from 'react';
import './App.css';

class AutocompleteTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	inputValue: "",
    	results: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
  	if (prevState.inputValue !== this.state.inputValue)
			this.updateResults()
  }

  handleInputChange(event) {
		this.setState({ inputValue: event.target.value })
  }

  updateResults() {
  	const query = this.state.inputValue;
  	const results = this.props.data.filter((item) =>
  		item.length >= query.length && item.startsWith(query)
  	);
  	this.setState({ results: results })
  }

  getResultsMarkup() {
  	return this.state.results.map((item, i) =>
  		<li key={i} id={i}>
  			{item.slice(0, this.state.inputValue.length)}
  			<strong>{item.slice(this.state.inputValue.length)}</strong>
  		</li>
  	, this);
  }

  render() {
    return (
    	<div className="autocomplete-wrapper">
    		<input 
    			type="text" 
    			onChange={this.handleInputChange.bind(this)}
    			autoFocus 
    		/>
    		{this.state.inputValue.length > 2 ?
	    		<ul className="results">
	    			{this.getResultsMarkup()}
	    		</ul> : null
	    	}
    	</div>
    );
  }
}

export default AutocompleteTextInput;
