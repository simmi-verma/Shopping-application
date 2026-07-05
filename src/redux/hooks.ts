import { useContext } from "react";
import { AppStateContext, AppDispatchContext } from "./Providers";

export const useAppSelector = <T>(selector: (state: any) => T): T => {
  const state = useContext(AppStateContext);
  return selector(state);
};

export const useAppDispatch = () => {
  const dispatch = useContext(AppDispatchContext);
  return dispatch;
};
