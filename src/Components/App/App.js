import React from 'react';
import './App.css';

import SearchResults from '../SearchResults/SearchResults'
import SearchBar from '../SearchBar/SearchBar'
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'


class App extends React.Component {	

constructor(props) {
super(props);

this.state = {
  searchResults: [],
  playlistName: "Playlist Name",
  playlistTracks: []
}
this.addTrack = this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
this.updatePlaylistName = this.updatePlaylistName.bind(this);
this.savePlaylist = this.savePlaylist.bind(this);
this.search = this.search.bind(this);
} 

addTrack(track) {
  let tracks = this.state.playlistTracks
  if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
    return;
  }
  else {
    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }
}

removeTrack(track){
  let tracks = this.state.playlistTracks;
  tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
  this.setState({playlistTracks: tracks});
}


updatePlaylistName(name) {
  this.setState({playlistName: name})
}

savePlaylist() {
  let trackURIs = this.state.playlistTracks.map(track => {return track.uri});
  Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  });
}


search(searchTerm) {
  Spotify.search(searchTerm).then(searchResults => {
    this.setState({searchResults: searchResults});
  })
}

render(){
  return(
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} 
                     onAdd={this.addTrack}/>
      <Playlist onSave={this.savePlaylist} 
                onNameChange={this.updatePlaylistName} 
                playlistTracks={this.state.playlistTracks} 
                onRemove={this.removeTrack}/>
    </div>
  </div>
</div>
  )
	}
}
  

export default App;