import React, { useContext } from "react";
import "../blocks/Toggle.css";
import { CurrentTemperatureUnitContext } from "../contexts/currentTemperatureUnit";

const ToggleSwitch = () => {
  const currTempContext = useContext(CurrentTemperatureUnitContext);
  return (
    <>
      <input
        className="toggle__input"
        type="checkbox"
        id={`toggle-temperature-units`}
        onClick={currTempContext.handleToggleSwitchChange}
      />
      <label className="toggle__label" htmlFor={`toggle-temperature-units`}>
        <span className="toggle__button">F</span>C
      </label>
    </>
  );
};

export default ToggleSwitch;

{
}
