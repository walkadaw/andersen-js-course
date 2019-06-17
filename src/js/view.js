import { EventEmitter, create, createNewItemElement } from './helpers';

class View extends EventEmitter {
  constructor() {
    super();

    this.ingredients = document.querySelector('.ingredients > ul');
    this.recipes = document.querySelector('.recipes > ul');
    this.alchemist = document.querySelector('.alchemist');
    this.tableAlchemist = document.querySelector('.alchemist > ul');

    this.modal = document.querySelector('.modal');
    this.modalSelect = document.querySelector('.modal-content > div');
    this.message = document.querySelector('.message');

    this.createButton = document.getElementById('createElement');
    this.clearButton = document.getElementById('clear');
    this.openModalButton = document.getElementById('addRecipes');
    this.nextRecipesButton = document.getElementById('nextRecipes');
    this.closeModalButton = document.getElementById('closeModal');

    this.createButton.addEventListener('click', this.createNewElement.bind(this), false);
    this.clearButton.addEventListener('click', this.clearTable.bind(this), false);

    this.recipes.addEventListener('mouseover', this.hoverHighlight.bind(this), false);
    this.recipes.addEventListener('mouseleave', this.offHighlight.bind(this), false);
    this.createButton.addEventListener('mouseover', this.hoverHighlight.bind(this), false);
    this.createButton.addEventListener('mouseleave', this.offHighlight.bind(this), false);

    this.message.addEventListener('click', this.hideMessage.bind(this), false);

    this.modal.addEventListener('click', this.modalHide.bind(this), false);
    this.openModalButton.addEventListener('click', this.modalOpen.bind(this), false);

    this.nextRecipesButton.addEventListener('click', this.scrollListRecipes.bind(this), false);

    document.addEventListener('dragstart', this.dragStart, false);
    document.addEventListener('dragover', event => event.preventDefault(), false);
    document.addEventListener('drop', this.dragDrop.bind(this), false);
  }

  initializeElements(item, itemAll, recipes) {
    item.forEach(id => {
      this.createNewItem(id, itemAll[id].name, itemAll[id].img);
    });

    recipes.forEach(({ newItem }, id) => {
      this.createNewRecipes(id, itemAll[newItem].name, itemAll[newItem].img);
    });

    const li = this.recipes.querySelector('li');
    const liStyle = getComputedStyle(li);

    this.recipesLiHeight =
      li.offsetHeight +
      Number.parseInt(liStyle['margin-top'], 10) +
      Number.parseInt(liStyle['margin-bottom'], 10);
  }

  createNewItem(id, name, img) {
    const item = createNewItemElement(id, name, img, 'ingredients');
    this.ingredients.appendChild(item);
  }

  createNewRecipes(id, name, img) {
    const recipes = createNewItemElement(id, name, img, 'recipes');
    this.recipes.appendChild(recipes);
  }

  createNewElement() {
    const itemOnTable = this.tableAlchemist.querySelectorAll('li');
    const idItemOnTable = [];
    itemOnTable.forEach(value => idItemOnTable.push(Number(value.getAttribute('data-id'))));

    const recipesId = this.createButton.getAttribute('data-id');
    if (recipesId) {
      this.emit('craft', { recipesId, idItemOnTable });
    } else {
      this.showMessage({ messageType: 'error', message: 'Необходимо выбрать рецепт' });
    }
  }

  successCreate(idRecipes, { id, name, img, createItem = false }) {
    if (createItem) {
      this.recipes.querySelector(`[data-id='${idRecipes}']`).classList.add('success');

      this.createNewItem(id, name, img);
    }
    this.alchemist.classList.toggle('rotate');
    setTimeout(this.clearTable.bind(this), 500);
  }

  // eslint-disable-next-line class-methods-use-this
  dragStart(event) {
    const id = event.target.getAttribute('data-id');
    const typeItem = event.target.getAttribute('data-type');
    event.dataTransfer.setData('itemId', id);
    event.dataTransfer.setData('typeItem', typeItem);
  }

  dragDrop(event) {
    event.preventDefault();

    const itemId = event.dataTransfer.getData('itemId');
    const typeItem = event.dataTransfer.getData('typeItem');
    const isTableAlchemist =
      event.target.classList.contains('alchemist') ||
      event.target.id === 'createElement' ||
      event.target.parentElement.id === 'createElement';

    if (isTableAlchemist) {
      if (typeItem === 'ingredients') {
        if (this.tableAlchemist.childElementCount < 3) {
          const item = this.ingredients.querySelector(`[data-id='${itemId}']`).cloneNode(true);
          item.setAttribute('data-type', 'alchemist');
          this.tableAlchemist.appendChild(item);
        }
      } else if (typeItem === 'recipes') {
        this.createButton.innerHTML = '';
        const recipes = this.recipes.querySelector(`[data-id='${itemId}']`);
        const idRecipes = recipes.getAttribute('data-id');
        const name = recipes.innerHTML;

        this.createButton.setAttribute('data-id', idRecipes);

        this.createButton.innerHTML = name;
      }
    } else if (typeItem === 'alchemist') {
      this.alchemist.querySelector(`li[data-id='${itemId}']`).remove();
    }
  }

  createNewRecept() {
    const optionList = this.modalSelect.querySelectorAll('select');
    const nameNewItem = document.getElementById('newName').value;
    const file = this.modalSelect.querySelector('input[type=file]').files;

    const needItemCraft = [];

    // forEach+push ( ╯°□°)╯┻┻ Это NodeList, нет reduce, я проверил (╮°-°)┳┳)
    optionList.forEach(select => {
      const value = Number(select.value);
      if (Number.isInteger(value)) {
        needItemCraft.push(value);
      }
    });

    if (needItemCraft.length < 1) {
      return this.showMessage({
        messageType: 'error',
        message: 'Рецепт должен состоять хотя бы из 1 элемента',
      });
    }
    if (nameNewItem.length < 2) {
      return this.showMessage({
        messageType: 'error',
        message: 'Название должно содержать минимум 2 символа',
      });
    }

    if (file.length > 0 && /\.(jpe?g|png|gif)$/i.test(file[0].name)) {
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        this.renderImage.bind(this, { nameNewItem, needItemCraft }),
        false
      );

      return reader.readAsDataURL(file[0]);
    }

    return this.emit('createRecept', { nameNewItem, needItemCraft });
  }

  renderImage({ nameNewItem, needItemCraft }, img) {
    return this.emit('createRecept', {
      nameNewItem,
      needItemCraft,
      image: img.srcElement.result,
    });
  }

  showMessage({ messageType, message }) {
    this.message.innerHTML = '';
    const msg = create('div', { class: messageType }, message);
    const close = create('button', { id: 'closeMsg', type: 'button' }, '&times;');
    msg.appendChild(close);

    this.message.appendChild(msg);
    this.message.style.display = 'block';

    this.msgTimer = setTimeout(this.hideMessage.bind(this), 2500);
  }

  hideMessage() {
    this.message.style.display = 'none';
    clearTimeout(this.msgTimer);
  }

  modalCreateNewRecept(itemAll) {
    const row = create('div', { class: 'row' });
    row.appendChild(
      create('input', { type: 'text', id: 'newName', placeholder: 'Имя нового ингредиента' })
    );

    row.appendChild(create('input', { type: 'file' }));

    this.modalSelect.appendChild(row);

    const rowSelect = create('div', { class: 'row select' });
    const select = create('select');
    select.appendChild(
      create('option', { disabled: 'disabled', selected: 'selected' }, 'Выберете ингридиент')
    );

    itemAll.forEach(({ name }, id) => {
      const option = create(
        'option',
        {
          value: id,
        },
        name
      );
      select.appendChild(option);
    });

    rowSelect.appendChild(select);
    this.modalSelect.appendChild(rowSelect);

    this.modalSelect.appendChild(
      create('button', { type: 'button', id: 'addVariationItem', class: 'btn blue' }, '+')
    );
    this.modalSelect.appendChild(
      create('button', { type: 'button', id: 'createNewRecept', class: 'btn blue' }, 'Создать')
    );
  }

  modalAddVariationItem(event) {
    event.preventDefault();

    const select = this.modalSelect.querySelectorAll('.select');
    this.modalSelect.insertBefore(
      select.item(0).cloneNode(true),
      select.item(select.length - 1).nextSibling
    );
    if (select.length === 2) {
      this.addVariationButton.style.display = 'none';
    }
  }

  modalOpen() {
    this.modalSelect.innerHTML = '';
    this.emit('createModel');
    this.modal.style.display = 'block';

    this.addVariationButton = document.getElementById('addVariationItem');
    this.addVariationButton.addEventListener('click', this.modalAddVariationItem.bind(this));

    document
      .getElementById('createNewRecept')
      .addEventListener('click', this.createNewRecept.bind(this));
  }

  modalHide(event = false) {
    if (event === false || event.target === this.modal || event.target === this.closeModalButton) {
      this.modal.style.display = 'none';
    }
  }

  clearTable() {
    this.createButton.removeAttribute('data-id');
    this.createButton.innerHTML = 'Создать';
    this.tableAlchemist.innerHTML = '';
    this.hideMessage();
  }

  hoverHighlight(event) {
    const dataId =
      event.target.getAttribute('data-id') || event.target.parentElement.getAttribute('data-id');

    if (dataId !== this.highlightId) {
      this.offHighlight();

      if (dataId) {
        this.highlightId = dataId;
        this.highlightTime = setTimeout(() => {
          this.emit('getIdItemRecept', dataId);
        }, 250);
      }
    }
  }

  highlightItem({ needItemCraft }, needCreateItem) {
    const needItem = needItemCraft.reduce((acc, value) => {
      const item = acc.find(({ id }) => id === value);

      if (item) {
        item.count += 1;
      } else {
        acc.push({ id: value, count: 1 });
      }

      return acc;
    }, []);

    needItem.forEach(({ id, count }) => {
      let item = this.ingredients.querySelector(`[data-id='${id}']`);

      if (!item) {
        const { name, img } = needCreateItem.find(({ id: itemId }) => itemId === id);
        item = createNewItemElement(id, name, img, 'ingredients');
        item.classList.add('delete');
        this.ingredients.appendChild(item);
      }

      item.classList.add('need');
      const div = create('div', { class: 'needCount' }, count);
      item.appendChild(div);
    });
  }

  offHighlight() {
    clearTimeout(this.highlightTime);

    const needDel = this.ingredients.querySelectorAll('li.delete');
    needDel.forEach(item => item.remove());

    const lisItem = this.ingredients.querySelectorAll('li.need');
    this.highlightId = -1;
    lisItem.forEach(item => {
      item.classList.remove('need');
      item.removeChild(item.querySelector('.needCount'));
    });
  }

  scrollListRecipes() {
    const marginTop = Number.parseInt(getComputedStyle(this.recipes).marginTop, 10);
    const line = Math.ceil(this.recipes.clientHeight / this.recipesLiHeight - 1);

    if (line <= Math.abs((marginTop - this.recipesLiHeight) / this.recipesLiHeight)) {
      this.recipes.style.marginTop = '0';
    } else {
      this.recipes.style.marginTop = `${marginTop - this.recipesLiHeight}px`;
    }
  }
}

export default View;
