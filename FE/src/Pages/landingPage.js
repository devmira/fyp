import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import CouponCard from "../App/components/CouponCard";
import Aux from "../hoc/_Aux";
import api from "../utils/api";
import tokenService from "../utils/token.service";
import { RegionDropdown } from "react-country-region-selector";
import { sectionList } from "../utils/services.js";
import NavBar from "../App/layout/AdminLayout/NavBar";

const Dashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [userCoupons, setUserCoupons] = useState([]);
  const [region, setRegion] = React.useState("");
  const [section, setSection] = React.useState("");
  const updateList = (type, value) => {
    const filter = {};
    if (type === "city") {
      filter.city = value;
      filter.section = section;
    } else {
      filter.city = region;
      filter.section = value;
    }
    const newList = coupons.filter(function (item) {
      if (filter.city !== "" && filter.section !== "") {
        if (item.section === filter.section && item.city === filter.city)
          return true;
      } else if (filter.city !== "") {
        if (item.city === filter.city) return true;
      } else if (filter.section !== "") {
        if (item.section === filter.section) return true;
      } else if (filter.city === "" && filter.section === "") {
        return true;
      } else {
        return false;
      }
    });
    setFilteredCoupons(newList);
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
      setFilteredCoupons(response.data);
    });
    updateUserCouponList();
  }, []);
  return (
    <Aux>
      <NavBar />
      <div style={{ margin: "3rem" }}>
        <Row style={{ marginBottom: "20px" }}>
          <RegionDropdown
            name="city"
            country="Malaysia"
            value={region}
            style={{
              marginRight: "10px",
              background: "#f4f7fa",
              borderRadius: "0.25rem",
              color: "#495057",
              border: "1px solid #ced4da",
              padding: "10px 20px",
            }}
            onChange={(val) => {
              setRegion(val);
              updateList("city", val);
            }}
          />
          <Form.Control
            as="select"
            value={section}
            style={{ width: "auto" }}
            name="section"
            onChange={(e) => {
              setSection(e.target.value);
              updateList("section", e.target.value);
            }}
          >
            <option key="all" value="">
              Select Section
            </option>
            {sectionList.map((sec) => {
              return <option key={sec}>{sec}</option>;
            })}
          </Form.Control>
        </Row>
        <Row>
          {filteredCoupons.map((coupon) => {
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
      </div>
    </Aux>
  );
};

export default Dashboard;
