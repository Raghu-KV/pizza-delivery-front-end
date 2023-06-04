import { Field, ErrorMessage } from "formik";
import DeleteTextError from "../components/DeleteTextError";

function Input({ name, label, ...rest }) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={DeleteTextError} />
    </div>
  );
}

export default Input;
