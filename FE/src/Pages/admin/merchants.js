import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import Aux from "../../hoc/_Aux";
import api from "../../utils/api";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const Merchants = () => {
  const [merchants, setMerchants] = useState([]);
  const form = useRef(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const getMerchants = () => {
    api.get(`http://localhost:5000/merchants`).then((response) => {
      setMerchants(response.data);
    });
  };

  const doAction = (action, id, merEmail, merName) => {
    setEmail(merEmail);
    setName(merName);
    if (action === true || action === false) {
      api
        .post(`http://localhost:5000/update-merchant/${id}`, {
          status: action,
        })
        .then((response) => {
          getMerchants();
          toast.success(
            `Merchant is successfully ${action ? "approved" : "rejected"}!`
          );
          if (action) {
            emailjs
              .sendForm(
                process.env.REACT_APP_EMAIL_SERVICE_ID,
                process.env.REACT_APP_EMAIL_TEMPLATE_ID_APPROVE,
                form.current,
                process.env.REACT_APP_EMAIL_TOKEN
              )
              .then(
                (result) => {
                  console.log(result.text);
                },
                (error) => {
                  console.log(error.text);
                }
              );
          } else {
            emailjs
              .sendForm(
                process.env.REACT_APP_EMAIL_SERVICE_ID,
                process.env.REACT_APP_EMAIL_TEMPLATE_ID_REJECT,
                form.current,
                process.env.REACT_APP_EMAIL_TOKEN
              )
              .then(
                (result) => {
                  console.log(result.text);
                },
                (error) => {
                  console.log(error.text);
                }
              );
          }
        });
    } else {
      api
        .delete(`http://localhost:5000/delete-merchant/${id}`, {
          status: action,
        })
        .then((response) => {
          getMerchants();
          toast.success(`Merchant is successfully deleted!`);
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
    getMerchants();
  }, []);

  return (
    <Aux>
      <Row>
        <Col md={6} xl={12}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Recent Users</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Brand Name</th>
                    <th>Date of joining</th>
                    <th>Action</th>
                  </tr>
                  {merchants
                    .sort((a, b) => status[a.status] - status[b.status])
                    .map((merchant, index) => {
                      return (
                        <tr key={index} className="unread">
                          <td>
                            <form ref={form} onSubmit={doAction}>
                              <div className="col-4">
                                <input
                                  type="text"
                                  name="email"
                                  id="email"
                                  value={email}
                                  hidden
                                  onChange={(val) => {console.log(val)}}
                                />
                                <input
                                  value={name}
                                  hidden
                                  onChange={(val) => {console.log(val)}}
                                  type="text"
                                  name="name"
                                  id="name"
                                />
                              </div>
                            </form>
                            <h6 className="mb-1">{merchant.fullname}</h6>
                            <p className="m-0">{merchant.email}</p>
                          </td>
                          <td>
                            <h6 className="mb-1">{merchant.brandname}</h6>
                          </td>
                          <td>
                            <h6 className="text-muted">
                              <i className="fa fa-circle text-c-green f-10 m-r-15" />
                              {getDate(merchant.created_at)}
                            </h6>
                          </td>
                          <td>
                            {merchant.status === true ? (
                              <Button
                                onClick={() => {
                                  doAction("Delete", merchant.id, merchant.email, merchant.name);
                                }}
                                className="label theme-bg2 text-white f-12"
                              >
                                Delete
                              </Button>
                            ) : merchant.status === false ? (
                              <p>Rejected</p>
                            ) : (
                              <>
                                <Button
                                  onClick={() => {
                                    doAction(false, merchant.id, merchant.email, merchant.name);
                                  }}
                                  className="label theme-bg2 text-white f-12"
                                >
                                  Reject
                                </Button>
                                <Button
                                  onClick={() => {
                                    doAction(true, merchant.id, merchant.email, merchant.name);
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
          </Card>{" "}
        </Col>
      </Row>
    </Aux>
  );
};

export default Merchants;
