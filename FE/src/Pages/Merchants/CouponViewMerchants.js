import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import { sectionList } from "../../utils/services.js";
import axios from "axios";
import { toast } from "react-toastify";
import tokenService from "../../utils/token.service";

const CouponViewMerchants = ({ match, history }) => {
  const [coupon, setCoupon] = useState({});
  const [values, setValues] = useState({});

  const onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        expiry_date: values["expiry_date"],
        quantity: values["quantity"],
      };

      await axios({
        method: "post",
        url: `http://localhost:5000/update-coupon/${match.params.id}`,
        data: data,
      }).then((response) => {
        toast.success("Your coupon code is successfully updated!");
        history.push("/coupons");
      });
    } catch (error) {
      if (error.response) {
        toast.error("Oops! Something went wrong. Please try again.!");
        console.log(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    api
      .get(`http://localhost:5000/coupon/${match.params.id}`)
      .then((response) => {
        setCoupon(response.data);
        setValues({
          quantity: response.quantity,
          expiry_date: response.expiry_date,
        });
      });
  }, [match.params.id]);
  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                      <Form.Label>Coupon title</Form.Label>
                      <Form.Control
                        defaultValue={coupon.name}
                        disabled
                        type="text"
                        placeholder="GET YOUR 50% NOW"
                        name="name"
                      />
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Coupon description</Form.Label>
                      <Form.Control
                        defaultValue={coupon.description}
                        disabled
                        as="textarea"
                        rows="3"
                        name="description"
                      />
                    </Form.Group>
                    <Form.Group controlId="image">
                      <Form.Label>Coupon image</Form.Label>
                      <img
                        src={coupon.image}
                        alt="coupon-img"
                        className="coupon-card-img mb-3"
                      />
                    </Form.Group>
                    <Form.Group controlId="expiryDate">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        defaultValue={coupon.expiry_date}
                        disabled={
                          coupon.merchant_id !== tokenService.getUser()?.id
                        }
                        type="date"
                        name="expiry_date"
                        onChange={onFormChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="section">
                      <Form.Label>Coupon Sections</Form.Label>
                      <Form.Control
                        as="select"
                        name="section"
                        defaultValue={coupon.section}
                        disabled
                      >
                        {sectionList.map((section) => {
                          return <option key={section}>{section}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="inventoryType">
                      <Form.Label>Inventory Type</Form.Label>
                      <Form.Control
                        defaultValue={coupon.inventoryType}
                        disabled
                        type="text"
                        name="inventoryType"
                      />
                    </Form.Group>
                    <Form.Group controlId="couponCode">
                      <Form.Label>Coupon Code</Form.Label>
                      <Form.Control
                        defaultValue={coupon.coupon_code}
                        disabled
                        name="coupon_code"
                      />
                    </Form.Group>
                    <Form.Group controlId="city">
                      <Form.Label>Please Select The City</Form.Label>
                      <Form.Control
                        defaultValue={coupon.city}
                        disabled
                        name="city"
                      />
                    </Form.Group>
                    <Form.Group controlId="address">
                      <Form.Label>Outlet address</Form.Label>
                      <Form.Control
                        defaultValue={coupon.address}
                        disabled
                        as="textarea"
                        rows="3"
                        name="address"
                      />
                    </Form.Group>
                    <Form.Group controlId="quantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        defaultValue={coupon.quantity}
                        type="text"
                        name="quantity"
                        disabled={
                          coupon.merchant_id !== tokenService.getUser()?.id
                        }
                        placeholder="30"
                        onChange={onFormChange}
                      />
                      {coupon.merchant_id === tokenService.getUser()?.id && (
                        <Form.Text className="text-muted">
                          If unlimitted please leave empty
                        </Form.Text>
                      )}
                    </Form.Group>
                    {coupon.merchant_id === tokenService.getUser()?.id && (
                      <Button variant="primary" type="submit">
                        Update
                      </Button>
                    )}
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};
export default CouponViewMerchants;
