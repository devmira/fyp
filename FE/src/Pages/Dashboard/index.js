import React, { useEffect, useState } from 'react';
import {Row, Col} from 'react-bootstrap';
import CouponCard from '../../App/components/CouponCard';
import Aux from "../../hoc/_Aux";
import api from '../../utils/api';
import tokenService from '../../utils/token.service';

const Dashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [userCoupons, setUserCoupons] = useState([]);
  const updateUserCouponList = () => {
    api.get(`http://localhost:5000/get-user-coupons/${tokenService.getUser().id}`).then((response) => {
      setUserCoupons(response.data);
    });
  };

  useEffect(() => {
    api.get('http://localhost:5000/coupons').then((response) => {
      setCoupons(response.data);
    });
    updateUserCouponList();
  }, [])
  return (
    <Aux>
      <Row>
        {coupons.map((coupon) => {
          return(
            (new Date(coupon.expiry_date) > new Date() || coupon.expiry_date === null) &&
            <Col md={6} xl={4} key={coupon.id}>
              <CouponCard 
                coupon={coupon} 
                disabled={userCoupons.find((element) => element.id === coupon.id)}
                updateList={() => updateUserCouponList()}
              />
            </Col>
          )
        })}
      </Row>
    </Aux>
  );
}

export default Dashboard;