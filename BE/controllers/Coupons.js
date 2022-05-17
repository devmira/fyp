import Coupons from "../models/CouponModel.js";

export const createCoupon = async(req, res) => {
  const { name, description, expiry_date, coupon_code, quantity} = req.body;
  const url = req.protocol + '://' + req.get('host')
  try {
    await Coupons.create({
      name: name,
      description: description,
      expiry_date: expiry_date,
      coupon_code: coupon_code,
      quantity: quantity,
      image: url + '/public/' + req.file.filename
    });
    res.json({msg: "Coupon successfully created!"});
  } catch (error) {
    console.log(error);
  }
}

export const getCoupons = async(req, res) => {
  try {
    const coupons = await Coupons.findAll();
    res.json(coupons);
  } catch (error) {
    console.log(error);
  }
}