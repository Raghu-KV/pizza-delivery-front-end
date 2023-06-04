import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikCountrol from "./FormikCountrol";

function FormikContainer() {
  const initialValues = {
    email: "none",
    comment: "",
  };
  const validationSchema = yup.object({
    email: yup.string().required("Email required"),
  });
  const onSubmit = (values) => {
    console.log("form Container values", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(fromik) => (
        <Form>
          <FormikCountrol
            control="input"
            name="email"
            type="email"
            className="form-control border border-black"
            label="Enter your email"
          />

          <FormikCountrol
            control="textarea"
            name="comment"
            className="form-control border border-black"
            label="Enter your comment"
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
