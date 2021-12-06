//Select Veriables
const searchInput = document.getElementById('searchInp');
const searchBtn = document.getElementById('searchBtn');
const content = document.getElementById('content');
const home = document.getElementById('home');
const theme = document.getElementById('theme');
const css = document.getElementById('css');


//Call Start Function For Start
showFrontPage();


//Get Github Api and Featch Data
async function apiCall(user) {
    const resp = await fetch("https://api.github.com/users/" + user);
    const respData = await resp.json();
    showGithubProfile(respData);
};


//Create a frontpage for function
function showFrontPage() {
    if (searchInput.value === "") {
        showNormalViewLight();
    } else {
        showGithubProfile();
    }
};


//Click Search Button For Search
searchBtn.addEventListener('click', () => {
    passData();
});

//Press enter for search
searchInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        passData();
    }
});


//Take value from search input 
async function passData() {
    const data = searchInput.value;
    await apiCall(data);
    searchInput.value = "";
};


//Craete showNormalViewLight function for theme
function showNormalViewLight() {
    theme.addEventListener('click', () => {
        if (theme.classList.contains('dark-theme')) {
            theme.classList.remove('dark-theme')
            theme.classList.add('light-theme')
            css.removeAttribute("href", "")
            theme.setAttribute('src', './img/dark.png')
            const themeGif = document.getElementById('theme-light');
            themeGif.setAttribute('src', './img/github.gif');
            const text = document.getElementById('data');
            text.innerText = 'Dark'
        } else if (theme.classList.contains('light-theme')) {
            theme.classList.remove('light-theme')
            theme.classList.add('dark-theme')
            css.setAttribute("href", "./css/black.css")
            theme.setAttribute('src', './img/light.png')
            const themeGif = document.getElementById('theme-light');
            themeGif.setAttribute('src', './img/dark.gif');
            const text = document.getElementById('data');
            text.innerText = 'Light'
        }
    })
};

//Create a function for view information
function showGithubProfile(data) {
    content.innerHTML = "";

    const heading = document.createElement('div');
    const details = document.createElement('div');
    const info = document.createElement('div');

    if (data.message == 'Not Found') {
        heading.innerHTML = `           <img src="./img/error.gif" alt="error">
                                        <div class="content-main">
                                                <h2>${data.message}</h2>
                                        </div>
                         `
    } else {
        heading.classList.add('heading');
        heading.innerHTML = `
                                        <img src="${data.avatar_url}" alt="${data.login}">
                                        <div class="content-main">
                                                <h2>${data.name}</h2>
                                                <h3>@${data.login}</h3>
                                                <p>${data.bio}</p>
                                        </div>
                         `
        details.classList.add('details');
        details.innerHTML = `
                                        <div class="details_items">
                                                <i class="fas fa-location"></i>
                                                <h6>${data.location == null?'No Location Available':data.location}</h6>
                                        </div>
                                        <div class="details_items">
                                                <i class="fas fa-link"></i>
                                                <h6>${data.blog == null?'No Personal Website Here':data.blog}</h6>
                                        </div>
                                        <div class="details_items">
                                                <i class="fab fa-twitter"></i>
                                                <h6>${data.twitter_username == null ? 'No Twitter Account Here':data.twitter_username}</h6>
                                        </div>
                        `
        info.classList.add('info');
        info.innerHTML = `
                                        <div class="repo">
                                                <h5>Repo:</h5>
                                                <span>${data.public_repos}</span>
                                        </div>
                                        <div class="repo">
                                                <h5>Followers:</h5>
                                                <span>${data.followers}</span>
                                        </div>
                                        <div class="repo">
                                                <h5>Following:</h5>
                                                <span>${data.following}</span>
                                        </div>
                     `
    }
    content.appendChild(heading);
    content.appendChild(details);
    content.appendChild(info);
};

//Click home button for reload page
home.addEventListener('click', () => {
    window.location.reload();
});