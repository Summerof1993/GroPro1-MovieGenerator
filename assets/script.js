const userName = document.querySelector('#user-name');
const returnUI = document.querySelector('.return-ui');
const startUI = document.querySelector('.start-ui');
const nameValue = document.querySelector('#name-val');
const genreInput = document.querySelector('#genre-val');
const displayMovie = document.querySelector('.display-movie');

returnUI.classList.add('none');

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

//Event listeners

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    document.querySelector('.pageload').getElementsByClassName.display = 'block';
    startUI.style.display = 'none';

    setTimeout(getMovies,2000);
});

document.querySelector('.retry').addEventListener('click',getMovies)

document.querySelector('.change-genre').addEventListener('click', displayStartUI)

let genreID;
async function getMovies() {
    try {
        const randomNumberPg = Math.floor(Math.random() * (50));
        const APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=a056f6e72661369a5bee997dd5a40a93&with_genres=${genreID}&page=${randomNumberPg}&language=en-US`;

        //Get request to TMDB API
        const res = await fetch(APIURL);

        //Check if response successful
        if(!res.ok) {
            //throw error if response is not ok
            throw new Error(res.status);
        }
        // Convert response object to JSON
        const resData = await res.json()
        
        // Generate a random index number
        const randomNumber = Math.floor(Math.random() * (resData.results.length));

        // Hide loader
        document.querySelector('.pageload').style.display = 'none'
        
        displayReturnUI();
        
        // Display random movie
        showMovie(resData.results[randomNumber]);

    } catch (error) {
        console.log(error)
        //If error occurs go back to main page
        displayStartUI()
        //Hide loader
        document.querySelector('.pageload').style.display = 'none';

        const err = document.createElement('p');
        err.textContent = 'Error, try again';
        err.classList.add('err-msg');
        document.querySelector('header').appendChild(err)

        setTimeout(() => err.remove(),3000)
    }
}
function showMovie(movie) {
    displayMovie.innerHTML = `
        <img
        src="${getPoster(IMGPATH, movie.poster_path)}"
        alt="${movie.title}"
        class="movie-poster"
        />
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p><strong>Rating:</strong> ${movie.vote_average} </p>
            <p><strong>Year:</strong> ${getYear(movie.release_date)} </p>
            <p class="overview" tabindex="0" role="document">${movie.overview}</p>
        </div>
    `;
}

function getYear(date) {
    const year = new Date(date);

    //if not a number just display '-'
    if(isNaN(year.getFullYear())){
        return '-'
    } else {
        return year.getFullYear();
    }
}
function getPoster(imgPath, movie) {
    if(!movie) {
        return 'image/imagenotfound.png';
    } else {
        return imgPath + movie;
    }
}

function assignID() {
    if (genreInput.value === 'Horror') {
        genreID = 27;
    } else if(genreInput.value === 'Action') {
        genreID = 28;
    } else if (genreInput.value === 'Animated') {
        genreID = 16;
    } else if(genreInput.value === 'Documentary') {
        genreID = 99;
    } else if (genreInput.value === 'Fantasy') {
        genreID = 14;
    } else if (genreInput.value === 'History') {
        genreID = 36;
    } else if (genreInput.value === 'Comedy') {
        genreID = 35;
    } else if (genreInput.value === 'Crime') {
        genreID = 80;
    } else if (genreInput.value === 'Mystery') {
        genreID = 9648;
    } else if (genreInput.value === 'Romance') {
        genreID = 10749;
    } else if (genreInput.value === 'Sci fi') {
        genreID = 878;
    }
}
function displayReturnUI(){
    nameValue.textContent = userName.value;
    document.querySelector('#genre-val').textContent = genreInput.value;
    returnUI.classList.remove('none');
    startUI.style.display = 'none';
}

function displayStartUI() {
    returnUI.classList.add('none');
    startUI.style.disply = 'block';
}