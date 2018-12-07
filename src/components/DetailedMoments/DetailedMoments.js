import React, { Component } from 'react';
import './DetailedMoments.scss';
import { SingleDatePicker } from 'react-dates';
import Map from '../Map/Map';
import {Link} from 'react-router-dom';

class DetailedMoments extends Component {
  constructor(){
    super();
    this.state = {
      availableDate: ''
    }
  }


  render() {
    console.log('props in detail',this.props.location.state.moment)
    const {moment} = this.props.location.state
    const sendDate = this.state.availableDate
    const chooseDate = new Date(this.state.availableDate)
    console.log('choosese', chooseDate)
    return (
      <div className="detailed-container">
        <div className="detailed-wrapper">
          <div>
            <img className="detailed-img" src={moment.photos[1]} alt=""/>
          </div>
          <div className="detailed-info-wrapper">
            <div className="detailed-info-box">
              <div className="detailed-category-title">
                <h4 className="detailed-moment-category">{moment.category}</h4>
                <h1 className="detailed-moment-title">{moment.title}</h1>
              </div>
              <div className="detailed-descriptions">
                <p className="detailed-about">About your host,</p> <br/>
                <p className="detailed-paragraphs">{moment.host_qualifications}</p>  <br/>
                <p className="detailed-about">What will we'll do</p> <br/>
                <p className="detailed-paragraphs">{moment.what_we_will_do}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="date-price">
              <SingleDatePicker
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={date => this.setState( {availableDate: date._d })} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              id="your_unique_id" // PropTypes.string.isRequired,
              noBorder
              />
              {
                chooseDate.toDateString() === 'Invalid Date'
                ?
                <div></div>
                :
                <div>
                  <p>{`${chooseDate.toDateString()}`}</p>
                  <p>{moment.available_time_start}-{moment.available_time_end}</p>
                  <p>{moment.price} per person</p>
                  <button>
                    <Link to={{pathname:"/checkout", moment:{moment}, date:{sendDate}}}>
                      Choose
                    </Link>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
        <Map city={moment.locale}/>
      </div>
    )
  }
}

export default DetailedMoments;
