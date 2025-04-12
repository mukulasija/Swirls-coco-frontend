import { useSelector, useDispatch } from 'react-redux';
import { selectError, selectLoggedInUser } from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
import { loginUserAsync } from '../authSlice';
import { useForm } from 'react-hook-form';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-pink-50 to-white px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-20 w-auto rounded-full shadow-lg p-2 bg-white"
            src="/ecommerce.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  loginUserAsync({ email: data.email, password: data.password })
                );
              })}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/i,
                        message: 'Please enter a valid email',
                      },
                    })}
                    type="email"
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-pink-600 hover:text-pink-500 transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    type="password"
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 transition-colors duration-200"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
                {error && (
                  <div className="mt-2 rounded-md bg-red-50 p-3">
                    <p className="text-sm text-red-600">{error || error.message}</p>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-pink-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 transition-colors duration-200"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">New to Swirls Coco?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/signup"
                  className="flex w-full justify-center rounded-lg border border-pink-100 bg-white px-4 py-3 text-sm font-semibold text-pink-600 shadow-sm hover:bg-pink-50 transition-colors duration-200"
                >
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
