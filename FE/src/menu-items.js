export default {
  items: [
    {
      id: "merchant",
      title: "Merchant",
      type: "group",
      icon: "icon-navigation",
      permission: ["Merchant"],
      children: [
        {
          id: "coupons",
          title: "Сoupons",
          type: "item",
          url: "/coupons",
          icon: "feather icon-home",
        },
        {
          id: "create-coupon",
          title: "Create coupon",
          type: "item",
          url: "/create-coupon",
          classes: "nav-item",
          icon: "feather icon-sidebar",
        },
      ],
    },
    {
      id: "customer",
      title: "Customer",
      type: "group",
      icon: "icon-pages",
      permission: ["Customer"],
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard",
          icon: "feather icon-home",
        },
        {
          id: "my-coupons",
          title: "My Cart",
          type: "item",
          url: "/my-cart",
          icon: "feather icon-home",
        },
      ],
    },
    {
      id: "admin",
      title: "Admin",
      type: "group",
      icon: "icon-pages",
      permission: ["Admin"],
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard",
          icon: "feather icon-home",
        },
        {
          id: "merchants",
          title: "Merchants",
          type: "item",
          url: "/admin/merchants",
          icon: "feather icon-home",
        },
        {
          id: "admin-coupons",
          title: "Coupons",
          type: "item",
          url: "/admin/coupons",
          icon: "feather icon-home",
        },
      ],
    },
  ],
};
