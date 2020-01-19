require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearRenderLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import { renderRecipe, clearRecipe } from "./view/recipeView";
import List from "./model/List";
import * as listView from "./view/listView";

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
  //if id is exist then implemets
  if (id) {
    //2 Create New Recipe model
    state.recipe = new Recipe(id);
    //3 Prepare for UI display
    clearRecipe();
    //4 Download Ingredients
    renderLoader(elements.recipeDiv);
    await state.recipe.getRecipe();
    //5 Implement for ing and time
    clearRenderLoader();
    state.recipe.calcTime();
    state.recipe.calcPerson();
    //6 Show Ing on Display
    renderRecipe(state.recipe);
  }
};
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach(e => window.addEventListener(e, controlRecipe));

const controlList = () => {
  //Create new Ingredient Model
  //This model adding ing
  state.list = new List();
  listView.clearItems();
  state.recipe.ingredients.forEach(n => {
    const item = state.list.addItem(n);

    listView.renderItem(item);
  });
};

elements.recipeDiv.addEventListener("click", e => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    controlList();
  }
});

elements.shoppingList.addEventListener("click", e => {
  //clicked li element
  const id = e.target.closest(".shopping__item").dataset.itemid;
  state.list.deleteItem(id);
  listView.deleteItem(id);
});
