import { Link } from "react-router-dom";
import stonk from "../images/stonk2.jpg";

const FrontPage = () => {
  return (
    <div
      className="h-screen w-full bg-cover flex justify-center select-none"
      style={{ backgroundImage: `url(${stonk})` }}
    >
      <div className="text-center mt-32 text-white">
        <p className="text-5xl font-medium mb-5">
          Welcome to Coo-Financial App
        </p>
        <p className="text-3xl mb-5">A Financial Web-App</p>
        <div className="text-xl bg-white text-black w-fit m-auto p-3 rounded-xl flex gap-1">
          <Link className="text-blue-500 underline" to={"/login"}>
            Login
          </Link>

          <p>or</p>

          <Link className="text-blue-500 underline" to={"/sign-up"}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
