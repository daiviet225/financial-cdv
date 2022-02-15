import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { loginStoreAction } from "../store/loginStore";
import { FC, useState } from "react";
import UpdateModal from "./modal/UpdateModal";
import React from "react";

const SideBar: FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const userData = useAppSelector((state) => state.userData.data);
  const isLogin = useAppSelector((state) => state.Login.isLogin);

  const isOnloginPage = location.pathname === "/login";

  const goToLogin = () => {
    navigate("/login");
  };

  const logout = () => {
    dispatch(loginStoreAction.logout());
    navigate("/", { replace: true });
  };

  const changeOpenState = () => {
    setIsOpen((state) => !state);
  };

  return (
    <>
      <UpdateModal isOpen={isOpen} changeOpenState={changeOpenState} />
      <div className="bg-slate-300 flex flex-col w-1/12 h-screen items-center justify-between">
        <div className="flex-col flex gap-4 px-1 select-none">
          <Link
            className="text-2xl text-center font-bold mx-1 my-3 pb-2 bg-green-400 rounded-md text-white block"
            to={"/"}
          >
            Co-LoGo
          </Link>
          {isLogin && (
            <p className="text-2xl font-medium text-center break-words">
              {userData.user}
            </p>
          )}

          <button
            className="bg-green-400 rounded-md text-md p-2 font-medium text-white hover:bg-green-500"
            onClick={changeOpenState}
          >
            Set Income, Balance, Limit
          </button>
        </div>

        <div className="flex-col flex gap-4 mb-4 ">
          {isLogin ? (
            <>
              <button
                className="bg-yellow-400 rounded-md text-xl p-2 font-medium hover:bg-yellow-300 text-white select-none"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            !isOnloginPage && (
              <button
                className="bg-green-400 rounded-md text-xl p-2 font-medium hover:bg-green-500 text-white select-none"
                onClick={goToLogin}
              >
                Login
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(SideBar);
