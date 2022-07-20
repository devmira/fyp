import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Coupons from "../models/CouponModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "fullname", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getMerchants = async (req, res) => {
  try {
    const users = await Users.findAll({
      where: {
        role: "Merchant",
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const updateMerchant = async (req, res) => {
  try {
    const user = await Users.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMerchant = async (req, res) => {
  try {
    Coupons.destroy({
      where: {
        merchant_id: req.params.id,
      },
    });
    const user = await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(user);

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { fullname, email, brandname, password, role } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      fullname: fullname,
      email: email,
      brandname: brandname,
      password: hashPassword,
      role: role,
      status: null,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      attributes: ["id", "fullname", "email", "role", "password", "status"],
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const fullname = user[0].fullname;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, fullname, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, fullname, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    console.log(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    let response = {};
    response["id"] = user[0].id;
    response["email"] = user[0].email;
    response["accessToken"] = accessToken;
    response["role"] = user[0].role;
    response["fullname"] = user[0].fullname;
    response["status"] = user[0].status;
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Email not found" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
