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
          id: "home",
          title: "Home",
          type: "item",
          url: "/home",
          icon: "feather icon-home",
        },
        {
          id: "coupons",
          title: "My Сoupons",
          type: "item",
          url: "/coupons",
          icon: "feather icon-list",
        },
        {
          id: "create-coupon",
          title: "Create coupon",
          type: "item",
          url: "/create-coupon",
          classes: "nav-item",
          icon: "feather icon-file-plus",
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
          id: "home",
          title: "Home",
          type: "item",
          url: "/home",
          icon: "feather icon-home",
        },
        {
          id: "my-coupons",
          title: "My Cart",
          type: "item",
          url: "/my-cart",
          icon: "feather icon-list",
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
          id: "home",
          title: "Home",
          type: "item",
          url: "/home",
          icon: "feather icon-home",
        },
        {
          id: "merchants",
          title: "Merchants",
          type: "item",
          url: "/admin/merchants",
          icon: "feather icon-users",
        },
        {
          id: "admin-coupons",
          title: "Coupons",
          type: "item",
          url: "/admin/coupons",
          icon: "feather icon-file",
        },
      ],
    },
  ],
};
