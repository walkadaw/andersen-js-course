class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.createIngredients(model.item, model.allItem, model.recipes);
    view.on('craft', this.newCraft.bind(this));
  }

  newCraft({ recipesId, idItemOnTable }) {
    const result = this.model.craftNewItem(recipesId, idItemOnTable);
    if (result.messageType) {
      return this.view.showMessage(result);
    }

    const { id, name, img } = result;

    return this.view.createNewItem(id, name, img);
  }
}

export default Controller;
