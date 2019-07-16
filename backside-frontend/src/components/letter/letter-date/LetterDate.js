import React, { Component } from "react";
import moment from "moment";

import "./LetterDate.css";


class LetterDate extends Component {

  render() {

    let date = moment().local();

    if(this.props.date !== undefined)
      date = moment(this.props.date); 
    
    let day = date.date();
    if(day < 10)
      day = "0" + day;

    let month = date.month() + 1;
    if(month < 10)
      month = "0" + month;

    let year = date.year().toString(); 

    return (
      <div className="date-div">
        { day + " . " + month + " . " + year }
      </div>
    );
  }
}

export default LetterDate;