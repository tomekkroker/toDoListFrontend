import React, {FC} from "react";
import {Button} from "primereact/button";
import {useNavigate} from 'react-router-dom';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ListResponse} from "./dto";

type Props = {
  listOfTasks: Array<ListResponse>;
  handleEditClick: (row: ListResponse) => void;
  handleDeleteClick: (row: ListResponse) => void;
  handleAddClick: () => void;
}

const ListComponent: FC<Props> = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="my-header">Moje listy zadań</h2>
      <div className="content">
        <div>
          <Button
            className="light-button create-list-button"
            label="Stwórz nową listę"
            icon="pi pi-plus"
            onClick={props.handleAddClick}
          />
        </div>
        <div className="card">
          <DataTable
            value={props.listOfTasks}
            responsiveLayout="scroll"
          >
            <Column
              header="Akcje"
              body={(row) => (
                <>
                  <Button
                    className="show-edit-button"
                    icon="pi pi-arrow-circle-up"
                    tooltip="Dodaj zadania do listy"
                    onClick={() => props.handleEditClick(row)}
                  />
                  <Button
                    className="trash-button"
                    icon="pi pi-trash"
                    tooltip="Usuń listę zadań"
                    onClick={() => props.handleDeleteClick(row)}
                  />
                </>
              )}
            />
            <Column
              field="name"
              header="Nazwa listy"
            />
            <Column
              field="priority"
              header="Priorytet"
            />
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
  )
}

export default ListComponent;
