import React, { Component } from "react";
import { Route } from "react-router-dom";

import LeftPanel from "../../left-panel/left-panel/LeftPanel";
import LetterTemplate from "../letter-template/LetterTemplate";

import { LETTERS_CONTENT_MODE } from "../../../util/const";


class Authorship extends Component {

  refToContentsUpdate = React.createRef();

  updateContents = () => {
    this.refToContentsUpdate.current.updateContents();
  }

  render() {

    const { match } = this.props;
    
    return (
      <div className="authorship-div">
        <LeftPanel 
          { ...this.props }
          path="/authorship/letters"
          mode={ LETTERS_CONTENT_MODE[0] }
          ref={ this.refToContentsUpdate }
        />
        <Route 
          path={ match.path } 
          component={ (props) => 
            <LetterTemplate { ...props } { ...this.props } cellContentsUpdate={ this.updateContents } /> } 
        />
      </div>
    );
  }
}

export default Authorship;