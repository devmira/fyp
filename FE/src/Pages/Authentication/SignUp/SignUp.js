import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import axios from 'axios';

const SignUp = () => {
  const [values, setValues] = useState({});
  const onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    try {
      await axios.post('http://localhost:5000/users', {
        fullname: values["fullname"],
        email: values["email"],
        password: values["password"],
        role: values["role"]
      });
      // history.push("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  }

  return(
    <Aux>
      <Breadcrumb/>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r"/>
            <span className="r s"/>
            <span className="r s"/>
            <span className="r"/>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-user-plus auth-icon"/>
              </div>
              <h3 className="mb-4">Sign up</h3>
              <Form 
                onSubmit={handleSubmit}
              >
                <Form.Group controlId="fullname">
                  <Form.Control placeholder="Full name" name="fullname" onChange={onFormChange}/>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Control type="email" placeholder="Email" name="email" onChange={onFormChange}/>
                </Form.Group>
                <Form.Group controlId="role">
                  <Form.Control as="select" name="role" onChange={onFormChange}>
                    <option>Merchadise</option>
                    <option>Customer</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicPassword" onChange={onFormChange}>
                  <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" className="shadow" type="submit">
                  Sign up
                </Button>
              </Form>
              <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin-1">Login</NavLink></p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
}

export default SignUp;