import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../utils/validationSchemas";

const Login = () => {
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  // const handleSubmit = async (values, { setSubmitting, setStatus }) => {
  //   try {
  //     const success = await login(values);
  //     if (!success) {
  //       setStatus('Invalid email or password');
  //     }
  //   } catch (error) {
  //     setStatus('An error occurred during login');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    try {
      const result = await login(values);
      if (!result.success) {
        setStatus(result.message);
      }
    } catch (error) {
      setStatus("An error occurred during login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500">Please sign in to continue</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, status, isSubmitting }) => (
              <Form className="space-y-6">
                {status && (
                  <div className="p-4 bg-error-light/10 border border-error-light text-error-DEFAULT rounded-lg">
                    {status}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email && touched.email
                        ? "border-error-DEFAULT focus:ring-error-DEFAULT"
                        : "border-gray-300 focus:ring-primary-500"
                    } focus:ring-2 focus:border-transparent transition-colors`}
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email && (
                    <div className="mt-1 text-sm text-error-DEFAULT">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.password && touched.password
                        ? "border-error-DEFAULT focus:ring-error-DEFAULT"
                        : "border-gray-300 focus:ring-primary-500"
                    } focus:ring-2 focus:border-transparent transition-colors`}
                    placeholder="Enter your password"
                  />
                  {errors.password && touched.password && (
                    <div className="mt-1 text-sm text-error-DEFAULT">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
