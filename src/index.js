import './styles/main.css';

import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';

const items = [
  {
    name: 'Подорожник',
    img: '/images/icon/001-plant-2.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Пижма',
    img: '/images/icon/002-oxygen.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Копытень',
    img: '/images/icon/003-leaf.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Базилик',
    img: '/images/icon/004-basil.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Арктоус',
    img: '/images/icon/005-food-and-restaurant.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Чистотелел',
    img: '/images/icon/006-leaf-1.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Цикорий',
    img: '/images/icon/007-plant.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Полынь',
    img: '/images/icon/008-leaf-2.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Окопник',
    img: '/images/icon/009-plant-1.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Зверобой',
    img: '/images/icon/010-spice.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Лебеда',
    img: '/images/icon/011-leaf-3.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Душица',
    img: '/images/icon/012-food-and-restaurant-1.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Адский гриб',
    img: '/images/icon/013-mushroom.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Боровик',
    img: '/images/icon/014-mushroom-1.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Мухомор',
    img: '/images/icon/015-mushroom-2.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Лунная тень',
    img: '/images/icon/016-green-tea.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Целебная трава',
    img: '/images/icon/017-peppermint.png',
    recipe: null,
    isOpen: true,
  },
  {
    name: 'Зелье Счастья',
    img: '/images/icon/018-poison.png',
    recipe: ['Арктоус', 'Пижма'],
    isOpen: false,
  },
  {
    name: 'Зелье Здоровья',
    img: '/images/icon/019-potion.png',
    recipe: ['Подорожник', 'Базилик', 'Чистотелел'],
    isOpen: false,
  },
  {
    name: 'Яд',
    img: '/images/icon/020-potion-1.png',
    recipe: ['Мухомор', 'Мухомор', 'Боровик'],
    isOpen: false,
  },

  {
    name: 'Зелье Смеха',
    img: '/images/icon/021-potion-2.png',
    recipe: ['Окопник', 'Базилик', 'Пижма'],
    isOpen: false,
  },

  {
    name: 'Зелье Взрыва',
    img: '/images/icon/022-antidote.png',
    recipe: ['Мухомор', 'Лебеда', 'Арктоус'],
    isOpen: false,
  },

  {
    name: 'Зелье Жизни',
    img: '/images/icon/023-potion-3.png',
    recipe: ['Целебная трава', 'Целебная трава', 'Адский гриб'],
    isOpen: false,
  },
  {
    name: 'Зелье Удачи',
    img: '/images/icon/024-potion-4.png',
    recipe: ['Цикорий', 'Лунная тень', 'Зелье Счастья'],
    isOpen: false,
  },
];

const model = new Model(items);
const view = new View();
// eslint-disable-next-line no-unused-vars
const controller = new Controller(model, view);
