import React from "react";
import { Button, Card, Row } from "react-bootstrap";
import tokenService from "../../utils/token.service";
import { Route } from "react-router-dom";

const CouponCard = ({ coupon, disabled, updateList, action = true }) => {
  return (
    <Card className="coupon-card-container">
      <Card.Body>
        <img
          src={coupon.image}
          alt="coupon-img"
          className="coupon-card-img mb-3"
        />
        <h6>{coupon.name}</h6>
        <p>{coupon.description}</p>
        {coupon.expiry_date ? (
          <b>
            <p>
              Get your deal by {new Date(coupon.expiry_date).toDateString()}
            </p>
          </b>
        ) : (
          <b>
            <p className="text-c-red">UNLIMITED TIME FOR THIS OFFER!!!</p>
          </b>
        )}
        {tokenService.getUser().role === "Customer" && action && (
          <Row style={{ justifyContent: "end" }}>
            <Route
              render={({ history }) => (
                <Button
                  className="label theme-bg text-white f-12"
                  style={{ borderColor: "transparent" }}
                  onClick={() =>
                    history.push({
                      pathname: `/coupon-view/${coupon.id}`,
                    })
                  }
                >
                  Get deal
                </Button>
              )}
            />
          </Row>
        )}
        {tokenService.getUser().role === "Merchant" && (
          <Row style={{ justifyContent: "end" }}>
            <Route
              render={({ history }) => (
                <Button
                  className="label theme-bg text-white f-12"
                  style={{ borderColor: "transparent" }}
                  onClick={() =>
                    history.push({
                      pathname: `/merchants/coupon-view/${coupon.id}`,
                    })
                  }
                >
                  View
                </Button>
              )}
            />
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default CouponCard;
