import './css/main.css';
import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';

const API_URL = 'http://localhost:9090';

const model = new Model(API_URL);
const view = new View();

// eslint-disable-next-line no-unused-vars
const controller = new Controller(model, view);
