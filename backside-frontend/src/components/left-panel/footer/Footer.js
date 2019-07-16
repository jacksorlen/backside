import React, { Component } from "react";

import "./Footer.css";


class Footer extends Component {

  render() {

    const { isAbout } = this.props;

    return(
      <div className="footer-div">
        <span onClick={ this.props.showAbout }>
          { isAbout ? footerTitles[1].title : footerTitles[0].title }
        </span>
      </div>
    );
  }
}

const footerTitles = [
  {value: "open", title: "о проекте"},
  {value: "close", title: "закрыть"}
];

export default Footer;