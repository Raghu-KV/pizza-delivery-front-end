import { Formik, Form } from "formik";
import * as yup from "yup";

function FormikContainer() {
  const initialValues = {};
  const validationSchema = yup.object({});
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
