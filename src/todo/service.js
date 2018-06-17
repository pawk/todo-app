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

  wtfReorder(subset, moved, reference, direction) {
    let items = [...this.items];

    const indexOfMoved = items.findIndex(item => item.id === moved.id);
    const indexOfReference = items.findIndex(item => item.id === reference.id);
    let insertIndex = indexOfReference;

    items.splice(indexOfMoved, 1);

    insertIndex = indexOfMoved < indexOfReference ? indexOfReference-1 : indexOfReference;
    insertIndex = direction < 0 ? insertIndex : insertIndex + 1;

    items.splice(insertIndex, 0, moved);

    this.items = items;
    this.save();
  }

  load() {
    const stored = window.localStorage ? localStorage.getItem('items') : null;

    if (stored) {
      this.items = [...this.items, ...JSON.parse(stored)];
    }
  }

  save() {
    window.localStorage && localStorage.setItem('items', JSON.stringify(this.items));
  }

  unique = (item) => !this.items
    .find(el => el.content === item.content);

  ordering = (a, b) => a.done - b.done;

  normalize = elem => {
    if (!elem.hasOwnProperty('done')) {
      elem.done = false;
    }
    if (!elem.hasOwnProperty('id')) {
      elem.id = elem.content.replace(/[^a-zA-Z0-9]/g, '-');
    }
    return elem;
  }
}
