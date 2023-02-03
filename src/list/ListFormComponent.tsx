import React, {FC} from "react";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {priorities} from "./constValues";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {inputProps} from "../utils/InputProps";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ListRequest, ListResponse, TaskRequest, TaskResponse} from "./dto";
import TaskFormDialog from "./TaskFormDialog";

type Props = {
  dataList: ListResponse | null;
  onSubmitList: (listRequest: ListRequest) => void;
  handleAddClick: () => void;
  tasks: Readonly<Array<TaskResponse>>;
  handleEditClick: (row: TaskResponse) => void;
  setIsTaskFormDialog: (data: boolean) => void;
  isTaskFormDialog: boolean;
  dataTask: TaskResponse | null;
  onSubmitTask: (taskRequest: TaskRequest) => void;
  listId: number;
}

type FormValues = {
  name: string;
  priority: string;
};

const ListFormComponent: FC<Props> = (props) => {

  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Nazwa listy jest wymagana.")
        .max(15, "Maksymalna liczba znaków wynosi 15."),
    }),
    initialValues: {
      name: props.dataList?.name ? props.dataList?.name : '',
      priority: props.dataList?.priority ? props.dataList?.priority : 'Normalny',
    },
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true);
      const request = {
        name: values.name,
        priority: values.priority,
      }
      await props.onSubmitList(request);
    },
  });

  return (
    <>
      <div className="p-col-12">
        <h2 className="my-header">Dodawanie nowej listy</h2>
        <div className="content">
          <div className="form">

            {/* Formularz */}

            <div className="input">
              <label>* Nazwa</label>
              <InputText
                type="text"
                placeholder="Wpisz nazwę"
                {...inputProps(formik, 'name')}
                id="name"
                value={formik.values.name}
              />
            </div>

            <div className="input">
              <label>Priorytet</label>
              <Dropdown
                {...inputProps(formik, 'priority')}
                options={priorities}
                id="priority"
              />
            </div>

            <div style={{clear: "both"}}>
              <Button
                className="light-button create-list-button"
                label="Stwórz nowe zadanie"
                icon="pi pi-plus"
                // onClick={props.handleAddClick}
                onClick={() => props.setIsTaskFormDialog(true)}
              />
            </div>


            {/* Tabela zadań */}

            <div style={{clear: "both"}}/>
            <div className="card" style={{clear: "both"}}>
              <h5 className="tasks"> Zadania do zrobienia</h5>
              <DataTable
                value={props.tasks as TaskResponse[]}
                responsiveLayout="scroll">
                <Column
                  header="Akcje"
                  body={(row) => (
                    <>
                      <Button
                        className="show-edit-button"
                        icon="pi pi-pencil"
                        tooltip="Edytuj zadanie"
                        onClick={() => props.handleEditClick(row)}
                      />
                      <Button
                        className="trash-button"
                        icon="pi pi-trash"
                        tooltip="Usuń zadanie"
                      />
                    </>
                  )}
                />
                <Column field="name" header="Nazwa"/>
                <Column field="priority" header="Priorytet"/>
                <Column field="deadline" header="Deadline"/>
              </DataTable>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="content" style={{clear: "both"}}>
          <Button
            label="Anuluj"
            icon="pi pi-times"
            className="light-button return-button"
            type="button"
            onClick={() => navigate(-1)}
          />
          <Button
            label="Zapisz"
            className="light-button save-button"
            icon="pi pi-check"
            onClick={() => {
              formik.handleSubmit();
              navigate(-1)
            }}
          />
        </div>
      </div>
      <TaskFormDialog
        isVisible={props.isTaskFormDialog}
        dataTask={props.dataTask}
        onSubmitTask={props.onSubmitTask}
        onHide={() => props.setIsTaskFormDialog(false)}
        listId={props.listId}
      />
    </>
  )
}

export default ListFormComponent;