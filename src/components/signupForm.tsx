import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CREATE_NEWUSER_MUTATION } from "../utility/postRequest";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
  });

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await submitForm(values);
    },
  });

  const submitForm = async (data: typeof formik.values) => {
    try {
      const response = await fetch("https://graphqlzero.almansi.me/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: CREATE_NEWUSER_MUTATION,
          variables: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error("Failed to create user:", result.errors);
        return;
      }

      if (result.data && result.data.createUser) {
        setMessage("User Created Successfully");
        setLoading(false);
        setTimeout(() => {
          navigate("/users");
        }, 3000);
      } else {
        console.error("Unexpected response:", result);
      }
    } catch (error) {
      console.error("Network or other error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 p-5 mt-5">
            <h3 className="mb-5">Seamless creation of new users...</h3>
            {loading && (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {message && <div className="alert alert-success">{message}</div>}
            <form onSubmit={formik.handleSubmit}>
              <div className="row justify-content-center align-items-center">
                <div className="col-md-12 mb-3">
                  <label htmlFor="firstName" className="signup--label">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    className="shadow-none form-control signup--input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-danger">{formik.errors.firstName}</div>
                  ) : null}
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="lastName" className="signup--label">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    className="shadow-none form-control signup--input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-danger">{formik.errors.lastName}</div>
                  ) : null}
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="email" className="signup--label">
                    Email address
                  </label>
                  <input
                    type="text"
                    placeholder="Email address"
                    name="email"
                    className="shadow-none form-control signup--input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="phone" className="signup--label">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Phone number"
                    name="phone"
                    className="shadow-none form-control signup--input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-danger">{formik.errors.phone}</div>
                  ) : null}
                </div>
                <div className="col-md-12">
                  <button type="submit" className="signup--btn w-100">
                    Create new user
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-1 signup--image d-none d-md-block " />
          <div className="col-md-6 d-none d-md-block signup--image ">
            <div className="d-flex justify-content-center py-5 my-5 mt-5">
              <div className="display-3">Sign Up, Here!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
