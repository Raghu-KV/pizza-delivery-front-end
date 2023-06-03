import React from "react";

function FormikCountrol({ control }) {
  switch (control) {
    case "input":
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
