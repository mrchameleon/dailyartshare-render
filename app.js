const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


var { adjectives } = require('./adjectives');
var { nouns } = require('./nouns');

var Haikunator = require('haikunator');

var haikunator = new Haikunator({
    adjectives: adjectives,
    nouns: nouns,
    tokenLength: 0,
    delimiter: " "
});

// haiku 2 word combo for inspiration
// docs: https://github.com/Atrox/haikunatorjs

function getHaiku(){
  val = haikunator.haikunate({tokenLength: 0, delimiter: " "})
  return val
};

const times = x => f => {
  if (x > 0) {
    f()
    times (x - 1) (f)
  }
}

var haiku = getHaiku();

// our default array of topics
const topics = [];
//times (5) (() => topics.push(getHaiku()));

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/community", (request, response) => {
  response.sendFile(__dirname + "/views/community.html");
});

app.get("/calendar", (request, response) => {
  response.sendFile(__dirname + "/views/calendar.html");
});

app.get("/haiku", (request, response) => {
  haiku = getHaiku();
  response.json(haiku);
});

app.get("/monthdata", (request, response) => {
  haikus = [];
  times (35) (() => haikus.push(getHaiku()));
  response.json(haikus);
});

// send the default array of topics to the webpage
app.get("/topics", (request, response) => {
  response.json(topics);
});
