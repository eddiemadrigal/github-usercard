/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/



/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const instructorsObject = {
  username: 'tetondan',
  username: 'dustinmyers',
  username: 'justsml',
  username: 'luishrd',
  username: 'bigknell'
}


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:



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



function profileCard(data) {
  // create elements 
  const divCard = document.createElement('div'),
    img = document.createElement('img'),
    divCardInfo = document.createElement('div'),
    h3Name = document.createElement('h3'),
    pUsername = document.createElement('p'),
    pLocation = document.createElement('p'),
    pProfile = document.createElement('p'),
    aProfileURL = document.createElement('a'),
    pFollowers = document.createElement('p'),
    pFollowing = document.createElement('p'),
    pBio = document.createElement('p')

  // create HTML structure
  divCard.append(img, divCardInfo);
  divCardInfo.append(h3Name, pUsername, pLocation, pProfile, aProfileURL, pFollowers, pFollowing, pBio);
  pProfile.append(aProfileURL);

  // add classes
  divCard.classList.add('card');
  divCardInfo.classList.add('card-info');
  h3Name.classList.add('name');
  pUsername.classList.add('username');

  // add content
  img.src = data.avatar_url;
  h3Name.textContent = data.name;
  pUsername.textContent = data.login;
  pLocation.textContent = data.location;
  aProfileURL.innerHTML = `Profile: <a href='${data.html_url}' target='_blank'>${data.html_url}</a>`;
  pFollowers.textContent = `# of happy followers: ${data.followers}`;
  pFollowing.textContent = `Cheerfully following ${data.following} friends`;
  pBio.textContent = data.bio;

  return divCard;

}

const entryPoint = document.querySelector('.cards'),
  h1 = document.createElement('h1');
entryPoint.append(h1);

axios.get('https://api.github.com/users/eddiemadrigal')
  .then(response => {
    h1.textContent = `${response.data.name}'s GitHub Profile`
    entryPoint.append(profileCard(response.data));
  });

axios.get('https://api.github.com/users/eddiemadrigal/followers')
  .then(response => {

    response.data.map(item => {

      axios.get(item.followers_url)
      .then(result1 => {
        item.followers = result1.data.length;
        entryPoint.append(profileCard(item));
      });

      //console.log(item);
      
    });
  });

  // token: a422841d78f360d523036cb148ac213df43ddc64