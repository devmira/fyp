import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import CouponCard from "../../App/components/CouponCard";
import Aux from "../../hoc/_Aux";
import api from "../../utils/api";
import tokenService from "../../utils/token.service";
import { RegionDropdown } from "react-country-region-selector";
import { sectionList } from "../../utils/services.js";

const Dashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [userCoupons, setUserCoupons] = useState([]);
  const [region, setRegion] = React.useState("");
  const [section, setSection] = React.useState("");
  const updateList = (type, value) => {
    const newList = coupons.filter((coupon) => {
      if (coupon.city === region && coupon.section === section) {
        return coupon;
      }
    });
    setUserCoupons(newList);
  };
  const updateUserCouponList = () => {
    api
      .get(
        `http://localhost:5000/get-user-coupons/${tokenService.getUser().id}`
      )
      .then((response) => {
        setUserCoupons(response.data);
      });
  };

  useEffect(() => {
    api.get("http://localhost:5000/coupons").then((response) => {
      setCoupons(response.data);
    });
    updateUserCouponList();
  }, []);
  return (
    <Aux>
      <Row>
        <RegionDropdown
          name="city"
          country="Malaysia"
          value={region}
          onChange={(val) => {
            setRegion(val);
            updateList("city", val);
          }}
        />
        <Form.Control
          as="select"
          value={section}
          name="section"
          onChange={(e) => {
            setSection(e.target.value);
            updateList("section");
          }}
        >
          {sectionList.map((sec) => {
            return <option key={sec}>{sec}</option>;
          })}
        </Form.Control>
        {coupons.map((coupon) => {
          return (
            (new Date(coupon.expiry_date) > new Date() ||
              coupon.expiry_date === null) && (
              <Col md={6} xl={4} key={coupon.id}>
                <CouponCard
                  coupon={coupon}
                  disabled={userCoupons.find(
                    (element) => element.id === coupon.id
                  )}
                  updateList={() => updateUserCouponList()}
                />
              </Col>
            )
          );
        })}
      </Row>
    </Aux>
  );
};

export default Dashboard;
