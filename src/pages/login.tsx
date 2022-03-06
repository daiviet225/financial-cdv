import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import useInput from "../hooks/userInput";
import { loginStoreAction } from "../store/loginStore";
import { useAppDispatch } from "../hooks/storeHooks";
import axios from "axios";
import front from "../images/front.png";

const Login = () => {
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    value: email,
    hasError: emailhasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) => /^[a-z]{3}\w*@\w+\w*(\.\w{1})/g.test(value));

  const {
    value: password,
    hasError: passwordhasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) => value.length > 3);

  const sumbitHandler = (event: FormEvent) => {
    event.preventDefault();
    setInvalid(false);

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6jZOBIK_zwOHlLfQKOkcLTQ5Yj_SUFT0",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        const data = res.data;
        dispatch(loginStoreAction.login({ token: data.idToken, email: email }));
        emailReset();
        passwordReset();
        navigate(`/`, { replace: true });
      })
      .catch((error) => {
        console.log(error);

        setInvalid(true);
      });
  };

  return (
    <>
      <div
        className="h-screen flex justify-center bg-cover select-none"
        style={{ backgroundImage: `url(${front})` }}
      >
        <div className="max-w-md w-full mt-32 bg-white h-fit p-5 rounded-md border-2 border-slate-300">
          <div>
            <h2 className="text-center text-3xl font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/sign-up"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create a new account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={sumbitHandler}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    emailhasError ? "border-red-400 z-10" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                  value={email}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    passwordhasError ? "border-red-400" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  value={password}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                />
              </div>
            </div>

            {invalid && (
              <p className="text-center mb-3 text-red-500 font-bold border border-red-500 rounded-md ">
                Wrong Email or Password
              </p>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
