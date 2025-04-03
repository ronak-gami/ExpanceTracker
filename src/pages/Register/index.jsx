import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../../context/AuthContext";
import { registerSchema } from "../../utils/validationSchemas";

const Register = () => {
  const [profilePic, setProfilePic] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const registerData = {
        ...values,
        profilePic,
        id: Date.now(),
      };

      const result = await register(registerData);
      if (!result.success) {
        setStatus(result.message);
      }
    } catch (error) {
      setStatus("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">Join us today!</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, status }) => (
              <Form className="space-y-6">
                {status && (
                  <div className="p-4 bg-error-light/10 border border-error-light text-error-DEFAULT rounded-lg">
                    {status}
                  </div>
                )}

                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt="Profile Preview"
                        className="w-full h-full rounded-full object-cover border-4 border-primary-200"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-primary-50 flex items-center justify-center border-4 border-primary-200">
                        <span className="text-primary-500 text-4xl">?</span>
                      </div>
                    )}
                    <label
                      htmlFor="profile-pic"
                      className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </label>
                    <input
                      type="file"
                      id="profile-pic"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <Field
                      type="text"
                      name="username"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.username && touched.username
                          ? "border-error-DEFAULT focus:ring-error-DEFAULT"
                          : "border-gray-300 focus:ring-primary-500"
                      } focus:ring-2 focus:border-transparent transition-colors`}
                    />
                    {errors.username && touched.username && (
                      <p className="mt-1 text-sm text-error-DEFAULT">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email && touched.email
                          ? "border-error-DEFAULT focus:ring-error-DEFAULT"
                          : "border-gray-300 focus:ring-primary-500"
                      } focus:ring-2 focus:border-transparent transition-colors`}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-error-DEFAULT">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.password && touched.password
                          ? "border-error-DEFAULT focus:ring-error-DEFAULT"
                          : "border-gray-300 focus:ring-primary-500"
                      } focus:ring-2 focus:border-transparent transition-colors`}
                    />
                    {errors.password && touched.password && (
                      <p className="mt-1 text-sm text-error-DEFAULT">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-error-DEFAULT focus:ring-error-DEFAULT"
                          : "border-gray-300 focus:ring-primary-500"
                      } focus:ring-2 focus:border-transparent transition-colors`}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="mt-1 text-sm text-error-DEFAULT">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
