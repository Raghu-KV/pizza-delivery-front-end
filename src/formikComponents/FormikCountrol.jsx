import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";

function FormikCountrol({ control, ...rest }) {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
    case "radio":
    case "date":
    default:
      return null;
  }

  return <div>FormikCountrol</div>;
}

export default FormikCountrol;
