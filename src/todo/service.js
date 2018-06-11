export default class TodoService {
  items = [];

  constructor() {
    this.load();
  }

  getAll() {
    return this.items.sort(this.ordering);
  }

  add(...items) {
    this.items = [
      ...items.filter(this.unique).map(this.normalize),
      ...this.items
    ];
    this.save();
    return this;
  }

  edit(item) {
    
    this.save();
    return this;
  }

  delete(item) {
    const pos = this.items.indexOf(item);
    if (pos !== -1) {
      this.items.splice(pos, 1);
    }
    this.save();
    return this;
  }

  toggle(item) {
    const found = this.items.find(el => el === item);
    found.done = !found.done;
    this.save();
    return this;
  }

  load() {
    const stored = localStorage.getItem('items');
    if (stored) {
      this.items = [...this.items, ...JSON.parse(stored)];
    }
  }

  save() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  unique = (item) => !this.items.find(el => el.content === item.content);

  ordering = (a, b) => {
    if (a.done === b.done) {
      return a.content < b.content ? -1 : (a.content > b.content) ? 1 : 0;
    } else {
      return a.done - b.done;
    }
  }

  normalize = elem => {
    if (!elem.hasOwnProperty('done')) {
      elem.done = false;
    }
    return elem;
  }
}
