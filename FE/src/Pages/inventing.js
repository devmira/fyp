import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import CouponCard from "../App/components/CouponCard";
import api from "../utils/api";
import Aux from "../hoc/_Aux";

const InventingSystem = () => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);

  const updateFilter = (val) => {
    const newFilter = coupons.filter((coup) => {
      if (coup.coupon_code === val || val === "") {
        return true;
      } else {
        return false;
      }
    });
    setFilteredCoupons(newFilter);
  };

  useEffect(() => {
    api.get("http://localhost:5000/coupons").then((response) => {
      setCoupons(response.data);
      setFilteredCoupons(response.data);
    });
  }, []);
  return (
    <Aux>
      <div style={{ margin: "3rem" }}>
        <Form.Group style={{ marginBottom: "3rem" }} controlId="description">
          <Form.Control
            autoFocus
            name="search"
            onChange={(e) => updateFilter(e.target.value)}
            placeholder="Search barcode"
          />
        </Form.Group>
        <Row>
          {filteredCoupons.map((coupon) => {
            return (
              <Col md={6} xl={4} key={coupon.id}>
                <CouponCard coupon={coupon} />
              </Col>
            );
          })}
        </Row>
      </div>
    </Aux>
  );
};

export default InventingSystem;
