require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearRenderLoader } from "./view/base";
import * as searchView from "./view/searchView";

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
  const query = searchView.getInput();
  if (query) {
    //2. Create the new search object.
    state.search = new Search(query);
    //3. Prepare UI display for searching
    searchView.clearSearchQuery();
    searchView.clearSearchList();
    renderLoader(elements.searchResultsLoader);
    //4. Do search
    await state.search.doSearch();
    //5. Display the result of search
    clearRenderLoader();
    if (state.search.result === undefined) alert("Not found from searching");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
  //   const sr = new Search("pizza");
  //   sr.doSearch().then(r => console.log(r));
});
