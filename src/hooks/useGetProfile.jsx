import axios from "axios";
import { useEffect } from "react";
import { setProfile } from "../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export function useGetProfile() {
  const { user } = useSelector((state) => {
    return { user: state.data.user };
  });
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!user) {
      axios.get("/profile", { headers: { token: token } }).then(({ data }) => {
        dispatch(setProfile(data));
      });
    }
  }, []);
}
