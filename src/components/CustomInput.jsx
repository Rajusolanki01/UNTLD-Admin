import React from "react";

const CustomInput = (props) => {
  const { type, label, onChange, i_id, i_className } = props;
  return (
    <div className="form-floating mb-2">
      <input
        type={type}
        className={`form-control ${i_className}`}
        id={`${i_id}`}
        placeholder={label}
        onChange={onChange}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
