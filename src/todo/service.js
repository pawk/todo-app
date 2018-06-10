export default class TodoService {
  items = [];

  constructor(items) {
    this.items = items || [];
  }

  getAll() {
    return this.items.sort(elem => elem.done);
  }

  add(item) {
    this.items.push(item);
    return this;
  }

  addMany(items) {
    this.items = [...items, ...this.items];
    return this;
  }

  delete(item) {
    const pos = this.items.indexOf(item);
    if (pos !== -1) {
      this.items.splice(pos, 1);
    }
    return this;
  }

  toggle(item) {
    let found = this.items.find(el => el === item);
    found.done = !found.done;  
    return this;
  }
}
