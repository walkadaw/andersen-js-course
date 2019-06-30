import './styles/main.css';

import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';

import startData from './js/startData';

const model = new Model(startData);
const view = new View();
// eslint-disable-next-line no-unused-vars
const controller = new Controller(model, view);
