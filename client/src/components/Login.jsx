import React, { useEffect } from "react";
import {
  Form,
  FormGroup,
  Navbar,
  Input,
  Label,
  Button,
  Alert,
  UncontrolledAlert,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/session";
import { useHistory } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const errors = useSelector((state) => state.error);
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const history = useHistory();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    dispatch(login(user))
      .then(() => {
        console.log("Login successful");

        return navigate("/");
      })
      .catch((err) => {
        setError(!error);
        console.log(err);
      });

    // history.push("/")
  };

  return (
    <div>
      <div className="col-12">
        <div className="mx-auto">
          <h6>Login</h6>
        </div>
        <UncontrolledAlert
          color="danger"
          isOpen={error}
          className="col-8 mx-auto"
        >
          Incorrect Email or Password
        </UncontrolledAlert>
        <h6>
          <Form className="col-8 mx-auto" onSubmit={handleSubmit}>
            <FormGroup>
              <Label type="text">Email Address</Label>
              <Input type="email" placeholder="Email Address" required />
            </FormGroup>
            <FormGroup>
              <Label type="text">Password</Label>
              <Input type="password" placeholder="Password" required />
            </FormGroup>
            <Input type="submit" value="Submit" />
          </Form>
        </h6>
      </div>

      <div className="badge badge-success mx-auto">
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
