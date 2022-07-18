import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CouponCard from "../App/components/CouponCard";
import Aux from "../hoc/_Aux";
import api from "../utils/api";
import NavBar from "../App/layout/AdminLayout/NavBar";
import FilterCoupons from "../App/components/FilterCoupons";
import Hero from "../assets/images/banner.png";

const Dashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);

  useEffect(() => {
    api.get("http://localhost:5000/coupons").then((response) => {
      setCoupons(response.data);
      setFilteredCoupons(response.data);
    });
  }, []);
  return (
    <Aux>
      <NavBar />
      <img src={Hero} style={{ height: "100%", width: "100%" }} />
      <div style={{ margin: "3rem" }}>
        <FilterCoupons
          coupons={coupons}
          setFilteredCoupons={setFilteredCoupons}
        />
        <br />
        <Row>
          {filteredCoupons.map((coupon) => {
            return (
              (new Date(coupon.expiry_date) > new Date() ||
                coupon.expiry_date === null) && (
                <Col md={6} xl={4} key={coupon.id}>
                  <CouponCard coupon={coupon} />
                </Col>
              )
            );
          })}
        </Row>
      </div>
    </Aux>
  );
};

export default Dashboard;
