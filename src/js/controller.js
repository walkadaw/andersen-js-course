// События
const CRAFT = 'craft';
const HIGHLIGHT_ITEMS_RECIPE = 'highlightItemsRecipe';
const CREATE_MODEL = 'createModel';
const CREATE_RECIPE = 'createRecipe';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.initElements(model.items);
    this.initListener();
  }

  initListener() {
    this.view.on(CRAFT, this.newCraft);
    this.view.on(CREATE_MODEL, this.modalCreateContent);
    this.view.on(CREATE_RECIPE, this.createRecept);
    this.view.on(HIGHLIGHT_ITEMS_RECIPE, this.highlightItemsRecipe);
  }

  newCraft = ({ itemCreateName, nameItemOnTable }) => {
    const result = this.model.craftNewItem(itemCreateName, nameItemOnTable);
    if (result.messageType) {
      return this.view.showMessage(result);
    }

    return this.view.successCreate(itemCreateName, result);
  };

  createRecept = newRecept => {
    const result = this.model.addNewRecept(newRecept);
    if (result.messageType) {
      return this.view.showMessage(result);
    }

    const { name, img } = result;

    this.view.createNewRecipes(name, img);
    this.view.modalHide();
    return this.view.showMessage({ messageType: 'success', message: 'Новый рецепт создан' });
  };

  modalCreateContent = () => {
    this.view.modalCreateNewRecept(this.model.items);
  };

  highlightItemsRecipe = nameItem => {
    const { recipe } = this.model.items.get(nameItem);

    const itemInfo = recipe.reduce((acc, name) => {
      if (!this.model.items.get(name).isOpen) {
        const img = this.model.getImgItem(name);

        acc.push({ name, img });
      }
      return acc;
    }, []);

    this.view.highlightItem(recipe, itemInfo);
  };
}

export default Controller;
