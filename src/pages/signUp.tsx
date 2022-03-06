import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useInput from "../hooks/userInput";
import axios from "axios";
import { useAppDispatch } from "../hooks/storeHooks";
import { loginStoreAction } from "../store/loginStore";
import front from "../images/front.png";

const Signup = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    value: userName,
    isvalid: userNameIsvalid,
    hasError: userNamehasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: userNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    isvalid: emailIsvalid,
    hasError: emailhasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) => /^[a-z]{3}\w*@\w+\w*(\.\w{1})/g.test(value));

  const {
    value: password,
    isvalid: passwordIsvalid,
    hasError: passwordhasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) => value.length > 3);

  let formIsValid = false;
  if (passwordIsvalid && emailIsvalid && userNameIsvalid) {
    formIsValid = true;
  }

  const sumbitHandler = (event: FormEvent) => {
    event.preventDefault();
    setError(false);

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6jZOBIK_zwOHlLfQKOkcLTQ5Yj_SUFT0",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        dispatch(loginStoreAction.signUp({ email: email, userName: userName }));
        emailReset();
        passwordReset();
        userNameReset();
        navigate(`/login`, { replace: true });
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div
      className="h-screen bg-cover pt-32 select-none"
      style={{ backgroundImage: `url(${front})` }}
    >
      <div className=" flex flex-col items-center justify-center bg-white w-1/4 p-3 mx-auto rounded-xl border-2 border-slate-300">
        <p className=" text-3xl text-center my-5 font-medium">Sign-Up Form</p>
        <form className="w-full space-y-8" onSubmit={sumbitHandler}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="username"
                id="username"
                className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm ${
                  userNamehasError ? "border-red-300" : "border-gray-300"
                } rounded-md`}
                placeholder="Username"
                value={userName}
                onChange={userNameChangeHandler}
                onBlur={userNameBlurHandler}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="email"
                id="email"
                className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm ${
                  emailhasError ? "border-red-300" : "border-gray-300"
                } rounded-md`}
                placeholder="Email andress"
                value={email}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
            </div>
            {error && (
              <p
                className="text-center text-red-400 font-bold"
                onClick={() => {
                  setError(false);
                }}
              >
                Email has been use
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="password"
                name="password"
                id="password"
                className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm ${
                  passwordhasError ? "border-red-300" : "border-gray-300"
                } rounded-md`}
                placeholder="Password"
                value={password}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mb-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              disabled={!formIsValid}
            >
              Sign Up
            </button>
            <Link
              to={"/login"}
              className="text-blue-500 underline hover:text-blue-700"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
