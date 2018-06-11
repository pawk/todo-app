import React from 'react';
import PropTypes from 'prop-types';

import './item.css';

function slugify(str) {
  return str.replace(/[^A-Za-z0-9]/g, '')
}

export class TodoItem extends React.Component {
  state = {};

  render() {
    const { item, onSelect, onUpdate, onDelete } = this.props;
    const { done, content } = item;
    const className = done ? 'todo__item todo__item--done' : 'todo__item';
    const id = "item-".concat(slugify(content));

    let handleChange = e => onUpdate(e.target.value);
    
    return (
      <div htmlFor={id} className={className}>
        <div className="todo__item-content">
          <input
            type="checkbox"
            id={id}
            onChange={onSelect}
            checked={done ? true : false} />        
          {!done && <input 
            type="text" 
            value={this.state.content} 
            defaultValue={content} 
            onChange={handleChange} /> || content}
        </div>
        <div>
          <button
            className="todo__item-delete-btn"
            onClick={onDelete}
            >Delete</button>
        </div>
      </div>
    );
  }
};

TodoItem.propTypes = {
  done: PropTypes.bool,
  onSelect: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  children: PropTypes.string.isRequired
}

TodoItem.defaultProps = {
  done: false,
  onSelect: () => {},
  onEdit: () => {},
  onDelete: () => {}
}
