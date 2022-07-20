import React, { useEffect } from "react";
import { Button, Card, Row, Modal } from "react-bootstrap";
import tokenService from "../../utils/token.service";
import { Route } from "react-router-dom";
import useAuth from "../../hooks/auth";
import api from "../../utils/api";

const CouponCard = ({ coupon, action = true }) => {
  const { authed } = useAuth();
  const [show, setShow] = React.useState(false);
  const [view, setView] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    api
      .get(
        `http://localhost:5000/get-user-coupons/${tokenService.getUser().id}`
      )
      .then((response) => {
        const couponExist = response.data.find((userCoupon) => {
          if (userCoupon.coupon_id === coupon.id) {
            return userCoupon;
          }
          return null;
        });
        if (couponExist) {
          setView(true);
        }
      });
  }, [coupon]);
  return (
    <>
      <Card className="coupon-card-container">
        <Card.Body>
          <img
            src={coupon.image}
            alt="coupon-img"
            className="coupon-card-img mb-3"
          />
          <h5
            style={{
              color: "rgb(63,77,103)",
              fontWeight: "bold",
            }}
          >
            {coupon.name}
          </h5>
          <p className="cut-text" style={{ fontSize: "16px" }}>
            {coupon.description}
          </p>
          {window.location.pathname !== "/inventing-system" &&
            <b>
              <p style={{ fontFamily: "Open Sans, sans-Serif" }}>
                Get your deal by {new Date(coupon.expiry_date).toDateString()}
              </p>
            </b>
          }
          {tokenService.getUser()?.role === "Merchant" &&
            coupon.merchant_id === tokenService.getUser()?.id &&
            window.location.pathname !== "/home" &&
            (coupon.status === null ? (
              <b>
                Satus: <p className="text-c-yellow">PENDING</p>
              </b>
            ) : coupon.status === false ? (
              <b>
                Satus: <p className="text-c-red">REJECTED</p>
              </b>
            ) : (
              <b>
                Satus: <p className="text-c-green">APPROVED</p>
              </b>
            ))}
          {authed &&
            tokenService.getUser()?.role === "Customer" &&
            action &&
            window.location.pathname !== "/inventing-system" && (
              <Row
                style={{
                  justifyContent: "end",
                  position: "absolute",
                  bottom: "10px",
                  right: "25px",
                }}
              >
                <Route
                  render={({ history }) => (
                    <Button
                      className="label theme-bg text-white f-12"
                      style={{
                        borderColor: "transparent",
                      }}
                      onClick={() =>
                        history.push({
                          pathname: `/coupon-view/${coupon.id}`,
                        })
                      }
                    >
                      {view ? "View" : "Get deal"}
                    </Button>
                  )}
                />
              </Row>
            )}
          {authed &&
            tokenService.getUser()?.role === "Merchant" &&
            window.location.pathname !== "/inventing-system" && (
              <Row
                style={{
                  justifyContent: "end",
                  position: "absolute",
                  bottom: "10px",
                  right: "25px",
                }}
              >
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
          {!authed && window.location.pathname !== "/inventing-system" && (
            <Row
              style={{
                justifyContent: "end",
                position: "absolute",
                bottom: "10px",
                right: "25px",
              }}
            >
              <Button
                className="label theme-bg text-white f-12"
                style={{ borderColor: "transparent" }}
                onClick={handleShow}
              >
                View
              </Button>
            </Row>
          )}
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please sign in to see the coupon details</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            href="/signin"
            variant="primary"
            style={{ marginRight: "10px" }}
            type="submit"
          >
            Login
          </Button>
          <Button href="/signup" variant="secondary" type="submit">
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CouponCard;
