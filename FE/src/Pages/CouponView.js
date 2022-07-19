import React, { useEffect, useState } from "react";
import Aux from "../hoc/_Aux";
import api from "../utils/api";
import { Button, Row } from "react-bootstrap";
import tokenService from "../utils/token.service";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";
import JsBarcode from "jsbarcode";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const CouponView = ({ match }) => {
  const [coupon, setCoupon] = useState({});
  const [download, setDownload] = useState(false);
  const qrCodeCanvas = document.querySelector("#qrCanvas");
  const qrCodeDataUri =
    qrCodeCanvas && qrCodeCanvas.toDataURL("image/jpg", 0.3);
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, coupon.coupon_code).options({
    format: "CODE128",
    width: "4px",
    height: "40px",
  });
  const barcode = canvas.toDataURL();

  const MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text
            style={{
              textAlign: "center",
              color: "rgb(63,77,103)",
              marginBottom: "30px",
            }}
          >
            {coupon.name}
          </Text>
          <Image
            style={{ textAlign: "center", marginBottom: "30px" }}
            src={coupon.image}
            width="500"
            height="600"
          />
          <Text
            style={{
              textAlign: "justify",
              color: "rgb(63,77,103)",
              marginBottom: "30px",
            }}
          >
            {coupon.description}
          </Text>
          <Text
            style={{
              color: "rgb(63,77,103)",
            }}
          >
            Expiry date: {coupon.expiry_date}
          </Text>

          {(coupon.inventoryType === null ||
            coupon.inventoryType === "None" ||
            coupon.inventoryType === "QR code") && (
            <Image allowDangerousPaths src={qrCodeDataUri} />
          )}
          {(coupon.inventoryType === null ||
            coupon.inventoryType === "None" ||
            coupon.inventoryType === "Barcode") && (
            <Image allowDangerousPaths src={barcode} width="50" height="60" />
          )}
        </View>
      </Page>
    </Document>
  );
  const handleSubmit = async (e) => {
    try {
      await api
        .post("http://localhost:5000/create-user-coupon", {
          user_id: tokenService.getUser().id,
          coupon_id: coupon.id,
        })
        .then(() => {
          toast.success("Coupon is successfully added to your cart!");
          setDownload(true);
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    api
      .get(`http://localhost:5000/coupon/${match.params.id}`)
      .then((response) => {
        setCoupon(response.data);
      });
  }, [match.params.id]);

  useEffect(() => {
    api
      .get(
        `http://localhost:5000/get-user-coupons/${tokenService.getUser().id}`
      )
      .then((response) => {
        const couponExist = response.data.find((userCoupon) => {
          if (userCoupon.coupon_id === coupon.id) {
            return userCoupon;
          }
          return null;
        });
        if (couponExist) {
          setDownload(true);
        }
      });
  }, [coupon]);
  return (
    <Aux>
      <div style={{ display: "none" }}>
        <QRCodeCanvas
          id="qrCanvas"
          value={coupon.coupon_code}
          style={{ height: "50px" }}
        />
      </div>
      <Row>
        <p>{coupon.name}</p>
      </Row>
      <Row>
        <img
          alt="Coupon banner"
          style={{ width: "auto", height: "300px" }}
          src={coupon.image}
        />
      </Row>
      <Row>
        <p>{coupon.description}</p>
      </Row>
      <Row>
        {!download ? (
          <Button
            className="label theme-bg text-white f-12"
            style={{ borderColor: "transparent" }}
            onClick={() => handleSubmit()}
          >
            Get deal
          </Button>
        ) : (
          <Button
            className="label theme-bg text-white f-12"
            style={{ borderColor: "transparent", width: "auto" }}
          >
            <PDFDownloadLink
              document={<MyDoc />}
              fileName={`${coupon.name}_${coupon.expiry_date}`}
              style={{ color: "white" }}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download now!"
              }
            </PDFDownloadLink>
          </Button>
        )}
      </Row>
    </Aux>
  );
};

export default CouponView;
