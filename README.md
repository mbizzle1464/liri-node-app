# LIRI Node App 

####
LIRI is a Language Interpretation and Recognition Interface.  

### How it Works
LIRI is a command line node app that takes four commands: 

* my-tweets
* spotify-this-song 
* movie-this
* do-what-it-says

##### My Tweets 
This command does not take any parameters.  You simply need to type in node liri.js my-tweets into the command line and you will receive the last 20 tweets from Green Country Cinemas (local cinemas in Oklahoma). 

##### Spotify This Song 
This command does require another parameter.  You simply need to type in node liri.js spotify-this-song [insert song title] into the command line and you will receive back:

* Song Title
* Artist
* External Link to Song's Spotify URL
* Album
#####
If you decline to provide any additional parameter, you will receive Gangsta's Paradise by Coolio. 

##### Movie This 
This command does require another parameter.  You simply need to type in node liri.js spotify-this-song [insert movie title] into the command line and you will receive back: 
* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.
#####
If you decline to provide any additional parameter, you will receive Mr. Nobody in return. 

##### Do What It Says
This command does not take any parameters.  You simply need to type in node liri.js do-what-it-says and LIRI will call a random function among the previous three with surprise information from a random.txt file.

### Technologies Used
* Node.js
* Javascript
* Request (NPM Package)
* Node-Spotify-API (NPM Package)
* Twitter (NPM Package)