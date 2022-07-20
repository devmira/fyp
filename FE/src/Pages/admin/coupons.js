import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import api from "../../utils/api";
import { toast } from "react-toastify";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);

  const getCoupons = () => {
    api.get(`http://localhost:5000/coupons`).then((response) => {
      setCoupons(response.data);
    });
  };

  const doAction = (action, id) => {
    if (action === true || action === false) {
      api
        .post(`http://localhost:5000/update-status-coupon/${id}`, {
          status: action,
        })
        .then((response) => {
          getCoupons();
          toast.success(
            `Coupon is successfully ${action ? "approved" : "rejected"}!`
          );
        });
    } else {
      api
        .delete(`http://localhost:5000/delete-coupon/${id}`, {
          status: action,
        })
        .then((response) => {
          getCoupons();
          toast.success(`Coupon is successfully deleted!`);
        });
    }
  };

  const getDate = (date) => {
    let createdDate = new Date(date);
    const yyyy = createdDate.getFullYear();
    let mm = createdDate.getMonth() + 1; // Months start at 0!
    let dd = createdDate.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    createdDate = dd + "/" + mm + "/" + yyyy;
    return createdDate;
  };

  const status = {
    null: 1,
    true: 2,
    false: 3,
  };

  useEffect(() => {
    getCoupons();
  }, []);

  return (
    <Aux>
      <Row>
        <Col md={6} xl={12}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Recent Coupons</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover>
                <tbody>
                  <tr>
                    <th>Coupon Name</th>
                    <th>Merchant's Name</th>
                    <th>Brand Name</th>
                    <th>Date of creation</th>
                    <th>Action</th>
                  </tr>
                  {coupons
                    .sort((a, b) => status[a.status] - status[b.status])
                    .map((coupon, index) => {
                      return (
                        <tr key={index} className="unread">
                          <td style={{width: "300px", whiteSpace: "break-spaces"}}>
                            <h6 className="mb-1">{coupon.name}</h6>
                          </td>
                          <td>
                            <h6 className="mb-1">{coupon.merchantFullname}</h6>
                          </td>
                          <td>
                            <h6 className="mb-1">{coupon.brandname}</h6>
                          </td>
                          <td>
                            <h6 className="text-muted">
                              <i className="fa fa-circle text-c-green f-10 m-r-15" />
                              {getDate(coupon.created_at)}
                            </h6>
                          </td>
                          <td>
                            {coupon.status === true ? (
                              <Button
                                onClick={() => {
                                  doAction("Delete", coupon.id);
                                }}
                                className="label theme-bg2 text-white f-12"
                              >
                                Delete
                              </Button>
                            ) : coupon.status === false ? (
                              <p>Rejected</p>
                            ) : (
                              <>
                                <Button
                                  onClick={() => {
                                    doAction(false, coupon.id);
                                  }}
                                  className="label theme-bg2 text-white f-12"
                                >
                                  Reject
                                </Button>
                                <Button
                                  onClick={() => {
                                    doAction(true, coupon.id);
                                  }}
                                  className="label theme-bg text-white f-12"
                                >
                                  Approve
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default Coupons;
