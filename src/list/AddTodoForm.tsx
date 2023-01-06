import React, {useState} from 'react';
import {AddTodo} from "./todo.d.ts";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";

type Props = {
  addTodo: AddTodo;
}

const AddTodoForm = (props: Props) => {
  const [text, setText] = useState('');

  return (
    <>
      <div className="form-control" style={{minWidth: '260px'}}>
        <div style={{minWidth: '260px'}}>
          <div className="input-button">
            <InputText
              placeholder="Wpisz zadanie"
              style={{width: '100%'}}
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div
            className="input-button"
            style={{minWidth: '40px'}}>
            <Button
              className="button"
              icon="pi pi-plus"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                props.addTodo(text);
                setText('');
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTodoForm;