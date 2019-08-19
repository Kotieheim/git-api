$(document).ready(function() {
  watchSubmitButton();
});

function userInput() {
  let wordInput = $("#listen-user-input").val();
  return wordInput;
}

function watchSubmitButton() {
  $("#search-form").submit(e => {
    console.log("is this working?");
    e.preventDefault();
    fetchUserName(userInput);
  });
}

function fetchUserName() {
  fetch("https://api.github.com/users/" + userInput() + "/repos")
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("Can't find that username, sorry!"));
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#display-profile").empty();
  let responseHtml = "";
  responseJson.forEach(userRepo => {
    responseHtml += `<div>
      <h3>${userRepo.name}</h3>
      <a href=" ${userRepo.html_url}">Repo URL Link</a>
  </div>`;
  });
  $("#display-profile").html(responseHtml);
  $(".display-results-container").removeClass("hidden");
}s