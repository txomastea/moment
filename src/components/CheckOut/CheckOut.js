import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import './CheckOut.scss';

class CheckOut extends Component {
    constructor() {
        super();
        this.state = {
            guests: 1,
            price: 0
        }
    }

// onToken = (stripeToken) =>{
//     console.log('onToken', stripeToken)
//     axios.post('/api/charge',
//      {
//         method: 'POST',
//         body: stripeToken,
//         amount: this.state.total * 100
//      })
//     }
handleGuestNumber = (e) => {
    this.setState({guests: e.target.value});
}

  render() {
      console.log('checkouttuttt passed props', this.props.location)
      const {date} = this.props.location;
      const {moment} = this.props.location.moment;
      const total = moment.price * this.state.guests;
      let groupSizeLimit = this.props.location.moment.moment.group_size_limit
      let array = []
      for(let i = 0; i < groupSizeLimit; i++){
          array.push(i)
      }
      let options = array.map((el) => {
        return <option value={el+1}>{el+1}</option>
      })
    return (
      <div className="checkout-container">
        <div className="checkout-wrapper">
            <div className="checkout-right">
                <div className="checkout-review">
                    <h2>Review and pay</h2>
                    <p>You can add more friends to this experience and confirm your reservation.</p>
                    <p>Guests ages 7 and up can attend.</p>
                </div>
                <div className="checkout-whoscoming">
                    <h3>Who's coming?</h3>
                    <h5>Number of guests</h5>
                    <select name="guests" onChange={this.handleGuestNumber}>
                        {options}
                    </select>
                </div>
                <div className="checkout-phone">
                    <h5>Verify your phone number</h5>
                    <p>This is so your host can contact you during your trip, and so Airbnb knows how to reach you.</p>
                    <input type="text" placeholder="enter phone number"/>
                    <button>verify</button>
                </div>
                <div className="checkout-stripe">
                    <p>By confirming this booking, you agree to the Guest Release and Waiver, the Cancellation Policy, and the Guest Refund Policy.</p>
                    <StripeCheckout
                    token={this.onToken}
                    stripeKey="pk_test_LjNm06RplXdJCIdfZJ7f9gTV"
                    card='424242424242424242'
                    amount={total * 100}
                    /> 
                </div>
            </div>
            <div className="checkout-left">
                <div className="checkout-title-host">
                    <h6>{moment.title}</h6>
                    <p>{moment.duration} experience</p>
                    <p>Hosted by Grace</p>
                    <img className="checkout-img" src={moment.photos[0]} alt=""/>
                </div>
                <div className="checkout-selected-datetime">
                    <h6>{`${date.sendDate.toDateString()}`}</h6>
                    <p>{moment.available_time_start}-{moment.available_time_end}</p>
                </div>
                <div className="checkout-price-calculation">
                    <p>${moment.price} X {this.state.guests} guests</p>
                </div>
                <div className="checkout-total">
                    <p>Total (USD) ${total}</p>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default CheckOut;
