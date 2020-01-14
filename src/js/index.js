require("@babel/polyfill");
import Search from "./model/Search";

/*
* - Web app state
    - Search query, result
    - This recipe
    - Likes recipes
    - 
*/

const state = {};

const controlSearch = async () => {
  //1. Get the keyword form form
  const query = "pizza";
  if (query) {
    //2. Create the new search object.
    state.search = new Search(query);
    //3. Prepare UI display for searching
    //4. Do search
    await state.search.doSearch();
    //5. Display the result of search
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
  //   const sr = new Search("pizza");
  //   sr.doSearch().then(r => console.log(r));
});
