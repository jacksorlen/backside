import React, { Component } from "react";

import TelegramIcon from "../../icons/telegram-icon/TelegramIcon";
import GitIcon from "../../icons/git-icon/GitIcon";

import "./About.css";


class About extends Component {

  render() {
    return(
      <div className="about-div animated">
        <div className="inner-html">
          <p>{ about }</p>
        </div>
        <div className="contacts-div">
          <div className="contact-div">
            <a href="" target="_blank" rel="noopener noreferrer">
              <TelegramIcon />
            </a>
            channel
          </div>
          <div className="contact-div">
            <a href="https://github.com/annagreille/backside" target="_blank" rel="noopener noreferrer">
              <GitIcon />
            </a>
            sorce
          </div>
        </div>
      </div>
    );
  }
}

const about = 
  `Backside of Love - одна, необычайно важная история, разбитая на отдельные рукописи, 
  представленные реальными почтовыми письмами тем линиям моей души, что реальны вовсе, но 
  лишь одна из них рождает остальные, являсь тем, чем собственно и есть обратная сторона 
  любви.`;

export default About;