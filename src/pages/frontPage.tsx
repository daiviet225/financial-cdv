import { Link } from "react-router-dom";
import front from "../images/front.png";
import previewimg from "../images/previewimg.jpg";

const FrontPage = () => {
  return (
    <div className="relative w-full">
      <div
        className="h-screen w-full bg-cover select-none fixed"
        style={{ backgroundImage: `url(${front})` }}
      />
      <div className="absolute flex flex-col justify-center">
        <div className="text-center text-white bg-white text-black rounded-md p-5 mx-auto border-2 border-slate-300 mt-20">
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

        <img
          src={previewimg}
          alt="preview"
          className="w-4/5 mx-auto rounded-md mt-20 mb-20"
        />
      </div>
    </div>
  );
};

export default FrontPage;
