import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CouponCard from "../../App/components/CouponCard";
import Aux from "../../hoc/_Aux";
import api from "../../utils/api";
import tokenService from "../../utils/token.service";

const MyCart = () => {
  const [userCoupons, setUserCoupons] = useState([]);
  useEffect(() => {
    api.get("http://localhost:5000/coupons").then((response) => {
      const coupons = response.data;
      api
        .get(
          `http://localhost:5000/get-user-coupons/${tokenService.getUser().id}`
        )
        .then((resp) => {
          const tempCoupons = coupons.filter((el) => {
            return resp.data.some((f) => {
              return f.coupon_id === el.id;
            });
          });
          setUserCoupons(tempCoupons);
        });
    });
  }, []);
  return (
    <Aux>
      <Row>
        {userCoupons.map((coupon) => {
          return (
            <Col md={6} xl={4} key={coupon.id}>
              <CouponCard coupon={coupon} disabled={true} action={true} />
            </Col>
          );
        })}
      </Row>
    </Aux>
  );
};

export default MyCart;
