let userAccessToken;
let url = window.location.search;
const urlParams = new URLSearchParams(url)
const clientId = "cbd13bb8d86841999183d60f334c1341";
const redirectId= 'http://localhost:3000/';

const Spotify = {
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
                    }
}

   
export default Spotify