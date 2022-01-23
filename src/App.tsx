import { Navigate, Route, Routes } from "react-router-dom";
import FrontPage from "./pages/frontPage";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import NotFound from "./components/NotFound";
import Main from "./pages/main";
import { useAppSelector } from "./hooks/storeHooks";

const App = () => {
  const isLogin = useAppSelector((state) => state.Login.isLogin);
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />}></Route>
        {!isLogin && (
          <>
            <Route path="/frontPage" element={<FrontPage />}></Route>
            <Route path="/" element={<Navigate to={"/frontPage"} />} />
          </>
        )}
        {isLogin && (
          <>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/" element={<Navigate to={`/main`} />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
