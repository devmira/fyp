import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  getMerchants,
  updateMerchant,
  deleteMerchant,
} from "../controllers/Users.js";
import {
  createCoupon,
  getCoupons,
  getCoupon,
  merchantGetCoupons,
  updateCoupon,
  deleteCoupon,
  updateStatusCoupon,
} from "../controllers/Coupons.js";
import {
  createUserCoupon,
  getUserCoupons,
} from "../controllers/UserCoupons.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.get("/users", verifyToken, getUsers);
router.get("/merchants", getMerchants);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.get("/coupons", getCoupons);
router.get("/coupon/:id", getCoupon);
router.delete("/logout", Logout);
router.post("/create-coupon", upload.single("file"), createCoupon);
router.post("/create-user-coupon", createUserCoupon);
router.get("/get-user-coupons/:user_id", getUserCoupons);
router.get("/merchants/:id/coupons", merchantGetCoupons);
router.post("/update-coupon/:id", updateCoupon);
router.post("/update-status-coupon/:id", updateStatusCoupon);
router.post("/update-merchant/:id", updateMerchant);
router.delete("/delete-merchant/:id", deleteMerchant);
router.delete("/delete-coupon/:id", deleteCoupon);

export default router;
