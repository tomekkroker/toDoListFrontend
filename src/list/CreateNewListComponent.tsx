import React, {useState} from "react";
import {InputTextarea} from "primereact/inputtextarea";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {priorities} from "./constValues";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {inputProps} from "../utils/InputProps";
import {Calendar} from "primereact/calendar";
import {AddTodo, Todo, ToggleTodo} from "./todo.d.ts";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm"
import {Fieldset} from "primereact/fieldset";
import {InputText} from "primereact/inputtext";

type Props = {}

type FormValues = {
  name: string;
  deadline: string;
  description: string;
};

const initialTodos: Todo[] = [
  {
    text: 'Wyjść z psem',
    complete: false,
  },
];

const CreateNewListComponent = () => {

  const [todos, setTodos] = useState(initialTodos);
  const navigate = useNavigate();

  const toggleTodo: ToggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = (text: string) => {
    const newTodo = {text, complete: false};
    setTodos([...todos, newTodo]);
  };

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Nazwa listy jest wymagana.")
        .max(30, "Maksymalna liczba znaków wynosi 15."),
    }),
    initialValues: {
      name: '',
      deadline: '',
      description: ''
    },
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true);
      const request = {
        name: values.name,
        deadline: values.deadline,
      }
      // await props.onSubmit(request);
      // await setSubmitting(false);
    },
  });

  return (
    <div className="p-col-12">
      <h2 className="my-lists">Dodawanie nowej listy</h2>
      <div className="content">
        <div className="form">

          <div className="input">
            <label>Nazwa</label>
            <InputText
              type="text"
              placeholder="Wpisz nazwę"
              {...inputProps(formik, 'name')}
            />
          </div>

          <div className="input">
            <label>Deadline</label>
            <Calendar
              placeholder="Wpisz deadline"
              {...inputProps(formik, 'deadline')}
            />
          </div>

          <div className="input">
            <label>Priorytet</label>
            <Dropdown
              optionLabel="name"
              optionValue="code"
              options={priorities}
              placeholder="Wybierz priorytet"
            />
          </div>

          <div className="input">
            <label>Opis</label>
            <InputTextarea
              placeholder="Wpisz opis"
              rows={3}
              {...inputProps(formik, 'description')}
            />
          </div>

          <Fieldset legend="Zadania do zrobienia" style={{width: '100%'}}>
            <div className="content">
              <AddTodoForm addTodo={addTodo}/>
            </div>
            <div className="content">
              <TodoList
                todos={todos}
                toggleTodo={toggleTodo}
              />
            </div>
          </Fieldset>

        </div>
      </div>
      <div className="content" style={{clear: "both"}}>
        <Button
          label="Anuluj"
          icon="pi pi-times"
          className="light-button return-button"
          onClick={() => navigate(-1)}
        />
        <Button
          label="Zapisz"
          className="light-button save-button"
          icon="pi pi-check"
        />
      </div>
    </div>
  )
}

export default CreateNewListComponent;