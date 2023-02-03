import React, {FC} from "react";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {priorities} from "./constValues";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {inputProps} from "../utils/InputProps";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {TaskRequest, TaskResponse} from "./dto";
import {Dialog} from "primereact/dialog";

type Props = {
  isVisible: boolean;
  onHide: () => void;
  dataTask: TaskResponse | null;
  onSubmitTask: (taskRequest: TaskRequest) => void;
  listId: number | undefined;
}

type FormValues = {
  name: string;
  deadline: string | null;
  priority: string;
  description: string;
  listId: number;
};

const TaskFormDialog: FC<Props> = (props: Props) => {

  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Nazwa zadania jest wymagana.")
        .max(15, "Maksymalna liczba znaków wynosi 15."),
    }),
    initialValues: {
      name: props.dataTask?.name ? props.dataTask?.name : '',
      priority: props.dataTask?.priority ? props.dataTask?.priority : 'Normalny',
      deadline: props.dataTask?.deadline ? props.dataTask?.deadline : '',
      description: props.dataTask?.description ? props.dataTask.description : '',
      listId: props.listId ?? 0,
    },
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true);
      const request = {
        name: values.name,
        priority: values.priority,
        deadline: values.deadline ? values.deadline : null,
        description: values.description,
        listId: props.listId!,
      }
      await props.onSubmitTask(request);
      props.onHide();
    },
  });

  const onHideWithFormReset = () => {
    props.onHide();
    formik.resetForm();
  };

  return (
    <Dialog
      header="Dodawanie nowego zadania"
      visible={props.isVisible}
      modal
      blockScroll
      onHide={onHideWithFormReset}
    >
      <div className="p-col-12">
        <div className="content">
          <div className="form">

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
                options={priorities}
                {...inputProps(formik, 'priority')}
                id="priority"
              />
            </div>

            <div className="input">
              <label>Deadline</label>
              <Calendar
                placeholder="Wpisz deadline"
                id="deadline"
                value={formik.values.deadline}
                onChange={(e) => formik.setFieldValue('deadline', e.target.value)}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="input">
              <label>Opis</label>
              <InputTextarea
                placeholder="Wpisz opis"
                rows={3}
                {...inputProps(formik, 'description')}
                id="description"
              />
            </div>

          </div>
        </div>
        <div className="content" style={{clear: "both"}}>
          <Button
            label="Anuluj"
            icon="pi pi-times"
            className="light-button return-button"
            onClick={onHideWithFormReset}
          />
          <Button
            label="Zapisz"
            className="light-button save-button"
            icon="pi pi-check"
            onClick={() => {
              formik.handleSubmit();
              props.onHide();
              // navigate(-1)
            }}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default TaskFormDialog;