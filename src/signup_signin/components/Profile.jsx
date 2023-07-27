import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import { setProfile } from "../../store";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return { user: state.data.user };
  });
  //   let user = Cookies.get("token");

  const navigate = useNavigate();
  console.log("user :>> ", user);
  console.log("Cookies.get() :>> ", Cookies.get("token"));

  let ButProf = user===null ? (
    <div>
      <button
        onClick={() => navigate("/sign-panel")}
        className="bg-red-500 px-2 py-1 m-1 rounded-md hover:bg-red-300"
      >
        Sign up/Login
      </button>
    </div>
  ) : (
    <div className="flex flex-row items-center justify-center py-2">
      <CgProfile className="mr-2 w-8 h-8" />
      <h3>Hi {user?.name}</h3>
      <BiLogOut
        className="mx-3 w-8 h-8 cursor-pointer"
        onClick={() => {
          console.log("Cookies.get() :>> ", Cookies.get("token"));
          Cookies.remove("token");
          dispatch(setProfile(null));
        }}
      />
    </div>
  );

  return <>{ButProf}</>;
}
