require("@babel/polyfill");
import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async doSearch() {
    try {
      let result = await axios(
        "https://forkify-api.herokuapp.com/api/search?q=" + this.query
      );
      const recipes = result.data.recipes;
      return recipes;
    } catch (err) {
      alert("Problem: " + err);
    }
  }
}
