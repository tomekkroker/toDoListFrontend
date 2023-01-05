import React, {FC} from "react";
import {Button} from "primereact/button";
import {useNavigate} from 'react-router-dom';

const TodoListsComponent: FC = () => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('create')
  }

  return (
    <>
      <h1>Moje listy zadań</h1>
      <div>
        <Button
          className="light-button"
          label="Stwórz nową listę"
          onClick={handleNavigate}/>
      </div>
      <div>
        <Button
          label="Powrót"
          className="light-button return-button"
          onClick={() => navigate(-1)}/>
      </div>
    </>
  )
    ;
}

export default TodoListsComponent;
