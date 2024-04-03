import React, { useContext } from "react";
import "../blocks/Toggle.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <>
      <input
        className="toggle__input"
        type="checkbox"
        id={`toggle-temperature-units`}
        onClick={handleToggleSwitchChange}
      />
      <label className="toggle__label" htmlFor={`toggle-temperature-units`}>
        <span className="toggle__temperature">F</span>
        <span className="toggle__button">{currentTemperatureUnit}</span>
        <span className="toggle__temperature">C</span>
      </label>
    </>
  );
};

export default ToggleSwitch;
