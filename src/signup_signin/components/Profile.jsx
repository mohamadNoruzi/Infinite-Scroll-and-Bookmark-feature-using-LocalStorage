import Cookies from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch  } from "react-redux";
import { setProfile } from "../../store";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return { user: state.data.user };
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(setProfile(null));
  };

  let items =
    user === null ? (
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
          onClick={handleLogout}
        />
      </div>
    );

  return <>{items}</>;
}
