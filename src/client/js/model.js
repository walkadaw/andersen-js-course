import { reedFetch, updateFetch, createFetch, deleteFetch } from './helpers/methodFetch';

class Model {
  constructor(url) {
    this.apiUrl = url;
  }

  setType(type) {
    this.type = type;
  }

  genUrlApi(...params) {
    return [this.apiUrl, this.type, ...params].reduce((acc, value) => `${acc}/${value}`);
  }

  async setState() {
    const data = await reedFetch(this.genUrlApi());

    return data;
  }

  async getItem(id) {
    const item = await reedFetch(this.genUrlApi(id));

    return item;
  }

  async addItem(text) {
    const item = await createFetch(this.genUrlApi(), { text });

    return item;
  }

  async updateItem(id, text) {
    const item = await updateFetch(this.genUrlApi(id), { text });

    return item;
  }

  async removeItem(id) {
    const item = await deleteFetch(this.genUrlApi(id));

    return item;
  }
}

export default Model;
