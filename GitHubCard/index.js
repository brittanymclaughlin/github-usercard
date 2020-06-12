

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
var person = prompt("Please enter a username");

 axios.get("https://api.github.com/users/" + person)
      .then(res => {
        console.log(res.data);
        let newCard = cardMaker(res.data);
        return res;
      })
      .then(res => {
        axios.get(res.data.followers_url)
        .then(res2 => {
          res2.data.forEach(follower => {
              getUser(follower.login);
              console.log(follower);
          });
        })
        .catch(err=> console.log(err))
      })
      .catch(err => console.log(err));

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
let area = document.querySelector('.cards');

function cardMaker(data){

  //Create HTML elements.
  let card = document.createElement('div');
  let cardImg = document.createElement('img');
  let cardInfo = document.createElement('div');
  let cardName = document.createElement('h3');
  let User = document.createElement('p');
  let location = document.createElement('p');
  let profile = document.createElement('p');
  let ghLink = document.createElement('a');
  let followers = document.createElement('p');
  let following = document.createElement('p');
  let bio = document.createElement('p');


  //Add classes to the HTML elements just created.
  card.classList.add('card');
  cardName.classList.add('name');
  User.classList.add('username');
  cardInfo.classList.add('card-info');


  //Add in the revelant data to select fields.
  cardImg.src=data.avatar_url;

  if(data.name !== null){
    cardName.textContent=data.name;
  } else{
    cardName.textContent = data.login;
  };

  
  User.textContent = data.login;
  location.textContent = data.location;
  profile.textContent = "Profile: ";
  ghLink.href = data.html_url;
  ghLink.title = data.html_url;
  ghLink.textContent = data.html_url;
  followers.textContent = "Followers: " + data.followers;
  following.textContent = "Following: " + data.following;
  if(data.bio === null){
    bio.textContent = data.name + " has not written a bio."
  } else{
    bio.textContent = "Bio: " + data.bio;};

  //Append the elements to other elements as needed.
  area.appendChild(card);
  card.appendChild(cardImg);
  card.appendChild(cardInfo);
  cardInfo.append(cardName, User, location, profile, followers, following, bio);
  profile.appendChild(ghLink);

}


function getUser(username) {
  axios.get("https://api.github.com/users/" + username)
  .then(res3 => {
    let newCard3 = cardMaker(res3.data);
    let area = document.querySelector('.cards');
    area.appendChild(newCard3);
  }).catch(err => {
    console.log(err);
  });
}