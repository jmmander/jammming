let userAccessToken;
let url = window.location.search;
const urlParams = new URLSearchParams(url);
const clientId = "cbd13bb8d86841999183d60f334c1341";
const redirectId=  'complete-instrument.surge.sh';

const Spotify = {

    getAccessToken() {if (userAccessToken != undefined)
        {
        return userAccessToken;
        }
        const userAccessTokenMatch = urlParams.get('access_token');
        const expiresInMatch = urlParams.get('expires_in');
        if (userAccessTokenMatch && expiresInMatch) {
            userAccessToken = userAccessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        } else {     
        window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectId}`)
        }
    },


    search(searchTerm) { 
        const userAccessToken = Spotify.getAccessToken();
        const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
        const auth = {
            headers: {Authorization: `Bearer ${userAccessToken}`}
          };
         return fetch(urlToFetch, auth).then(
            response => {
                return response.json()}).then(
                    jsonRepsonse => {
                        if (jsonRepsonse.tracks) {
                            return jsonRepsonse.tracks.map(track => ({
                                
                                    id: track.id,
                                    name: track.name,
                                    artist: track.artists[0].name,
                                    album: track.album.name,
                                    uri: track.uri
                                
                            }));
                    }
            })
    },
    
    savePlaylist(name, uris) {
        if (name && uris) {
            const accessToken = Spotify.getAccessToken();
            const headers = {Authorization: `Bearer ${accessToken}`};
            let userId;

            const userIdEndpoint = 'https://api.spotify.com/v1/me'
            return fetch(userIdEndpoint, {headers: headers}).then(
                response => {
                    response.json()}).then(
                        jsonRepsonse => {
                            userId=jsonRepsonse.id;
                            const playlistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
                            return fetch(playlistEndpoint, {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({name: name})
                            }).then(
                response=> {
                     response.json()}).then(
                        jsonRepsonse => {
                                const playlistId = jsonRepsonse.id;
                                const addTracksUri = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
                                return fetch(addTracksUri, {
                                    headers: headers,
                                    method: 'POST',
                                    body: JSON.stringify({uris: uris})
                                });
                            });
                          });
                        }
                      }
                    };

        
            
    


   
export default Spotify;