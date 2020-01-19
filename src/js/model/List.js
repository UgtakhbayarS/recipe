import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  deleteItem(id) {
    const ind = this.items.findIndex(e => e.id === id);
    this.items.splice(ind, 1);
  }

  addItem(item) {
    let newItem = {
      id: uniqid(),
      item
    };
    this.items.push(newItem);

    return newItem;
  }
}
