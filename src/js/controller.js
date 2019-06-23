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
    this.view.addNewCraftItem(result);
  };

  createRecept = newRecept => {
    const result = this.model.addNewRecept(newRecept);
    this.view.addNewRecept(result);
  };

  modalCreateContent = () => {
    this.view.modalCreateNewRecept(this.model.items);
  };

  highlightItemsRecipe = nameItem => {
    const needCreateItem = this.model.highlightItemsRecipe(nameItem);
    const recipe = this.model.getRecipeItem(nameItem);

    this.view.highlightItem(recipe, needCreateItem);
  };
}

export default Controller;
