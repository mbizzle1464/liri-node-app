require("dotenv").config();
//NPM packages for reading and writing files
var fs = require('fs'),
    keys = require("./keys.js"),
    twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    request = require('request'),
    nodeArgs = process.argv.slice(2),
    //this will ignore the first two arguments   
    command = nodeArgs[0],
    //this is basically process.argv[2]
    userInput = nodeArgs.slice(1).join(" ");   
    // this is concatenating the user Input into a string for process.argv[3]

var tweetThis = function() { 
    var client = new twitter(keys.twitter); 
    var params = {
        screen_name: 'gccmovies', 
        count: 20
    };
        client.get('statuses/user_timeline', params, function(error, tweets, response){

        if (error){
            return console.log(error);  
        } else {
            var data = [];  
                for (var i = 0; i < tweets.length; i++) {
                    console.log(tweets[i].created_at);
                    console.log(tweets[i].text);
                fs.appendFile("log.txt", "\n" + "Green Country Cinemas Tweeted: " 
                    + "\n" + tweets[i].created_at 
                    + "\n" + tweets[i].text + "\n", function (err) {
                    if (err) {
                        console.log(err);
                    }
                }) 
            }                         
        } 
    });
};  

var spotifyThis = function() {
    var isNull = userInput === "" ? userInput = "Gangsta's Paradise" : userInput = userInput;
    // this will take a undefined entry from the user and put Gangsta's Paradise by Coolio as default
    var spotify = new Spotify(keys.spotify);
    spotify.search({
        type: "track",
        query: "Backstreet Boys",
        limit: 1}, function(error, data){
            if (error) {
                return console.log(error);  
            } else {
                console.log("Artist: " + data.tracks.items[0].album.artists[0].name); // artist's name
                console.log("Song name: " + data.tracks.items[0].name) // song name
                console.log("External url: " + data.tracks.items[0].album.external_urls.spotify) // external link
                console.log("Album: " + data.tracks.items[0].album.name) // album name
            }
            fs.appendFile("log.txt", "\n" + "Appending this song and artist data: " + 
                "\n" + "Artist: " + data.tracks.items[0].album.artists[0].name +
                "\n" + "Song Name: " + data.tracks.items[0].name +
                "\n" + "Link to Spotify: " + data.tracks.items[0].album.external_urls.spotify +
                "\n" + "Album: " + data.tracks.items[0].album.name + "\n", function(error) {
                    if (error) {
                        console.log(error); 
                    }
                });
        });            
};  

var movieThis = function() {
    var isNull = userInput === "" ? userInput = "Mr. Nobody" : userInput = userInput;
    // this will take a undefined entry from the user and put Mr. Nobody as default
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=4066b546";
    console.log(queryUrl);  

    request(queryUrl, function(error, response, body){
        if (error) {
            return console.log(error);
        } else {
            var rottenExists = JSON.parse(body).Ratings[1] === undefined ? rottenExists = "N/A" : rottenExists = JSON.parse(body).Ratings[1].Value;
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + rottenExists);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
        fs.appendFile("log.txt", "\n" + "Appending this movie information: " +
            "\n" + "The title of this movie is: " + JSON.parse(body).Title +
            "\n" + "The year this movie was released is: " + JSON.parse(body).Year +
            "\n" + "The IMDB rating of this movie is: " + JSON.parse(body).imdbRating + 
            "\n" + "The Rotten Tomatoes rating of this movie is: " + JSON.parse(body).rottenExists +
            "\n" + "The Country of this movie is: " + JSON.parse(body).Country + 
            "\n" + "The Language of this movie is: " + JSON.parse(body).Language +
            "\n" + "The Plot of this movie is: " + JSON.parse(body).Plot + 
            "\n" + "The Actors in this movie are: " + JSON.parse(body).Actors + "\n", )
    });
};

var doWhatItSays = function() { 
    fs. readFile("random.txt", "utf8", function(error, data){ 
        console.log(data);  
        if (error){
            return console.log(error);  
            } else {
            var dataArr = data.split(', '); 
            command = dataArr[0];   
            userInput = dataArr[1]; 
            
            console.log("You requested to " + command + " with " +  userInput)

            if (command === "my-tweets") {
                tweetThis();    
            } else if (command === "spotify-this-song") {
                spotifyThis();  
            } else if (command === "movie-this") {
                movieThis();    
            }
        }
        fs.appendFile("log.txt", "User picked random file.", function(error){

            if (error){
                console.log(error); 
            }
        });
    });
};

switch (command) {
    case "my-tweets":
        tweetThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("I'm sorry, I don't understand. Please tell me a command: \nmy-tweets \nspotify-this-song \nmovie-this \ndo-what-it-says");
        break;
}