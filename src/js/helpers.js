class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, callback) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
  }

  emit(type, arg) {
    if (this.events[type]) {
      this.events[type].forEach(cb => cb(arg));
    }
  }
}
function create(tagName, attrs, content) {
  const el = document.createElement(tagName);
  if (attrs) {
    Object.getOwnPropertyNames(attrs).forEach(n => {
      el.setAttribute(n, attrs[n]);
    });
  }
  if (content) el.innerHTML = content;
  return el;
}

function createNewItemElement(id, name, img, type) {
  const itemName = create('span', {}, name);
  const item = create('li', {
    draggable: 'true',
    'data-id': id,
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
export { create, createNewItemElement, EventEmitter };
