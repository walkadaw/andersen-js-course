import './styles/main.css';

import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';

const model = new Model();
const view = new View();
// eslint-disable-next-line no-unused-vars
const controller = new Controller(model, view);

document.addEventListener('dragstart', event => {
  event.dataTransfer.setData('text/html', event.target.id);
});

document.addEventListener('dragover', event => {
  event.preventDefault();
});

document.addEventListener('drop', event => {
  event.preventDefault();
  if (event.target.className === 'alchemist') {
    const data = event.dataTransfer.getData('text/html');

    event.target.appendChild(document.getElementById(data).cloneNode(true));
  }
});
