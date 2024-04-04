import React from "react";

const CustomInput = (props) => {
  const { type, label, name, onChange, onBlur, value, i_id, i_className } =
    props;
  return (
    <div className="form-floating mb-2">
      <input
        type={type}
        className={`form-control ${i_className}`}
        id={`${i_id}`}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
