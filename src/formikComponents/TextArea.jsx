import { Field } from "formik";

function TextArea({ name, label, ...rest }) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <Field as="textarea" name={name} id={name} {...rest} />
    </div>
  );
}

export default TextArea;
