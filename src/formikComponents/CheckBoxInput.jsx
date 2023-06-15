import { Field, ErrorMessage } from "formik";
import DeleteTextError from "../components/DeleteTextError";

function CheckBoxInput({ label, name, foodItems, ...rest }) {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <Field name={name}>
        {({ field }) => {
          return foodItems.map((foodItem) => (
            <div className="form-check">
              <input
                type="checkbox"
                {...field}
                value={foodItem.value}
                {...rest}
                id={foodItem.value}
                checked={field.value.includes(foodItem.value)}
              />
              <label htmlFor={foodItem.value} className="form-check-label">
                {foodItem.key}
                <p>rs 50</p>
              </label>
            </div>
          ));
        }}
      </Field>
      <ErrorMessage name={name} component={DeleteTextError} />
    </div>
  );
}

export default CheckBoxInput;
