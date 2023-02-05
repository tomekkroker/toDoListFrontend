import React from "react"
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/lists')
  }

  return (
    <div className="start-container">
      <form className="start-panel">
        <div className="logo">
          <header
            className="app-name"
          >
            System zarządzania zadaniami
          </header>
          <div className="d-grid gap-2 mt-3">
            <Button
              className="start-button"
              type="submit"
              label="Zaczynajmy!"
              onClick={handleNavigate}
            />
          </div>
        </div>
      </form>
    </div>
  )
}