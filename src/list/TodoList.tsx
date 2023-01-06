import React from 'react';
import {Todo, ToggleTodo} from "./todo.d.ts";
import TodoListItem from "./TodoListItem";

type Props = {
  todos: Todo[];
  toggleTodo: ToggleTodo;
}

const TodoList = (props: Props) => {
  return (
    <ul>
      {props.todos.map((todo) => (
        <TodoListItem
          key={todo.text}
          todo={todo}
          toggleTodo={props.toggleTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;