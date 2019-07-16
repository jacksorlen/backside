import React, { Component } from 'react';

import './GarbageIcon.css'


class GarbageIcon extends Component {

  render() {
    return(
      <svg 
          className="garbage-logo-svg"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 60.01"
          onClick={ () => this.props.onClick() }>
        <g className="garbage">
          <rect width="55" height="60" />
          <path d="M53.28,8.64H40.42v-2A6.71,6.71,0,0,0,33.62,0H21.38a6.71,6.71,0,0,0-6.8,6.6v2H1.72a1.67,1.67,0,1,0,0,3.33h3.1V51.1A9.05,9.05,0,0,0,14,60H41a9.05,9.05,0,0,0,9.18-8.91V12h3.1a1.67,1.67,0,1,0,0-3.33ZM18,6.6a3.32,3.32,0,0,1,3.36-3.27H33.62A3.32,3.32,0,0,1,37,6.6v2H18ZM46.75,51.1A5.67,5.67,0,0,1,41,56.68H14A5.67,5.67,0,0,1,8.25,51.1V12H46.76V51.1Z" />
          <path d="M27.5,50.71A1.69,1.69,0,0,0,29.22,49V19.61a1.72,1.72,0,0,0-3.44,0V49A1.7,1.7,0,0,0,27.5,50.71Z" />
          <path d="M16.3,48.87A1.69,1.69,0,0,0,18,47.21V21.43a1.72,1.72,0,0,0-3.44,0V47.21A1.7,1.7,0,0,0,16.3,48.87Z" />
          <path d="M38.7,48.87a1.69,1.69,0,0,0,1.72-1.66V21.43a1.72,1.72,0,0,0-3.44,0V47.21A1.69,1.69,0,0,0,38.7,48.87Z" />
        </g>
      </svg>
    );
  }
}

export default GarbageIcon;