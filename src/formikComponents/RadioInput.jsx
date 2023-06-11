import { Field, ErrorMessage } from "formik";
import DeleteTextError from "../components/DeleteTextError";

function RadioInput({ label, name, mealItems, ...rest }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <Field name={name}>
        {({ field }) => {
          console.log("RENDER PROPS ON FORM", field);

          return mealItems.map((mealItem) => (
            <div className="form-check" key={mealItem.value}>
              <input
                type="radio"
                {...field}
                id={mealItem.value}
                value={mealItem.value}
                checked={field.value === mealItem.value}
                {...rest}
              />
              <label htmlFor={mealItem.value} className="form-check-label">
                {mealItem.key}
              </label>
            </div>
          ));
        }}
      </Field>
      <ErrorMessage name={name} component={DeleteTextError} />
    </div>
  );
}

export default RadioInput;
