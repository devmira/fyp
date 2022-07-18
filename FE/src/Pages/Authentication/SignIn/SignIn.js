import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import useAuth from "../../../hooks/auth";
import TokenService from "../../../utils/token.service";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = ({ history }) => {
  const [values, setValues] = useState({});
  const { login } = useAuth();
  const onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    try {
      await axios
        .post(
          "http://localhost:5000/login",
          {
            email: values["email"],
            password: values["password"],
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.accessToken) {
            TokenService.setUser(response.data);
          }
          login().then(() => {
            history.push("/");
          });
        });
    } catch (error) {
      if (error.response) {
        toast.warning(error.response.data.msg);
      }
    }
  };
  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={onFormChange}
                  />
                </Form.Group>
                <Form.Group
                  controlId="formBasicPassword"
                  onChange={onFormChange}
                >
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Button variant="primary" className="shadow" type="submit">
                  Login
                </Button>
              </Form>
              <p className="mb-0 text-muted">
                Don’t have an account? <NavLink to="/signup">Signup</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default SignIn;
