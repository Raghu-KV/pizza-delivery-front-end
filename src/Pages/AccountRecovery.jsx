import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { BACK_END_URL } from "../URL";
import { useState } from "react";

function AccountRecovery() {
  const { id, token } = useParams();
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .required("Emil is Required")
        .min(7, "password must be at least 7 character"),
      confirmNewPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "password must match"),
    }),
    onSubmit: async (values) => {
      //console.log(values);
      const updatedValues = { ...values, userID: id };
      const responce = await fetch(`${BACK_END_URL}/accountRecovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(updatedValues),
      });
      const convertedResponce = await responce.json();
      setMessage(convertedResponce.message);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New password
          </label>
          <input
            type="password"
            className="form-control border border-black"
            id="newPassword"
            aria-describedby="newPassword"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div id="newPassword" className="form-text text-danger">
              {formik.errors.newPassword}
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmNewPassword" className="form-label">
            Confirm new password
          </label>
          <input
            type="password"
            className="form-control border border-black"
            id="confirmNewPassword"
            aria-describedby="confirmNewPassword"
            name="confirmNewPassword"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmNewPassword &&
          formik.errors.confirmNewPassword ? (
            <div id="newPassword" className="form-text text-danger">
              {formik.errors.confirmNewPassword}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting}
        >
          Submit
        </button>
      </form>

      <p className="text-success fw-semibold fs-4">{message}</p>
    </div>
  );
}

export default AccountRecovery;
