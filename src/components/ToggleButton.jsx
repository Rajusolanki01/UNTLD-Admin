import React from "react";

const ToggleButton = ({ collapsed, setCollapsed }) => {
  return (
    <div>
      <input
        type="checkbox"
        id="checkbox"
        checked={collapsed}
        onChange={() => setCollapsed(!collapsed)}
      />
      <label htmlFor="checkbox" className="toggle">
        <div className="bar bar--top"></div>
        <div className="bar bar--middle"></div>
        <div className="bar bar--bottom"></div>
      </label>
    </div>
  );
};

export default ToggleButton;
