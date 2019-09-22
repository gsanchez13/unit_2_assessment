document.addEventListener("DOMContentLoaded", async () => {
    await getMovieOptions();
    let form = document.querySelector("#form");
    form.addEventListener("submit", addReview);
    let selectBox = document.querySelector("#select_box");
    selectBox.addEventListener("change", getMovieDetails, false);
})
const getMovieOptions =  async () => {
    let moviesUrl = "https://ghibliapi.herokuapp.com/films"
    let allMovies = await axios.get(moviesUrl)
    let allMoviesArr = allMovies.data
        setOptions(allMoviesArr)
}
const setOptions = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        let movieName = arr[i].title;
        let id = arr[i].id
            createOption(movieName, id);
}}
const createOption = (title, id) => {
    let selectBox = document.querySelector("#select_box");
    let newOption = document.createElement("option");
        newOption.innerText = title;
        newOption.value = id;
    selectBox.appendChild(newOption)
}
const addReview = (event) => {
    event.preventDefault();
    let reviewList = document.querySelector("ul");
    let inputTextbox = document.querySelector("#review_input");
    let inputText = inputTextbox.value;
    let newReviewItem = document.createElement("li");
        newReviewItem.innerText = inputText;
        reviewList.appendChild(newReviewItem);
        inputTextbox.value = " ";
}
const getMovieDetails = async() => {
    let selectBox = document.querySelector("#select_box");
    let movieName = document.querySelector("#movie_name")
    let releaseYear = document.querySelector("#release_year")
    let description = document.querySelector("#description")
    let id = selectBox.value;
    let url = `https://ghibliapi.herokuapp.com/films/${id}`
    let selectedMovie = await axios.get(url)
    let selectedMovieName = selectedMovie.data.title;
    let selectedMovieYear = selectedMovie.data.release_date;
    let selectedMovieBlurb = selectedMovie.data.description;
        movieName.innerText = selectedMovieName;
        releaseYear.innerText = selectedMovieYear;
        description.innerText =  selectedMovieBlurb;
} 