import React from "react";
import { Button } from "react-bootstrap";
import Aux from "../../../../../hoc/_Aux";
import useAuth from "../../../../../hooks/auth";
import tokenService from "../../../../../utils/token.service";

const NavRight = (props) => {
  const { logout, authed } = useAuth();
  return (
    <Aux>
      <ul className="navbar-nav ml-auto">
        {authed &&
          tokenService.getUser().role === "Customer" &&
          window.location.pathname === "/home" && (
            <li>
              <a className="nav-text" href="/my-cart">
                My Cart
              </a>
            </li>
          )}
        {authed &&
          tokenService.getUser().role === "Merchant" &&
          window.location.pathname === "/home" && (
            <>
              <li>
                <a className="nav-text" href="/coupons">
                  My Coupons
                </a>
              </li>
              <li>
                <a className="nav-text" href="/create-coupon">
                  Create Coupon
                </a>
              </li>
            </>
          )}
        {authed &&
          tokenService.getUser().role === "Admin" &&
          window.location.pathname === "/home" && (
            <>
              <li>
                <a className="nav-text" href="/admin/merchants">
                  Merchants
                </a>
              </li>
              <li>
                <a className="nav-text" href="/admin/coupons">
                  Coupons
                </a>
              </li>
            </>
          )}
        <li>
          {authed ? (
            <Button onClick={() => logout()} variant="primary" type="submit">
              Logout
            </Button>
          ) : (
            <>
              <Button
                href="/signin"
                variant="primary"
                style={{ marginRight: "10px" }}
                type="submit"
              >
                Login
              </Button>
              <Button href="/signup" variant="primary" type="submit">
                Sign Up
              </Button>
            </>
          )}
        </li>
      </ul>
    </Aux>
  );
};

export default NavRight;
