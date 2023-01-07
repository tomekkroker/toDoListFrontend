import React from "react";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {dataList, priorities} from "./constValues";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {inputProps} from "../InputProps";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

type Props = {}

type FormValues = {
  name: string;
  deadline: string;
  description: string;
};

const CreateNewListComponent = () => {

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

  const handleNavigate = () => {
    navigate('task')
  }

  return (
    <div className="p-col-12">
      <h2 className="my-lists">Dodawanie nowej listy</h2>
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

          <div style={{clear: "both"}}>
            <Button
              className="light-button create-list-button"
              label="Stwórz nowe zadanie"
              icon="pi pi-plus"
              onClick={handleNavigate}
            />
          </div>

          <div style={{clear: "both"}}/>
          <h5> Zadania do zrobienia</h5>
          <div className="card" style={{clear: "both"}}>

            <DataTable
              value={dataList}
              responsiveLayout="scroll">
              <Column
                header="Akcje"
                body={(row) => (
                  <>
                    <Button
                      className="edit-button"
                      icon="pi pi-pencil"
                    />
                    <Button
                      className="trash-button"
                      icon="pi pi-trash"
                    />
                  </>
                )}
              />
              <Column field="name" header="Nazwa"/>
              <Column field="priority" header="Priorytet"/>
            </DataTable>
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

export default CreateNewListComponent;