class Model {
  constructor(items) {
    this.initItem(items);
  }

  initItem(items) {
    this.items = items.reduce((acc, item) => {
      acc.set(item.name, item);
      return acc;
    }, new Map());
  }

  craftNewItem(itemCreateName, nameItemOnTable) {
    const { recipe, isOpen, img } = this.items.get(itemCreateName);
    const isCraft = recipe.every(item => nameItemOnTable.some(needItem => needItem === item));

    let result = {
      message: 'Для того чтобы получить новый ингредиент нужно следовать рецепту',
    };

    if (recipe.length === nameItemOnTable.length && isCraft) {
      result = { name: itemCreateName };
      if (!isOpen) {
        this.items.get(itemCreateName).isOpen = true;
        result.img = img;
        result.createItem = true;
      }
    }

    return result;
  }

  addNewRecept({ nameNewItem, needItemCraft, img = '/images/icon/none.png' }) {
    if (this.items.has(nameNewItem)) {
      return { message: 'Такой ингредиент уже есть' };
    }

    this.items.set(nameNewItem, { img, recipe: needItemCraft, isOpen: false });

    return { name: nameNewItem, img };
  }

  highlightItemsRecipe(nameItem) {
    const recipe = this.getRecipeItem(nameItem);

    const itemInfo = recipe.reduce((acc, name) => {
      if (!this.items.get(name).isOpen) {
        const img = this.getImgItem(name);

        acc.push({ name, img });
      }
      return acc;
    }, []);

    return itemInfo;
  }

  getImgItem(name) {
    const { img } = this.items.get(name);

    return img;
  }

  getRecipeItem(name) {
    const { recipe } = this.items.get(name);

    return recipe;
  }
}

export default Model;
