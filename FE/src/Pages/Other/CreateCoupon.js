import React from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import Aux from "../../hoc/_Aux";
import { toast } from "react-toastify";
import { RegionDropdown } from "react-country-region-selector";
import { sectionList } from "../../utils/services.js";
import tokenService from "../../utils/token.service";

const SamplePage = (props) => {
  const [values, setValues] = React.useState({
    inventoryType: "None",
    section: "Spa and Beauty",
  });

  const [region, setRegion] = React.useState("");

  const onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onInputChange = (e) => {
    setValues({ ...values, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      const file = values["file"];
      data.append("file", file);
      data.append("name", values["name"]);
      data.append("expiry_date", values["expiry_date"]);
      data.append("coupon_code", values["coupon_code"]);
      data.append("description", values["description"]);
      data.append("quantity", values["quantity"]);
      data.append("city", values["city"]);
      data.append("inventoryType", values["inventoryType"]);
      data.append("section", values["section"]);
      data.append("merchant_id", tokenService.getUser().id);

      await axios({
        method: "post",
        url: "http://localhost:5000/create-coupon",
        data: data,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      }).then((response) => {
        toast.success("Your coupon code is successfully created!");
        props.history.push("/");
      });
    } catch (error) {
      if (error.response) {
        toast.error("Oops! Something went wrong. Please try again.!");
        console.log(error.response.data.msg);
      }
    }
  };
  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h5>Create Coupon</h5>
              <hr />
              <Row>
                <Col md={6}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                      <Form.Label>Coupon title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="GET YOUR 50% NOW"
                        name="name"
                        onChange={onFormChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Coupon description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        name="description"
                        placeholder="Get 50% now from Zalora on selected items!"
                        onChange={onFormChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="image">
                      <Form.Label>Coupon image</Form.Label>
                      <br />
                      <input type="file" name="file" onChange={onInputChange} />
                    </Form.Group>
                    <Form.Group controlId="expiryDate">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="expiry_date"
                        onChange={onFormChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="section">
                      <Form.Label>Coupon Sections</Form.Label>
                      <Form.Control
                        as="select"
                        name="section"
                        onChange={onFormChange}
                      >
                        {sectionList.map((section) => {
                          return <option key={section}>{section}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="inventoryType">
                      {["radio"].map((type) => (
                        <div key={`default-${type}`}>
                          <Form.Check
                            value="QR code"
                            name="inventoryType"
                            type={type}
                            label={`QR code`}
                            checked={values["inventoryType"] === "QR code"}
                            onChange={onFormChange}
                          />
                          <Form.Check
                            value="Barcode"
                            name="inventoryType"
                            type={type}
                            label={`Barcode`}
                            checked={values["inventoryType"] === "Barcode"}
                            onChange={onFormChange}
                          />
                          <Form.Check
                            value="None"
                            name="inventoryType"
                            type={type}
                            label={`None`}
                            checked={values["inventoryType"] === "None"}
                            onChange={onFormChange}
                          />
                        </div>
                      ))}
                    </Form.Group>
                    <Form.Group controlId="couponCode">
                      <Form.Label>Coupon Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="coupon_code"
                        placeholder="HALFPRICE30"
                        onChange={onFormChange}
                      />
                      <Form.Text className="text-muted">
                        Code that is used to scan the barcode
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="city">
                      <Form.Label>Please Select The City</Form.Label>
                      <div>
                        <RegionDropdown
                          name="city"
                          country="Malaysia"
                          value={region}
                          onChange={(val) => {
                            setValues({ ...values, city: val });
                            setRegion(val);
                          }}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group controlId="quantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="text"
                        name="quantity"
                        placeholder="30"
                        onChange={onFormChange}
                      />
                      <Form.Text className="text-muted">
                        If unlimitted please leave empty
                      </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Create
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default SamplePage;
