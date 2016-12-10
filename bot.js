// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

function openStream() {
  // Open a stream and track every time someone mentions '@raunerstemexpo'
  var stream = T.stream('user', {track: '@raunerstemexpo'});

  // When we find a tweet that contains '@raunerstemexpo'
  stream.on('tweet', function(tweet) {

    // Skip our own tweets, duh
    if (tweet.user.screen_name === "raunerstemexpo") {
      return;
    }

    // Construct a tweet using the name of the person who tweeted us and a randomly selected greeting
    var name = tweet.user.name;
    var greetings = ["Hey", "Hello,", "Bonjour", "Shouts out to", "Hola,", "Sup", "Thanks for the hello,"];
    var greeting = greetings[Math.floor(Math.random() * greetings.length)];

    var status = greeting + " " + name + "!";
    // Post the tweet!
    T.post('statuses/update', { status: status }, function(err, data, response) {
      console.log(data);
    });
  });
}

// Run the openStream function that we made above
openStream();
