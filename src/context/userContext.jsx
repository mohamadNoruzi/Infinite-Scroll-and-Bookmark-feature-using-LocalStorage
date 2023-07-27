import axios from "axios";
import { createContext, useEffect } from "react";
import { setProfile } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  // const { userR } = useSelector((state) => {
  //   return { userR: state.data.user };
  // });
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        dispatch(setProfile(data));
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
