import { EventEmitter, create } from './helpers';

class View extends EventEmitter {
  constructor() {
    super();

    this.ingredients = document.querySelector('.ingredients');
    this.recipes = document.querySelector('.recipes');
    this.alchemist = document.querySelector('.alchemist');
    this.message = document.querySelector('.message');
    this.createButton = document.getElementById('createElement');
    this.clearButton = document.getElementById('clear');

    this.createButton.addEventListener('click', this.createNewElement.bind(this));
    this.clearButton.addEventListener('click', this.clearTable.bind(this));
    this.recipes.addEventListener('click', this.selectionRecipes.bind(this));
  }

  createIngredients(item, itemAll, recipes) {
    item.forEach(id => {
      this.createNewItem(id, itemAll[id].name, itemAll[id].img);
    });

    recipes.forEach(({ newItem }, id) => {
      this.createNewRecipes(id, itemAll[newItem].name, itemAll[newItem].img);
    });
  }

  createNewItem(id, name, img) {
    const li = create(
      'li',
      {
        draggable: 'true',
        id,
        'data-img': img,
      },
      name
    );
    this.ingredients.appendChild(li);
  }

  createNewRecipes(id, name, img) {
    const li = create(
      'li',
      {
        'data-id': id,
        'data-img': img,
      },
      name
    );
    this.recipes.appendChild(li);
  }

  createNewElement() {
    const itemOnTable = this.alchemist.querySelectorAll('li');
    const idItemOnTable = [];
    itemOnTable.forEach(value => idItemOnTable.push(Number(value.getAttribute('id'))));

    const recipesId = this.alchemist.getAttribute('data-id');
    if (!recipesId) {
      this.showMessage({ messageType: 'error', message: 'Необходимо выбрать рецепт' });
    } else {
      this.emit('craft', { recipesId, idItemOnTable });
    }
  }

  selectionRecipes(event) {
    if (event.target && event.target.matches('li')) {
      const idRecipes = event.target.getAttribute('data-id');
      this.alchemist.setAttribute('data-id', idRecipes);
    }
  }

  showMessage({ messageType, message }) {
    this.message.innerHTML = '';
    const div = create('div', { class: messageType }, message);
    this.message.appendChild(div);
  }

  clearTable() {
    this.alchemist.innerHTML = '';
  }
}

export default View;
