require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearRenderLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";

/*
* - Web app state
    - Search query, result
    - This recipe
    - Likes recipes
    - 
*/

const state = {};

/*
 * Searcj controller = MVC = Controller = Model <==> View
 */

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
});

elements.pageButtons.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto);
    searchView.clearSearchList();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});
// const r = new Recipe(47746);
/*
 * Recipe Controller
 */
const controlRecipe = async () => {
  //1 Get id form url
  const id = window.location.hash.replace("#", "");
  //2 Create New Recipe model
  state.recipe = new Recipe(id);
  //3 Prepare for UI display
  //4 Download Ingredients
  await state.recipe.getRecipe();
  //5 Implement for ing and time
  state.recipe.calcTime();
  state.recipe.calcPerson();
  //6 Show Ing on Display
  console.log(state.recipe);
};
window.addEventListener("hashchange", controlRecipe);
