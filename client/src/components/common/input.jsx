import React from "react";

const Input = ({ name, label, error, type, ...rest }) => {
  const today = new Date();
  return (
    <div className="input__group">
      <label
        hidden={type !== "date"}
        className="input__group-label"
        htmlFor={name}
      >
        {label}:
      </label>
      <input
        className="input__group-input"
        {...rest}
        type={type}
        name={name}
        id={name}
        placeholder={label}
        max={`${today.getFullYear() - 14}-${
          today.getMonth() + 1 > 10
            ? today.getMonth() + 1
            : `0${today.getMonth() + 1}`
        }-${today.getDate() > 10 ? today.getDate() : `0${today.getDate()}`}`}
      />
      {error && <span className="input__group-error">{error}</span>}
    </div>
  );
};

export default Input;
