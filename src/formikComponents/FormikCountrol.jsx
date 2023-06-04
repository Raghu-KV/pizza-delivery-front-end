import React from "react";
import Input from "./Input";

function FormikCountrol({ control, ...rest }) {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
    case "select":
    case "radio":
    case "date":
    default:
      return null;
  }

  return <div>FormikCountrol</div>;
}

export default FormikCountrol;
