class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.initializeElements(model.item, model.allItem, model.recipes);

    view.on('craft', this.newCraft.bind(this));
    view.on('createModel', this.modalCreateContent.bind(this));
    view.on('createRecept', this.createRecept.bind(this));
    view.on('getIdItemRecept', this.getIdItemRecept.bind(this));
  }

  newCraft({ recipesId, idItemOnTable }) {
    const result = this.model.craftNewItem(recipesId, idItemOnTable);
    if (result.messageType) {
      return this.view.showMessage(result);
    }

    return this.view.successCreate(recipesId, result);
  }

  createRecept(newRecept) {
    const result = this.model.newRecept(newRecept);
    if (result.messageType) {
      return this.view.showMessage(result);
    }

    const { id, name, img } = result;

    this.view.createNewRecipes(id, name, img);
    this.view.modalHide();
    return this.view.showMessage({ messageType: 'success', message: 'Новый рецепт создан' });
  }

  modalCreateContent() {
    this.view.modalCreateNewRecept(this.model.allItem);
  }

  getIdItemRecept(idRecept) {
    const listItem = this.model.recipes[idRecept];

    const itemInfo = listItem.needItemCraft.reduce((arr, id) => {
      if (!this.model.item.includes(id)) {
        arr.push(this.model.getInfoItem(id));
      }
      return arr;
    }, []);

    this.view.highlightItem(listItem, itemInfo);
  }
}

export default Controller;
