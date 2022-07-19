import Coupons from "../models/CouponModel.js";
import Users from "../models/UserModel.js";

export const createCoupon = async (req, res) => {
  const {
    name,
    description,
    expiry_date,
    coupon_code,
    quantity,
    city,
    address,
    inventoryType,
    section,
    merchant_id,
  } = req.body;
  const url = req.protocol + "://" + req.get("host");
  try {
    await Coupons.create({
      name: name,
      description: description,
      expiry_date: expiry_date,
      coupon_code: coupon_code,
      quantity: quantity,
      city: city,
      address: address,
      inventoryType: inventoryType,
      section: section,
      merchant_id: merchant_id,
      status: null,
      image: url + "/public/" + req.file.filename,
    });
    res.json({ msg: "Coupon successfully created!" });
  } catch (error) {
    console.log(error);
  }
};
export const updateCoupon = async (req, res) => {
  const { expiry_date, quantity } = req.body;
  try {
    await Coupons.update(
      {
        expiry_date: expiry_date,
        quantity: quantity,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ msg: "Coupon successfully updated!" });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusCoupon = async (req, res) => {
  const { status } = req.body;
  try {
    await Coupons.update(
      {
        status: status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ msg: "Coupon successfully updated!" });
  } catch (error) {
    console.log(error);
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupons.findAll();
    const merchants = await Users.findAll();

    const merchantCoupons = coupons.map((coupon) => {
      let merchant = merchants.find((user) => user.id === coupon.merchant_id);
      return {
        ...coupon.dataValues,
        brandname: merchant.brandname,
        merchantFullname: merchant.fullname,
      };
    });

    res.json(merchantCoupons);
  } catch (error) {
    console.log(error);
  }
};

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupons.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(coupon[0]);
  } catch (error) {
    console.log(error);
  }
};

export const merchantGetCoupons = async (req, res) => {
  try {
    const coupons = await Coupons.findAll({
      where: {
        merchant_id: req.params.id,
      },
    });
    res.json(coupons);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const coupons = await Coupons.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(coupons);
  } catch (error) {
    console.log(error);
  }
};
