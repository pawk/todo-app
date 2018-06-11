import ordinals from '../utils/ordinal-numbers';

export default class TodoService {
  items = [];

  constructor() {
    this.load();
  }

  getAll({ filter, done } = {}) {
    let ret = this.items;
    if (filter) {
      ret = ret.filter(item => item.content.includes(filter));
    }
    if (typeof done === 'boolean') {
      ret = ret.filter(item => item.done === done);
    }
    return ret.sort(this.ordering);
  }

  add(...items) {
    this.items = [
      ...items.filter(this.unique).map(this.normalize),
      ...this.items
    ];
    this.save();
  }

  update(item, value) {
    const found = this.items.find(el => el.content === item.content);
    found.content = value;
    this.save();
  }

  delete(item) {
    const pos = this.items.indexOf(item);
    if (pos !== -1) {
      this.items.splice(pos, 1);
    }
    this.save();
  }

  toggle(item) {
    const found = this.items.find(el => el === item);
    found.done = !found.done;
    this.save();
  }

  load() {
    const stored = localStorage.getItem('items');
    let max = 0;

    if (stored) {
      this.items = [...this.items, ...JSON.parse(stored)];
      max = this.items.reduce((acc, item) => (item.order > acc) ? item.order : acc, 0);
    }
    this.ordinal = ordinals(++max);
  }

  save() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  unique = (item) => !this.items
    .find(el => el.content === item.content);

  ordering = (a, b) => {
    if (a.done === b.done) {
      return a.order < b.order ? 1 : (a.order > b.order) ? -1 : 0;
    } else {
      return a.done - b.done;
    }
  }

  normalize = elem => {
    if (!elem.hasOwnProperty('done')) {
      elem.done = false;
    }
    if (!elem.hasOwnProperty('id')) {
      elem.id = elem.content.replace(/[^a-zA-Z0-9]/g, '-');
    }
    if (!elem.hasOwnProperty('order')) {
      elem.order = this.ordinal();
    }
    return elem;
  }
}
