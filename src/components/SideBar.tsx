import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { userDataStoreAction } from "../store/userDataStore";
import { loginStoreAction } from "../store/loginStore";
import { FC, useState } from "react";
import UpdateModal from "./modal/UpdateModal";

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
      {isOpen && (
        <UpdateModal isOpen={isOpen} changeOpenState={changeOpenState} />
      )}
      <div className="flex">
        <div className="bg-slate-300 flex-col flex shrink-0 w-1/12 h-screen items-center gap-4">
          <Link
            className="text-2xl text-center font-bold mx-1 my-3 pb-2 bg-green-400 p-1 rounded-md text-white block"
            to={"/"}
          >
            Co-LoGo
          </Link>
          {isLogin && (
            <p className="text-xl font-medium text-center">{userData.user}</p>
          )}
          <button
            className="bg-green-400 rounded-md text-xl p-2 font-medium text-white hover:bg-green-500"
            onClick={() => {
              dispatch(userDataStoreAction.MonthlyUpdateTest());
            }}
          >
            next Month
          </button>
          <button
            className="bg-green-400 rounded-md text-md p-2 font-medium text-white hover:bg-green-500"
            onClick={changeOpenState}
          >
            update Income, Balance, Limit
          </button>

          {isLogin ? (
            <>
              <button
                className="bg-yellow-500 rounded-md text-xl p-2 font-medium hover:bg-yellow-300"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            !isOnloginPage && (
              <button
                className="bg-green-400 rounded-md text-xl p-2 font-medium hover:bg-green-500 text-white"
                onClick={goToLogin}
              >
                Login
              </button>
            )
          )}
        </div>
        <div className="w-11/12 h-screen">{props.children}</div>
      </div>
    </>
  );
};

export default SideBar;