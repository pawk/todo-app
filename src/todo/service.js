export default class TodoService {
  items = [];

  constructor() {
    this.load();
  }

  getAll() {
    return this.items.sort(elem => elem.done);
  }

  add(item) {
    this.items.push(item);
    this.save();
    return this;
  }

  addMany(items) {
    this.items = [...items.filter(this.unique), ...this.items];
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

  unique = (item) => !this.items.find(el => el.content !== item.content);
}
