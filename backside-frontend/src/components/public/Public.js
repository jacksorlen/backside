import React, { Component } from "react";
import { Route } from "react-router-dom";

import LeftPanel from "../left-panel/left-panel/LeftPanel";
import Letter from "../letter/letter/Letter";

import { LETTERS_CONTENT_MODE } from "../../util/const";


class Public extends Component {

  render() {
    
    const { match } = this.props;
    
    return(
      <div className="public-div">
        <LeftPanel 
          { ...this.props }
          path="/public/letters" 
          mode={ LETTERS_CONTENT_MODE[1] }
        />
        <Route path={ match.path } component={ (props) => <Letter { ...props } /> } />  
      </div>
    );
  }
}

export default Public;