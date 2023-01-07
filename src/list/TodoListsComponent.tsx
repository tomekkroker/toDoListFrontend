import React, {FC} from "react";
import {Button} from "primereact/button";
import {useNavigate} from 'react-router-dom';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {dataTask} from "./constValues";

const TodoListsComponent: FC = () => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('list')
  }

  return (
    <>
      <h2 className="my-lists">Moje listy zadań</h2>
      <div className="content">
        <div>
          <Button
            className="light-button create-list-button"
            label="Stwórz nową listę"
            icon="pi pi-plus"
            onClick={handleNavigate}
          />
        </div>
        <div className="card">
          <DataTable
            value={dataTask}
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
            <Column field="name" header="Nazwa listy"/>
            <Column field="deadline" header="Deadline"/>
            <Column field="priority" header="Priorytet"/>
          </DataTable>
        </div>
        <Button
          label="Powrót"
          className="light-button return-button"
          onClick={() => navigate(-1)}
          icon="pi pi-arrow-left"
        />
      </div>
    </>
  )}

export default TodoListsComponent;
