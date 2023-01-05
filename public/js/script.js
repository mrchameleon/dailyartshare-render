// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// define variables that reference elements on our page
const topicsList = document.getElementById("topics");
const topicsForm = document.getElementById("topicform");

const haikuForm = document.getElementById("haikuform");

const haikuSpan = document.getElementById("haiku");

// a helper function that creates a list item for a given topic
function appendNewTopic(topic) {
  const newListItem = document.createElement("li");
  newListItem.innerText = topic;
  topicsList.appendChild(newListItem);
}

// get an initial haiku
fetch("/haiku")
  .then(response => response.json())
  .then(haiku => {
    haikuSpan.innerText = haiku;
});


// button press generates another haiku without page reload
haikuForm.addEventListener("submit", event=> {
  event.preventDefault();
  fetch("/haiku")
    .then(response => response.json())
    .then(haiku => {
      haikuSpan.innerText = haiku;
  });
});



// fetch the initial list of topics
fetch("/topics")
  .then(response => response.json()) // parse the JSON from the server
  .then(topics => {
    // remove the loading text
    topicsList.firstElementChild.remove();
  
    // iterate through every topic and add it to our page
    topics.forEach(appendNewTopic);
  
    // listen for the form to be submitted and add a new topic when it is
    topicsForm.addEventListener("submit", event => {
      // stop our form submission from refreshing the page
      event.preventDefault();

      // get topic value and add it to the list
      let newTopic = topicsForm.elements.topic.value;
      topics.push(newTopic);
      appendNewTopic(newTopic);

      // reset form
      topicsForm.reset();
      topicsForm.elements.topic.focus();
    });
  });
