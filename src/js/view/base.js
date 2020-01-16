export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultList: document.querySelector(".results__list"),
  searchResultsLoader: document.querySelector(".results"),
  pageButtons: document.querySelector(".results__pages")
};

export const ElementString = {
  loader: "loader"
};

export const clearRenderLoader = () => {
  const loader = document.querySelector(`.${ElementString.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};

export const renderLoader = parent => {
  const iconLoader = `
    <div class="${ElementString.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"</use>
        </svg>
    </div>`;

  parent.insertAdjacentHTML("afterbegin", iconLoader);
};
