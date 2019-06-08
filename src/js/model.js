class Model {
  constructor() {
    this.allItem = [
      { name: 'Вода', img: 'water' },
      { name: 'Огонь', img: 'fire' },
      { name: 'Земля', img: 'earn' },
      { name: 'Воздух', img: 'air' },
      { name: 'Палка', img: 'stick' },
      { name: 'Факел', img: 'torch' },
    ];
    this.item = [0, 1, 2, 3, 4];
    this.recipes = [{ newItem: 5, itemCraft: [4, 1] }];
  }

  craftNewItem(idRecipes, items) {
    const { newItem, itemCraft } = this.recipes[idRecipes];
    const isCraft =
      itemCraft.length === items.length
        ? itemCraft.every(item => items.some(needItem => needItem === item))
        : false;
    let result = {
      messageType: 'error',
      message: 'Для того чтобы получить новый ингредиент нужно следовать рецепту',
    };

    if (isCraft && items.length > 0) {
      if (!this.item.includes(newItem)) {
        this.item.push(newItem);

        result = this.getInfoItem(newItem);
      } else {
        result = {
          messageType: 'info',
          message: 'Вы уже открыли данный ингридиент',
        };
      }
    } else if (items.length === 0) {
      result = {
        messageType: 'info',
        message: 'Чтобы создать новый предмет необходимо соединить несколько ингредиентов',
      };
    }

    return result;
  }

  getInfoItem(id) {
    const result = this.allItem[id];
    result.id = id;
    return result;
  }
}

export default Model;
