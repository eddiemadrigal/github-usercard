/* 

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
    img.setAttribute('style', 'object_fit:scale');
    h3Name.textContent = data.name;
    pUsername.textContent = data.login;
    pLocation.textContent = data.location;
    aProfileURL.innerHTML = `Profile: <a href='${data.html_url}' target='_blank'>${data.login}</a>`;
    pFollowers.textContent = `# of happy followers: ${data.followers}`;
    pFollowing.textContent = `Cheerfully following ${data.following} friends`;
    pBio.textContent = data.bio;

    return divCard;

}

const entryPoint = document.querySelector('.cards'),
    h1 = document.createElement('h1');
entryPoint.append(h1);

axios.get('./GitHubCard/github.html')
    .then(response => {
        entryPoint.append(profileCard(response.data));
        return response.data;
    })
    .then(response => {
        axios.get(response.followers_url)
            .then(response => {
                response.data.map(item => {
                    console.log(item);
                    axios.get(item.followers_url)
                        .then(result => {
                            return result.data.length;
                        })
                        .then(result => {
                            item.followers = result;
                            return item;
                        })
                        .then(result => {
                            let str = result.following_url;
                            let strLen = str.length;
                            let res = str.substr(0, strLen - 13);
                            axios.get(res)
                                .then(result => {
                                    item.following = result.data.length;
                                    entryPoint.append(profileCard(item));
                                })
                        })

                });
            })
    })