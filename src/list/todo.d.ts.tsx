import React from "react";

export interface Todo {
  text: string;
  complete: boolean;
}

export type ToggleTodo = (selectedTodo: Todo) => void;

export type AddTodo = (text: string) => void;