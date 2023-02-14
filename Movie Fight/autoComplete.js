const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  //   const root = document.querySelector(".autocomplete");
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>

`;
  const input = root.querySelector("input");
  const dropDown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");
  // const onInput = (e) => {};

  // let timeOutId;
  const onInput = async (e) => {
    //   if (timeOutId) {
    //     clearTimeout(timeOutId);
    //   }
    //   timeOutId = setTimeout((  ) => {
    const items = await fetchData(e.target.value);
    //   console.log(movies);
    if (!items.length) {
      dropDown.classList.remove("is-active");
      return;
    }
    resultsWrapper.innerHTML = "";
    dropDown.classList.add("is-active");
    for (let item of items) {
      // console.log(movie);

      const option = document.createElement("a");
      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      resultsWrapper.appendChild(option);
      option.addEventListener("click", (e) => {
        //   console.log(e.taonMovieSelectrget);
        //   input.innerText = movie.Title;
        dropDown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      // const poster = document.createElement("img");
      // poster.setAttribute("src", movie.Poster);
      // div.appendChild(poster);
      // // div.innerText = ` ${movie.Title}`;
      // const title = document.createElement("h4");
      // title.innerText = ` ${movie.Title}`;
      // div.appendChild(title);
      // target.appendChild(div);
    }
    //   }, 1000);
  };

  input.addEventListener("input", debounce(onInput));

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) {
      dropDown.classList.remove("is-active");
    }
  });
};
