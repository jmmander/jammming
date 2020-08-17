import React from 'react';
import logo from './logo.svg';
import './App.css';
import Track from '../Track/Track';
import SearchResults from '../SearchResults/SearchResults'
import SearchBar from '../SearchBar/SearchBar'
import Playlist from '../Playlist/Playlist';


class App extends React.Component {	

constructor(props) {
super(props);
this.state = {
  SearchResults: [Track]
}
} 

render(){
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults />
      <Playlist />
    </div>
  </div>
</div>
	}
}
  

export default App;
