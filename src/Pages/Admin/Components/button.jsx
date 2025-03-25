import React from "react";

const Button = ({ onClick, tulisanButton, classname, type }) => {
  return (
    <button onClick={onClick} className={classname} type={type}>
      {tulisanButton}
    </button>
  );
};

export default Button;