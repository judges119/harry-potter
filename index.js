const Twit = require('twit')
let characters = require('./characters')
let identities = require('./identities')

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET,
})

tweetFortune()

setInterval(tweetFortune, 1000 * 60 * 60 * 8);

function tweetFortune() {
  let character = characters[Math.floor(Math.random() * characters.length)];
  let identity = identities[Math.floor(Math.random() * identities.length)];
  let tweet = character + ' ' + identity;
  if (Math.random() < 0.05) {
    tweet += "; it's just never discussed in the books";
  }
  T.post('statuses/update', { status: tweet }, function(err, data, response) {
    console.log(data)
  })
}
