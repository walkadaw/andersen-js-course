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
      messageType: 'error',
      message: 'Для того чтобы получить новый ингредиент нужно следовать рецепту',
    };

    if (recipe.length === nameItemOnTable.length && isCraft) {
      result = { img };
      if (!isOpen) {
        this.items.get(itemCreateName).isOpen = true;
        result.createItem = true;
      }
    }

    return result;
  }

  addNewRecept({ nameNewItem, needItemCraft, img = '/images/icon/none.png' }) {
    if (this.items.has(nameNewItem)) {
      return {
        messageType: 'error',
        message: 'Такой ингредиент уже есть',
      };
    }

    this.items.set(nameNewItem, { img, recipe: needItemCraft, isOpen: false });

    return { name: nameNewItem, img };
  }

  getImgItem(name) {
    const { img } = this.items.get(name);

    return img;
  }
}

export default Model;
