import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    }

    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.search();
    }
  }

  handleClick(event) {
    event.currentTarget.select();
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="What are you searching for?" onChange={this.handleTermChange} onKeyDown={this.handleKeyDown} onClick={this.handleClick}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;


