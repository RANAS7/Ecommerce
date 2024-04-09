import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { useEffect } from "react";

export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutAsync());
  });
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}
