import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import SelectInput from "./SelectInput";

function FormikCountrol({ control, ...rest }) {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <SelectInput {...rest} />;
    case "radio":
    case "date":
    default:
      return null;
  }

  return <div>FormikCountrol</div>;
}

export default FormikCountrol;
