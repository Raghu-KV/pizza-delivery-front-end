import { Field, ErrorMessage } from "formik";
import DeleteTextError from "../components/DeleteTextError";

function SelectInput({ label, name, villageOptions, ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <Field as="select" name={name} id={name} {...rest}>
        {villageOptions.map((villageOption) => (
          <option value={villageOption.value} key={villageOption.value}>
            {villageOption.key}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component={DeleteTextError} />
    </div>
  );
}

export default SelectInput;
