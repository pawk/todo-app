import React from 'react';
import PropTypes from 'prop-types';

import { 
  SortableContainer, 
  SortableElement, 
  SortableHandle 
} from 'react-sortable-hoc';

import { TodoItem } from './item';
import { TodoAdd } from './add';
import TodoFilter from './filter';
import Service from './service';

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

  const DragHandle = SortableHandle(() => <div>::</div>);

  const SortableItem = SortableElement(({item}) =>
    <li key={item.id}>
      <TodoItem
        key={item.id}
        item={item}
        onSelect={selectItem(item)}
        onUpdate={updateItem(item)}
        onDelete={removeItem(item)}
      >{item.content}</TodoItem>
      <DragHandle />
    </li>
  );

  const SortableList = SortableContainer(({items}) => {
    return (
      <ul className="todo__list-items">
        {items.map((item, key) =>
          <SortableItem key={`item-${key}`} index={key} item={item} />
        )}
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
