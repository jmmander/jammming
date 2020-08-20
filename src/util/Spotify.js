let userAccessToken;
let url = window.location.search;
const urlParams = new URLSearchParams(url);
const clientId = "cbd13bb8d86841999183d60f334c1341";
const redirectId= 'http://localhost:3000/';

const Spotify = {

    search(searchTerm) { 
        const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
        const auth = {
            headers: {Authorization: `Bearer ${accessToken}`}
          };
         return fetch(urlToFetch, auth).then(
            response => {
                return response.json()}).then(
                    jsonRepsonse => {
                        if (jsonRepsonse.tracks) {
                            jsonRepsonse.tracks.map(track => {
                                return {
                                    id: track.id,
                                    name: track.name,
                                    artist: track.artists[0].name,
                                    album: track.album.name,
                                    uri: track.uri
                                }
                            })
                    }
            })
    },

    getAccessToken() {if (userAccessToken != undefined)
                        {
                        return userAccessToken;
                        }
                     else if (urlParams.has('access_token')) {
                        userAccessToken = urlParams.get('access_token');
                        const expiresIn = urlParams.get('expires_in');
                        window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
                        window.history.pushState('Access Token', null, '/');

                            }
                     else  {     
                        window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectId}`)
                        }
                    },
    
    savePlaylist(name, uris) {
        if (name && uris) {
            const accessToken = this.getAccessToken;
            const header = {Authorization: `Bearer ${accessToken}`};
            let userId;
            const userIdEndpoint = 'https://api.spotify.com/v1/me'
            userId = fetch(userIdEndpoint, {headers: header}).then(
                reponse => {
                    return response.json()}).then(
                        jsonRepsonse => {
                            if (jsonRepsonse.id) {
                                return jsonRepsonse.id;
                            }
                        }
                    );
            
            const playlistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
            const playlistHeaders = {
                headers: 
                {Authorization: `Bearer ${accessToken}`, 
                'Content-Type': 'application/json'
                        },
                body: {name: name}
                }
            const playlistId = fetch(playlistEndpoint, playlistHeaders).then(
                response=> {
                    return response.json()}).then(
                        jsonRepsonse => {
                            if (jsonRepsonse.id)
                                return jsonRepsonse.id
                        }
                    )
            const addTracksUri = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
            const addTrackHeaders = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                        },
                body: {uris}

                                    }
                }
                return "needs varibles";
            
                }
            
        }
            
    


   
export default Spotify;