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
export { create, EventEmitter };
