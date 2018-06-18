# Todo App

### Run

```
npm start
```

### Production build

```
npm run build
```

### Deploy to GitHub pages

```
npm run deploy
```

Project is currently available under [https://pawel-gawel.github.io/todo-app/](https://pawel-gawel.github.io/todo-app/)

## Technology stack

Application is scaffolded with `create-react-app`.

Minimal dependencies (no css preprocessor, no styled components library etc).

## Features 

- All items are currently sorted by `done` attribute as well as in order of entry,
- One can perform CRUD operations on all items,
- Items are being stored in browser's `localStorage`,
- If there are no items found in `localStorage`, list will be prepopulated with items passed as children of `TodoList` component - `TodoItem`s elements,
- Inline edition,
- Filter items by Done, Pending and custom string (interestingly, had to add custom stable sort function, as Chrome is messing things up with bigger sets),
- manual reordering of items, also within the filtered subsets

## Interesting quirks
 - a lot of functional approach,
 - es6/7 all over the place,
 - React's Compound Pattern for building the list,
 - a little bit of RWD so it can be conveniently used on handheld devices,
 - nextcss,
 - BEM for css naming convention,
 - bash deployment script,
 - and more
