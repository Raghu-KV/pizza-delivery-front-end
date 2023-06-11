import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import SelectInput from "./SelectInput";
import RadioInput from "./RadioInput";
import CheckBoxInput from "./CheckBoxInput";

function FormikCountrol({ control, ...rest }) {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <SelectInput {...rest} />;
    case "radio":
      return <RadioInput {...rest} />;
    case "checkbox":
      return <CheckBoxInput {...rest} />;
    case "date":
    default:
      return null;
  }

  return <div>FormikCountrol</div>;
}

export default FormikCountrol;
