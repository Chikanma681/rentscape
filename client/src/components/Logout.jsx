import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { logout } from "../redux/actions/session";
import { Spinner } from "reactstrap";
import UserAction from "../redux/types/user";
const { LOGOUT_USER } = UserAction;
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: LOGOUT_USER,
    });
  }, []);

  return navigate("/login");
};

export default Logout;
