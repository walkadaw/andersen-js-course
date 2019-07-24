import EventEmitter from './helpers/EventEmitter';
import createElement from './helpers/helpers';

class View extends EventEmitter {
  constructor() {
    super();

    this.initElement();
    this.initTypeList();
    this.initEvents();
  }

  initElement() {
    this.form = document.getElementById('todo-form');
    this.input = document.getElementById('add-input');
    this.listItem = document.getElementById('todo-list');
    this.allNotes = document.getElementById('list');
    this.typeList = document.getElementById('type-list');
    this.fullNotes = document.getElementById('full-note');
  }

  initTypeList() {
    const typeItem = this.typeList.querySelector('a.active');
    const type = typeItem.getAttribute('data-type');

    this.type = type;
  }

  initEvents() {
    this.form.addEventListener('submit', this.handleAdd.bind(this));
    this.typeList.addEventListener('click', this.changeType.bind(this));
  }

  changeType(event) {
    event.preventDefault();
    if (event.target.nodeName === 'A' && !event.target.classList.contains('active')) {
      const typeItem = this.typeList.querySelector('a.active');

      typeItem.classList.remove('active');
      event.target.classList.add('active');

      this.initTypeList();
      this.hideFullNotes();
      this.emit('changeType');
    }
  }

  createElement({ _id: id, text }) {
    const label = createElement(
      'a',
      { href: `/notes/${id}`, className: 'text' },
      `${text.substr(0, 70)}...`
    );
    const item = createElement(
      'li',
      {
        className: 'todo-item',
      },
      label
    );
    item.setAttribute('data-id', id);

    label.addEventListener('click', this.fullOpen.bind(this));

    return item;
  }

  addEventListeners(item) {
    const editButton = item.querySelector('button.edit');
    const removeButton = item.querySelector('button.remove');
    const backButton = item.querySelector('button.hide');

    editButton.addEventListener('click', this.handleEdit.bind(this));
    removeButton.addEventListener('click', this.handleRemove.bind(this));
    backButton.addEventListener('click', this.hideFullNotes);

    return item;
  }

  handleAdd(event) {
    event.preventDefault();

    if (!this.input.value) return alert('Необходимо вести текст');

    return this.emit('add', this.input.value);
  }

  handleEdit({ target }) {
    const listItem = target.parentNode;
    const span = listItem.querySelector('.text');
    const input = listItem.querySelector('.textfield');
    const editButton = listItem.querySelector('button.edit');

    const id = listItem.getAttribute('data-id');
    const text = input.value;

    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
      this.emit('edit', { id, text });
    } else {
      input.value = span.textContent;
      editButton.textContent = 'Сохранить';
      listItem.classList.add('editing');
    }
  }

  handleRemove({ target }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');

    this.emit('remove', { id });
  }

  findListItem(id) {
    return this.listItem.querySelector(`[data-id="${id}"]`);
  }

  addItem(notes) {
    const listItem = this.createElement(notes);

    this.input.value = '';
    this.listItem.appendChild(listItem);
  }

  fullOpen(event) {
    event.preventDefault();
    const id = event.target.parentNode.getAttribute('data-id');
    this.emit('fullNotes', id);
  }

  showFullNotes({ _id: id, text }) {
    const list = document.getElementById('list');
    const fullNote = document.getElementById('full-note');

    fullNote.innerHTML = '';

    fullNote.setAttribute('data-id', id);

    const span = createElement('div', { className: 'text' }, text);
    const editInput = createElement('textarea', { className: 'textfield' });
    const editButton = createElement('button', { className: 'edit' }, 'Изменить');
    const removeButton = createElement('button', { className: 'remove' }, 'Удалить');
    const backButton = createElement('button', { className: 'hide' }, 'Вернутся');

    fullNote.appendChild(span);
    fullNote.appendChild(editInput);
    fullNote.appendChild(editButton);
    fullNote.appendChild(removeButton);
    fullNote.appendChild(backButton);

    list.style.display = 'none';
    fullNote.style.display = 'block';

    return this.addEventListeners(fullNote);
  }

  hideFullNotes = () => {
    this.fullNotes.classList.remove('editing');
    this.allNotes.style.display = 'block';
    this.fullNotes.style.display = 'none';
  };

  editItem(id, text) {
    const fullItem = document.getElementById('full-note');

    const label = fullItem.querySelector('.text');
    const editButton = fullItem.querySelector('button.edit');
    const listItem = this.findListItem(id).querySelector('a');

    listItem.textContent = `${text.substr(0, 70)}...`;
    label.textContent = text;
    editButton.textContent = 'Изменить';
    fullItem.classList.remove('editing');
  }

  removeItem(id) {
    const listItem = this.findListItem(id);

    this.listItem.removeChild(listItem);
  }

  clearList() {
    this.listItem.innerHTML = '';
  }
}

export default View;
