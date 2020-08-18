import React from 'react';
import './App.css';
import Track from '../Track/Track';
import SearchResults from '../SearchResults/SearchResults'
import SearchBar from '../SearchBar/SearchBar'
import Playlist from '../Playlist/Playlist';


class App extends React.Component {	

constructor(props) {
super(props);
this.state = {
  searchResults: [Track],
  playlistName: "thisismyplaylist",
  playlistTracks: [{name: Track.name, artist: Track.artist, album: Track.album, id: Track.id}]
}
this.addTrack = this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
} 

addTrack(track) {
  if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
    return false;
  }
  else {
    this.state.playlistTracks.push(track)
  }
}

removeTrack(track){
  for (i=0, i < this.state.playlistTracks.length, i++) {
   if (this.state.playlistTracks[i].id === track.id) {
      var updatedPlaylist = this.state.playlistTracks.splice(i, 1); 
      this.setState({playlistTracks: updatedPlaylist})
      
   }
  }
}

render(){
  return(
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
      <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove={this.removeTrack}/>
    </div>
  </div>
</div>
  )
	}
}
  

export default App;
