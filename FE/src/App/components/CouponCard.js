import React from 'react';
import {Button, Card, Row} from 'react-bootstrap';
import tokenService from '../../utils/token.service';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const CouponCard = ({coupon, disabled, updateList, action = true}) => {
  const handleSubmit = async (e) => {
    try {
      await api.post('http://localhost:5000/create-user-coupon', {
        user_id: tokenService.getUser().id,
        coupon_id: coupon.id,
      }).then(() => {
        toast.success("Coupon is successfully added to your cart!");
        updateList();
      })
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  }
  return(
    <Card className="coupon-card-container">
      <Card.Body>
        <img src={coupon.image} alt="coupon-img" className="coupon-card-img mb-3"/>
        <h6>{coupon.name}</h6>
        <p>{coupon.description}</p>
        {coupon.expiry_date 
          ? <b><p>Get your deal by {new Date(coupon.expiry_date).toDateString()}</p></b>
          : <b><p className="text-c-red">UNLIMITED TIME FOR THIS OFFER!!!</p></b>
        }
        {(tokenService.getUser().role === 'Customer' && action) &&
          <Row style={{justifyContent:'end'}}>
            <Button 
              className="label theme-bg text-white f-12" 
              style={{borderColor: 'transparent'}} onClick={() => handleSubmit()}
              disabled={disabled}
            >
              Get deal
            </Button>
          </Row>
        }
      </Card.Body>
    </Card>
  )
}

export default CouponCard;