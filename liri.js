require("dotenv").config();
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.API_Spotify);
var request = require("request");
var moment = require("moment");
var fs = require("fs");

const command = process.argv[2];
const argument = process.argv[3];

switch(command){
    case "concert-this":
        concertThis(argument);
        break;
    case "spotify-this-song":
        spotifyThis(argument);
        break;
    case "movie-this":
        movieThis(argument);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}

function doWhatItSays(){
    fs.readFile("random.txt","utf8",function(err,data){
        if(err) throw err;
        // console.log(data.split(","));
        const randomData = data.split(",");
        // console.log(randomData[0]);
        if(randomData[0] === "spotify-this-song"){
            // console.log(randomData[1]);
            spotifyThis(randomData[1]);
        }

    })
}

function concertThis(argument){
    let url = "https://rest.bandsintown.com/artists/" + argument + "/events?app_id="+keys.API_CONCERT.ID
    // console.log(url);
    request.get(url, function(error,response,body){
        if (!error && response.statusCode === 200){
            console.log("Name of the Venue: "+JSON.parse(body)[0].venue.name);
            console.log("Venue location: "+JSON.parse(body)[0].venue.city+", "+JSON.parse(body)[0].venue.region);
            console.log("Date of the Event: "+moment(JSON.parse(body)[0].dateTime).format('MMMM Do YYYY, h:mm:ss a'));                
        }
    });
}

function spotifyThis(argument){
    // console.log(argument);
    spotify.search({ type: 'track', query: argument }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        } 
        // console.log(data.tracks.items[1]);     
        console.log("Artist(s): "+(data.tracks.items[0].artists[0].name));
        console.log("Song Title: "+(data).tracks.items[1].name); 
        console.log("A preview link of the song: "+(data).tracks.items[1].preview_url);
        console.log("Album name: "+(data).tracks.items[1].album.name);

    });
}

function movieThis(argument){
    // console.log(argument);
    // console.log(keys.API_OMDB.key);
    let url = "http://www.omdbapi.com/?apikey="+keys.API_OMDB.key+"&t="+argument
    // console.log(url);
    request(url,function(error,response,body){
            // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // console.log(JSON.parse(body));
            console.log("Title of the movie: "+JSON.parse(body).Title);
            console.log("Year of the movie released: "+JSON.parse(body).Released);
            console.log("IMDB Rating of the movie: "+JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: "+JSON.parse(body).Ratings[1].Value);
            console.log("Country where the moive was produced: "+JSON.parse(body).Country);
            console.log("Language of the movie: "+JSON.parse(body).Language);
            console.log("Plot of the movie: "+JSON.parse(body).Plot);
            console.log("Actors in the movie: "+JSON.parse(body).Actors);
        }
    });
}