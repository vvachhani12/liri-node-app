// console.log('this is loaded');


API_Spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
    // console: console.log("getting the spotify data")
},

API_OMDB = {
    key: process.env.OMDB_KEY,
    // console: console.log("getting the OMDB keys"),
},

API_CONCERT = {
    ID: process.env.CONCERT_ID,
    // console: console.log("getting the concert data")
}


module.exports = {
  API_Spotify: API_Spotify,
  API_OMDB: API_OMDB,
  API_CONCERT: API_CONCERT
};
