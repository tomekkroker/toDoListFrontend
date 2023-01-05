import React, {useState} from "react"
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";


export default function () {
  let [authMode, setAuthMode] = useState("signin")
  const navigate = useNavigate();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const handleNavigate = () => {
    navigate('/lists')
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <header className="App-logo">System zarządzania zadaniami</header>
            <h3 className="Auth-form-title">Logowanie</h3>
            <div className="form-group mt-3">
              <label>Login</label>
              <InputText
                className="form-control mt-1"
                placeholder="Wpisz login"
                type="text"
              />
            </div>
            <div className="form-group mt-3">
              <label>Hasło</label>
              <InputText
                type="password"
                className="form-control mt-1"
                placeholder="Wpisz hasło"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <Button
                type="submit"
                className="btn btn-primary"
                label="Zaloguj się"
                onClick={handleNavigate}
              />
            </div>
            <div className="text-center">
              Nie masz jeszcze konta?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Zarejestruj się
              </span>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <header className="App-logo">System zarządzania zadaniami</header>
          <h3 className="Auth-form-title">Rejestracja</h3>
          <div className="form-group mt-3">
            <label>Login</label>
            <InputText
              type="text"
              className="form-control mt-1"
              placeholder="Wpisz login"
            />
          </div>
          <div className="form-group mt-3">
            <label>Hasło</label>
            <InputText
              type="password"
              className="form-control mt-1"
              placeholder="Wpisz hasło"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button
              className="btn btn-primary"
              type="submit"
              label="Zarejestruj się"
              onClick={handleNavigate}
            />
          </div>
          <div className="text-center">
            Masz już konto?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Zaloguj się
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}