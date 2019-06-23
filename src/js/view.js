import EventEmitter from './helpers/EventEmitter';
import { create, createNewItemElement, findParentClass, modalCreate } from './helpers/helperDom';

// События
const CRAFT = 'craft';
const HIGHLIGHT_ITEMS_RECIPE = 'highlightItemsRecipe';
const CREATE_MODEL = 'createModel';
const CREATE_RECIPE = 'createRecipe';

// Константы классов
const ALCHEMIST = 'alchemist';
const INGREDIENTS = 'ingredients';
const RECIPES = 'recipes';

const HIGHLIGHT_ITEM_HOVER = 'need';
const HIGHLIGHT_ITEM_HOVER_NEED_COUNT = 'needCount';

const ROTATE = 'rotate';
const SUCCESS = 'success';

// Регулярки
const IS_IMAGE = /\.(jpe?g|png|gif)$/i;

class View extends EventEmitter {
  constructor() {
    super();

    this.initDOM();
    this.initListener();
  }

  initElements(items) {
    items.forEach(({ img, isOpen, recipe }, name) => {
      if (isOpen) {
        this.createNewItem(name, img);
      }
      if (recipe) {
        this.createNewRecipes(name, img);
      }
    });
  }

  initDOM() {
    this.ingredients = document.querySelector('.ingredients ul');
    this.recipes = document.querySelector('.recipes ul');
    this.alchemist = document.querySelector('.alchemist');
    this.tableAlchemist = document.querySelector('.alchemist ul');

    this.modal = document.querySelector('.modal');
    this.modalSelect = document.querySelector('.modal-content div');
    this.message = document.querySelector('.message');

    this.createButton = document.getElementById('createElement');
    this.clearButton = document.getElementById('clear');
    this.openModalButton = document.getElementById('addRecipes');
    this.nextRecipesButton = document.getElementById('nextRecipes');
    this.closeModalButton = document.getElementById('closeModal');
  }

  initListener() {
    this.createButton.addEventListener('click', this.craftNewElement, false);
    this.clearButton.addEventListener('click', this.clearTable, false);

    this.recipes.addEventListener('mouseover', this.hoverHighlight, false);
    this.recipes.addEventListener('mouseleave', this.offHighlight, false);
    this.createButton.addEventListener('mouseover', this.hoverHighlight, false);
    this.createButton.addEventListener('mouseleave', this.offHighlight, false);

    this.message.addEventListener('click', this.hideMessage, false);

    this.modal.addEventListener('click', this.modalHide, false);
    this.openModalButton.addEventListener('click', this.modalOpen, false);

    document.addEventListener('dragstart', this.dragStart, false);
    document.addEventListener('dragover', event => event.preventDefault(), false);
    document.addEventListener('drop', this.dragDrop, false);
  }

  createNewItem = (name, img) => {
    const item = createNewItemElement(name, img, INGREDIENTS);
    this.ingredients.appendChild(item);
  };

  createNewRecipes = (name, img) => {
    const recipes = createNewItemElement(name, img, RECIPES);
    this.recipes.appendChild(recipes);
  };

  craftNewElement = () => {
    const itemOnTable = this.tableAlchemist.querySelectorAll('li');
    const nameItemOnTable = [...itemOnTable].map(value => value.getAttribute('data-name'));

    const itemCreateName = this.createButton.getAttribute('data-name');

    if (!itemCreateName) {
      return this.errorMessage('Необходимо выбрать рецепт');
    }

    if (nameItemOnTable.length === 0) {
      return this.infoMessage(
        'Чтобы создать новый предмет необходимо соединить несколько ингредиентов'
      );
    }

    return this.emit(CRAFT, { itemCreateName, nameItemOnTable });
  };

  addNewCraftItem = result => {
    if (result.message) {
      this.errorMessage(result.message);
    } else {
      const { name, img, createItem = false } = result;
      if (createItem) {
        this.recipes.querySelector(`[data-name='${name}']`).classList.add(SUCCESS);

        this.createNewItem(name, img);
      }

      this.alchemist.classList.toggle(ROTATE);
      setTimeout(this.clearTable, 500);
    }
  };

  dragStart = event => {
    const id = event.target.getAttribute('data-name');
    const typeItem = event.target.getAttribute('data-type');
    event.dataTransfer.setData('itemId', id);
    event.dataTransfer.setData('typeItem', typeItem);
  };

  dragDrop = event => {
    event.preventDefault();

    const itemId = event.dataTransfer.getData('itemId');
    const typeItem = event.dataTransfer.getData('typeItem');
    const isTableAlchemist = findParentClass(event.target, ALCHEMIST);

    if (isTableAlchemist) {
      if (typeItem === INGREDIENTS) {
        if (this.tableAlchemist.childElementCount < 3) {
          const item = this.ingredients.querySelector(`[data-name='${itemId}']`).cloneNode(true);
          item.setAttribute('data-type', ALCHEMIST);
          this.tableAlchemist.appendChild(item);
        }
      } else if (typeItem === RECIPES) {
        this.createButton.innerHTML = '';
        const recipes = this.recipes.querySelector(`[data-name='${itemId}']`);
        const name = recipes.getAttribute('data-name');

        this.createButton.setAttribute('data-name', name);
        this.createButton.innerHTML = recipes.innerHTML;
      }
    } else if (typeItem === ALCHEMIST) {
      this.alchemist.querySelector(`li[data-name='${itemId}']`).remove();
    }
  };

  createNewRecept = () => {
    const optionList = this.modalSelect.querySelectorAll('select');
    const nameNewItem = document.getElementById('newName').value;
    const file = this.modalSelect.querySelector('input[type=file]').files;

    const needItemCraft = [...optionList].reduce((acc, { value }) => {
      if (value !== 'none') {
        acc.push(value);
      }
      return acc;
    }, []);

    if (needItemCraft.length < 1) {
      return this.errorMessage('Рецепт должен состоять хотя бы из 1 элемента');
    }
    if (nameNewItem.length < 2) {
      return this.errorMessage('Название должно содержать минимум 2 символа');
    }

    if (file.length > 0 && IS_IMAGE.test(file[0].name)) {
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        this.renderImage.bind(this, { nameNewItem, needItemCraft }),
        false
      );

      return reader.readAsDataURL(file[0]);
    }

    return this.emit(CREATE_RECIPE, { nameNewItem, needItemCraft });
  };

  renderImage = ({ nameNewItem, needItemCraft }, { srcElement: { result: img } }) => {
    return this.emit(CREATE_RECIPE, {
      nameNewItem,
      needItemCraft,
      img,
    });
  };

  addNewRecept(result) {
    if (result.message) {
      return this.errorMessage(result.message);
    }

    const { name, img } = result;

    this.createNewRecipes(name, img);
    this.modalHide();
    return this.successMessage('Новый рецепт создан');
  }

  modalCreateNewRecept = itemAll => {
    this.modalSelect.innerHTML = '';

    const { contentModel, contentSelect } = modalCreate(itemAll);

    this.modalSelect.appendChild(contentModel);
    this.modalSelectContent = contentSelect;

    this.modal.style.display = 'block';

    this.addVariationButton = document.getElementById('addVariationItem');
    this.addVariationButton.addEventListener('click', this.modalAddVariationItem);

    document.getElementById('createNewRecept').addEventListener('click', this.createNewRecept);
  };

  modalAddVariationItem = event => {
    event.preventDefault();

    const allSelect = this.modalSelect.querySelector('.all-select');

    allSelect.appendChild(this.modalSelectContent.cloneNode(true));

    if (allSelect.children.length === 3) {
      this.addVariationButton.style.display = 'none';
    }
  };

  modalOpen = () => {
    this.emit(CREATE_MODEL);
  };

  modalHide = (event = false) => {
    if (event === false || event.target === this.modal || event.target === this.closeModalButton) {
      this.modal.style.display = 'none';
    }
  };

  clearTable = () => {
    this.createButton.removeAttribute('data-name');
    this.createButton.innerHTML = 'Создать';
    this.tableAlchemist.innerHTML = '';
    this.hideMessage();
  };

  hoverHighlight = event => {
    const nameItem =
      event.target.getAttribute('data-name') ||
      event.target.parentElement.getAttribute('data-name');

    if (nameItem !== this.highlightId) {
      this.offHighlight();

      if (nameItem) {
        this.highlightName = nameItem;
        this.highlightTime = setTimeout(() => {
          this.emit(HIGHLIGHT_ITEMS_RECIPE, nameItem);
        }, 250);
      }
    }
  };

  highlightItem = (needItemCraft, needCreateItem) => {
    const needItemHighligh = needItemCraft.reduce((acc, value) => {
      const item = acc.find(({ name }) => name === value);

      if (item) {
        item.count += 1;
      } else {
        acc.push({ name: value, count: 1 });
      }

      return acc;
    }, []);

    needCreateItem.forEach(({ name, img }) => {
      const item = createNewItemElement(name, img, INGREDIENTS);
      item.classList.add('delete');
      this.ingredients.appendChild(item);
    });

    needItemHighligh.forEach(({ name, count }) => {
      const item = this.ingredients.querySelector(`[data-name='${name}']`);

      item.classList.add(HIGHLIGHT_ITEM_HOVER);
      const div = create('div', { class: HIGHLIGHT_ITEM_HOVER_NEED_COUNT }, count);
      item.appendChild(div);
    });
  };

  offHighlight = () => {
    clearTimeout(this.highlightTime);

    const needDel = this.ingredients.querySelectorAll('li.delete');
    needDel.forEach(item => item.remove());

    const lisItem = this.ingredients.querySelectorAll('li.need');
    this.highlightName = null;
    lisItem.forEach(item => {
      item.classList.remove(HIGHLIGHT_ITEM_HOVER);
      item.removeChild(item.querySelector(`.${HIGHLIGHT_ITEM_HOVER_NEED_COUNT}`));
    });
  };

  showMessage = (messageType, message) => {
    this.message.innerHTML = '';
    const msg = create('div', { class: messageType }, message);
    const close = create('button', { id: 'closeMsg', type: 'button' }, '&times;');
    msg.appendChild(close);

    this.message.appendChild(msg);
    this.message.style.display = 'block';

    this.msgTimer = setTimeout(this.hideMessage, 2500);
  };

  errorMessage(msg) {
    this.showMessage('error', msg);
  }

  successMessage(msg) {
    this.showMessage('success', msg);
  }

  infoMessage(msg) {
    this.showMessage('info', msg);
  }

  hideMessage = () => {
    this.message.style.display = 'none';
    clearTimeout(this.msgTimer);
  };
}

export default View;
