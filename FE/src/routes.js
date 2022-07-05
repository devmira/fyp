import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const CouponView = React.lazy(() => import("./Pages/CouponView"));
const Merchants = React.lazy(() => import("./Pages/admin/merchants"));
const CouponsA = React.lazy(() => import("./Pages/admin/coupons"));
const CouponViewMerchants = React.lazy(() =>
  import("./Pages/Merchants/CouponViewMerchants")
);
const Dashboard = React.lazy(() => import("./Pages/Dashboard/index"));

const CreateCoupon = React.lazy(() => import("./Pages/Other/CreateCoupon"));
const Coupons = React.lazy(() => import("./Pages/Merchants/coupons"));
const MyCart = React.lazy(() => import("./Pages/Other/MyCart"));

const routes = [
  {
    path: "/coupons",
    exact: true,
    name: "Coupons",
    component: Coupons,
  },
  {
    path: "/coupon-view/:id",
    exact: true,
    name: "Coupon View",
    component: CouponView,
  },
  {
    path: "/merchants/coupon-view/:id",
    exact: true,
    name: "Coupon View Merchants",
    component: CouponViewMerchants,
  },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  {
    path: "/create-coupon",
    exact: true,
    name: "Create Coupon",
    component: CreateCoupon,
  },
  {
    path: "/admin/merchants",
    exact: true,
    name: "Merchants",
    component: Merchants,
  },
  {
    path: "/admin/coupons",
    exact: true,
    name: "CouponsA",
    component: CouponsA,
  },
  { path: "/my-cart", exact: true, name: "MyCart", component: MyCart },
];

export default routes;
