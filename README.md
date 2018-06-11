# Todo App

## Run

```
npm start
```

## Production build

```
npm run build
```

## Deploy to GitHub pages

```
npm run deploy
```

## Technology stack

Application is scaffolded with `create-react-app`.

Minimal dependencies (no css preprocessor, no styled components library etc).

## Features 

- All items are currently sorted by `done` attribute as well as in order of entry,
- One can perform CRUD operations on all items,
- Items are being stored in browser's `localStorage`,
- If there are no items found in `localStorage`, list will be prepopulated with items passed as children of `TodoList` component - `TodoItem`s elements,
- Inline edition,
- Filter items by Done, Pending and custom string,

App is deployed to Github pages under url: [https://pawel-gawel.github.io/todo-app/](https://pawel-gawel.github.io/todo-app/)
