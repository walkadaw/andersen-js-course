class Model {
  constructor(allItem, startItem, recipes) {
    this.allItem = allItem;
    this.item = startItem;
    this.recipes = recipes;
  }

  craftNewItem(idRecipes, items) {
    const { newItem, needItemCraft } = this.recipes[idRecipes];
    const isCraft =
      needItemCraft.length === items.length
        ? needItemCraft.every(item => items.some(needItem => needItem === item))
        : false;

    let result = {
      messageType: 'error',
      message: 'Для того чтобы получить новый ингредиент нужно следовать рецепту',
    };

    if (isCraft && items.length > 0) {
      result = this.getInfoItem(newItem);

      if (!this.item.includes(newItem)) {
        this.item.push(newItem);
        result.createItem = true;
      }
    } else if (items.length === 0) {
      result = {
        messageType: 'info',
        message: 'Чтобы создать новый предмет необходимо соединить несколько ингредиентов',
      };
    }

    return result;
  }

  newRecept({ nameNewItem, needItemCraft, image = '/images/icon/none.png' }) {
    const isFindName = this.allItem.some(({ name }) => name === nameNewItem);
    if (isFindName) {
      return {
        messageType: 'error',
        message: 'Такой ингредиент уже есть',
      };
    }

    const idNewItem = this.allItem.length;
    const idNewRecept = this.recipes.length;

    this.allItem.push({ name: nameNewItem, img: image });
    this.recipes.push({ newItem: idNewItem, needItemCraft });

    return {
      id: idNewRecept,
      name: nameNewItem,
      img: image,
    };
  }

  getInfoItem(id) {
    const result = {
      id,
      name: this.allItem[id].name,
      img: this.allItem[id].img,
    };

    return result;
  }
}

export default Model;
