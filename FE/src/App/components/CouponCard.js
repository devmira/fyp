import React from "react";
import { Button, Card, Row, Modal } from "react-bootstrap";
import tokenService from "../../utils/token.service";
import { Route } from "react-router-dom";
import useAuth from "../../hooks/auth";
import { useStore } from "react-redux";

const CouponCard = ({ coupon, action = true }) => {
  const { authed } = useAuth();
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          coupon.expiry_date ? (
            <b>
              <p style={{ fontFamily: "Open Sans, sans-Serif" }}>
                Get your deal by {new Date(coupon.expiry_date).toDateString()}
              </p>
            </b>
          ) : (
            window.location.pathname !== "/inventing-system" && (
              <b>
                <p className="text-c-red">UNLIMITED TIME FOR THIS OFFER!!!</p>
              </b>
            )
          )}
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
                      Get deal
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
