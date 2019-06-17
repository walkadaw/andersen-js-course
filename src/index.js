import './styles/main.css';

import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';

const allItem = [
  { name: 'Подорожник', img: '/images/icon/001-plant-2.png' },
  { name: 'Пижма', img: '/images/icon/002-oxygen.png' },
  { name: 'Копытень', img: '/images/icon/003-leaf.png' },
  { name: 'Базилик', img: '/images/icon/004-basil.png' },
  { name: 'Арктоус', img: '/images/icon/005-food-and-restaurant.png' },
  { name: 'Чистотелел', img: '/images/icon/006-leaf-1.png' },
  { name: 'Цикорий', img: '/images/icon/007-plant.png' },
  { name: 'Полынь', img: '/images/icon/008-leaf-2.png' },
  { name: 'Окопник', img: '/images/icon/009-plant-1.png' },
  { name: 'Зверобой', img: '/images/icon/010-spice.png' },
  { name: 'Лебеда', img: '/images/icon/011-leaf-3.png' },
  { name: 'Душица', img: '/images/icon/012-food-and-restaurant-1.png' },
  { name: 'Адский гриб', img: '/images/icon/013-mushroom.png' },
  { name: 'Боровик', img: '/images/icon/014-mushroom-1.png' },
  { name: 'Мухомор', img: '/images/icon/015-mushroom-2.png' },
  { name: 'Лунная тень', img: '/images/icon/016-green-tea.png' },
  { name: 'Целебная трава', img: '/images/icon/017-peppermint.png' },
  { name: 'Зелье Счастья', img: '/images/icon/018-poison.png' },
  { name: 'Зелье Здоровья', img: '/images/icon/019-potion.png' },
  { name: 'Яд', img: '/images/icon/020-potion-1.png' },
  { name: 'Зелье Смеха', img: '/images/icon/021-potion-2.png' },
  { name: 'Зелье Взрыва', img: '/images/icon/022-antidote.png' },
  { name: 'Зелье Жизни', img: '/images/icon/023-potion-3.png' },
  { name: 'Зелье Удачи', img: '/images/icon/024-potion-4.png' },
];
const startIdItem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const recipes = [
  { newItem: 17, needItemCraft: [4, 1] },
  { newItem: 18, needItemCraft: [0, 3, 5] },
  { newItem: 19, needItemCraft: [14, 14, 13] },
  { newItem: 20, needItemCraft: [8, 3, 1] },
  { newItem: 21, needItemCraft: [14, 10, 4] },
  { newItem: 22, needItemCraft: [16, 16, 12] },
  { newItem: 23, needItemCraft: [6, 15, 17] },
];
const model = new Model(allItem, startIdItem, recipes);
const view = new View();
// eslint-disable-next-line no-unused-vars
const controller = new Controller(model, view);
