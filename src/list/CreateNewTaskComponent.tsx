import React from "react";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {priorities} from "./constValues";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {inputProps} from "../InputProps";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";

type Props = {}

type FormValues = {
  name: string;
  deadline: string;
  description: string;
};

const CreateNewTaskComponent = () => {

  const navigate = useNavigate();

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
      <h2 className="my-lists">Dodawanie nowego zadania</h2>
      <div className="content">
        <div className="form">

          <div className="input">
            <label>* Nazwa</label>
            <InputText
              type="text"
              placeholder="Wpisz nazwę"
              {...inputProps(formik, 'name')}
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
            <label>Deadline</label>
            <Calendar
              placeholder="Wpisz deadline"
              {...inputProps(formik, 'deadline')}
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
          disabled={formik.values.name === ''}
        />
      </div>
    </div>
  )
}

export default CreateNewTaskComponent;