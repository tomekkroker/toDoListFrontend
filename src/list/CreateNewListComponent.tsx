import React, {FC} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

const CreateNewListComponent: FC = () => {

  const navigate = useNavigate();
  return (
    <div className="p-col-12">
      <div className="card content">
        <h1 className="my-lists">Dodawanie nowej listy</h1>
        <div className="p-grid p-fluid">
          <div className="p-col-12">

            <div className="form">

              <div className="input">
                <label>Nazwa</label>
                <InputText
                  type="text"
                  placeholder="Wpisz nazwę"
                />
              </div>

              <div className="input">
                <label>Deadline</label>
                <InputText
                  type="text"
                  placeholder="Deadline"
                />
              </div>

              <div className="input">
                <label>Priorytet</label>
                <Dropdown
                  placeholder="Wybierz priorytet"
                />
              </div>

              <div className="input">
                <label>Opis</label>
                <InputTextarea
                  placeholder="Opis"
                  rows={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        label="Powrót"
        className="light-button return-button"
        onClick={() => navigate(-1)}
      />
      <Button
        label="Zapisz"
        className="light-button save-button"
        icon="pi-check"
      />
    </div>
  )
}

export default CreateNewListComponent;