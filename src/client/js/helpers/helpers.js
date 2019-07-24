function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    if (key.startsWith('data-')) {
      element.setAttribute(key, props[key]);
    } else {
      element[key] = props[key];
    }
  });

  children.forEach(child => {
    if (typeof child === 'string') {
      // eslint-disable-next-line no-param-reassign
      child = document.createTextNode(child);
    }

    element.appendChild(child);
  });

  return element;
}

export default createElement;
