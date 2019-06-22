function create(tagName, attrs, content) {
  const el = document.createElement(tagName);
  if (attrs) {
    Object.keys(attrs).forEach(n => {
      el.setAttribute(n, attrs[n]);
    });
  }
  if (content) el.innerHTML = content;
  return el;
}

function createNewItemElement(name, img, type) {
  const itemName = create('span', {}, name);
  const item = create('li', {
    draggable: 'true',
    'data-name': name,
    'data-type': type,
  });
  const image = create('img', {
    src: img,
    alt: name,
    draggable: 'false',
  });

  item.appendChild(itemName);
  item.appendChild(image);

  return item;
}

function findParentClass(elem, parentClass, deep = 3) {
  if (elem.classList.contains(parentClass)) {
    return elem;
  }
  if (deep > 1) {
    return findParentClass(elem.parentElement, parentClass, deep - 1);
  }

  return false;
}

function modalCreate(itemAll) {
  const contentModel = create('div', { class: 'row' });
  contentModel.appendChild(
    create('input', { type: 'text', id: 'newName', placeholder: 'Имя нового ингредиента' })
  );
  contentModel.appendChild(create('input', { type: 'file' }));

  const bodySelect = create('div', { class: 'all-select' });
  const contentSelect = create('div', { class: 'row select' });
  bodySelect.appendChild(contentSelect);

  const select = create('select');
  select.appendChild(
    create(
      'option',
      { disabled: 'disabled', selected: 'selected', value: 'none' },
      'Выберете ингридиент'
    )
  );

  itemAll.forEach(({ name }) => {
    const option = create('option', null, name);
    select.appendChild(option);
  });

  contentSelect.appendChild(select);
  contentModel.appendChild(bodySelect);

  contentModel.appendChild(
    create('button', { type: 'button', id: 'addVariationItem', class: 'btn blue' }, '+')
  );
  contentModel.appendChild(
    create('button', { type: 'button', id: 'createNewRecept', class: 'btn blue' }, 'Создать')
  );

  return { contentModel, contentSelect };
}

export { create, createNewItemElement, findParentClass, modalCreate };
