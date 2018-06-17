import React from 'react';

// TODO there should be propTypes on this component 

import { 
  SortableContainer, 
  SortableElement, 
  SortableHandle 
} from 'react-sortable-hoc';

import TodoItem from '../item';

import './list.css';

export default function TodoList({
  items,
  onSelect,
  onUpdate,
  onRemove,
  onSortEnd,
}) {
  const selectItem = item => e => onSelect(item);
  const updateItem = item => content => onUpdate(item, content);
  const removeItem = item => e => onRemove(item);

  const DragHandle = SortableHandle(() => <div className="todo__drag-handle">☰</div>);

  const SortableItem = SortableElement(({item}) =>
    <li key={item.id}>
      <div className="todo__list-item">
        <DragHandle />
        <TodoItem
          key={item.id}
          item={item}
          onSelect={selectItem(item)}
          onUpdate={updateItem(item)}
          onDelete={removeItem(item)}
        >{item.content}</TodoItem>
      </div>
    </li>
  );

  const SortableList = SortableContainer(({items}) => {
    return (
      <ul className="todo__list">
        {items.map((item, key) => <SortableItem key={`item-${key}`} index={key} item={item} />)}
      </ul>
    );
  });

  return (
    <SortableList
      items={items}
      onSortEnd={onSortEnd}
      useDragHandle={true}
    />
  );
}
