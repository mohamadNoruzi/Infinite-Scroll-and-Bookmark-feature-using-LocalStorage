import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeIds } from "../store";

export default function useChangeLocalStorage() {
  const dispatch = useDispatch();
  const { ids, isBookm, isEvenChange } = useSelector((state) => {
    return {
      ids: state.data.ids,
      isBookm: state.data.isBookm,
      isEvenChange: state.data.isEvenChange,
    };
  });

  useEffect(() => {
    if (ids.length === 0 && !isEvenChange) {
      var localS = localStorage.getItem("ids");
      var localArray = [];
      if (localS) {
        localArray = localS.split(",");
        localArray.map((ls) => {
          return dispatch(changeIds(ls));
        });
      }
    }

    if (ids.length !== 0 || isEvenChange) localStorage.setItem("ids", ids);
  }, [isBookm, isEvenChange, ids, dispatch]);

  return { ids };
}
