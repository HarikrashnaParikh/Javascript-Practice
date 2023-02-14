// const target = document.querySelector("#target");
const autocomplete = {
  // Loads the dropdown menu with all the movies by comparing the string entered into input
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    // console.log(imgSrc);
    return `
    <img src="${imgSrc}"/>
    <h5>${movie.Title}(${movie.Year})</h5>
    
    `;
  },
  // Sets the title of movie in the input field depending upon movie clicked
  inputValue(movie) {
    return movie.Title;
  },
  // Fetches data from the api and returns it
  async fetchData(searchTerm) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "df368ead",
        //   s: "avengers",
        s: searchTerm,
      },
    });
    if (response.data.Error) {
      return [];
    }
    //   console.log(response.data);
    return response.data.Search;
  },
};

// fetchData();
createAutoComplete({
  ...autocomplete,
  root: document.querySelector("#left-autocomplete"),

  // selects the movie that user click from the dropdown menu
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"), "left");
  },
});
createAutoComplete({
  ...autocomplete,
  root: document.querySelector("#right-autocomplete"),

  // selects the movie that user click from the dropdown menu
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"), "right");
  },
});
// Fetches the movie that has been selected from the dropdown menu
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
  //   console.log(movie);
  const movieId = movie.imdbID;
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "df368ead",
      //   s: "avengers",
      i: movieId,
    },
  });
  //   console.log(response.data);
  summaryElement.innerHTML = movieTemplate(response.data);
  if (side === "left") {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    // console.log("hello");
    runComparison();
  }
};
const runComparison = () => {
  // console.log("Start run comparison");
  const leftSideStats = document.querySelectorAll(
    "#left-summary .notification"
  );
  const rightSideStats = document.querySelectorAll(
    "#right-summary .notification"
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];
    const leftSideValue = parseInt(leftStat.dataset.value);
    const rightSideValue = parseInt(rightStat.dataset.value);

    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
      rightStat.classList.add("is-primary");
      rightStat.classList.remove("is-warning");
    } else {
      rightStat.classList.add("is-warning");
      rightStat.classList.remove("is-primary");
      leftStat.classList.add("is-primary");
      leftStat.classList.remove("is-warning");
    }
  });
};
// Creates movie template when we select any movie from dropdown menu
const movieTemplate = (movieDetail) => {
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, "").replace(/\,/g, "")
  );
  const metaScore = parseInt(movieDetail.Metascore);
  const rating = parseFloat(movieDetail.imdbRating);
  const votes = parseFloat(movieDetail.imdbVotes.replace(/\,/g, ""));
  // let count = 0;
  const awards = parseInt(
    movieDetail.Awards.split(" ").reduce((prev, word) => {
      const value = parseInt(word);

      if (isNaN(value)) {
        return prev;
      } else {
        return prev + value;
        // return count;
      }
    }, 0)
  );
  // console.log(awards);

  const imgSrc = movieDetail.Poster === "N/A" ? "" : movieDetail.Poster;
  return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src=${imgSrc} />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4> ${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article data-value=${awards} class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metaScore} class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${rating} class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">Rating</p>
    </article>
    <article data-value=${votes} class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">Votes</p>
    </article>

    `;
};
