import React from 'react';
import {Todo, ToggleTodo} from "./todo.d.ts";
import {Checkbox} from "primereact/checkbox";

type Props = {
  todo: Todo;
  toggleTodo: ToggleTodo;
}

const TodoListItem = (props: Props) => {
  return (
    <li>
      <label style={{textDecoration: props.todo.complete ? 'line-through' : undefined}}>
        <Checkbox
          className="checkbox"
          type="checkbox"
          checked={props.todo.complete}
          onClick={() => {
            props.toggleTodo(props.todo);
          }}
        />
        {props.todo.text}
      </label>
    </li>
  );
}

export default TodoListItem;
