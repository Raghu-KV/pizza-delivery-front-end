import { Field, ErrorMessage } from "formik";
import DeleteTextError from "../components/DeleteTextError";

function Select({ label, name, options, ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field as="select" name={name} id={name} {...rest}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.key}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component={DeleteTextError} />
    </div>
  );
}

export default Select;
