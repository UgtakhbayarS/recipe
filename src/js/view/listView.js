import { elements } from "./base";

export const renderItem = item => {
  const itemHtml = `<li class="shopping__item" data-itemid = ${item.id}>
    <p class="shopping__description">${item.item}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
</li>`;

  elements.shoppingList.insertAdjacentHTML("beforeend", itemHtml);
};

export const clearItems = () => (elements.shoppingList.innerHTML = "");
export const deleteItem = id => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
};
/**
 * // <div class="shopping__count">
    //     <input type="number" value="500" step="100">
    //     <p>g</p>
    // </div>
 */
