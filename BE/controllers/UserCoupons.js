import UserCoupons from "../models/UserCouponsModel.js";

export const createUserCoupon = async (req, res) => {
  const { user_id, coupon_id } = req.body;
  try {
    await UserCoupons.create({
      user_id: user_id,
      coupon_id: coupon_id,
    });
    res.json({ msg: "Coupon successfully added to the user!" });
  } catch (error) {
    console.log(error);
  }
};

export const getUserCoupons = async (req, res) => {
  try {
    const coupons = await UserCoupons.findAll({
      where: {
        user_id: req.params.user_id,
      },
    });
    res.json(coupons);
  } catch (error) {
    console.log(error);
  }
};
