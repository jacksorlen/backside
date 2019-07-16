import React, { Component } from "react";

import LettersContent from "../letters-content/letters-content/LettersContent";
import About from "../about/About";
import Footer from "../footer/Footer";

import backsideLogo from "../../../resources/backside-logo.png";
import backsideLogoMax768 from "../../../resources/backside-logo-max768.jpg"

import "./LeftPanel.css";


class LeftPanel extends Component {

  refToContentsUpdate = React.createRef();

  state = {
    isAbout: false,
    contentsState: null
  }

  showAbout = () => {
    this.setState(prevState => ({
      isAbout: !prevState.isAbout
    }));
    window.scroll(0, 0);
  }

  beforeLettersContentsUnMount = (contentsState) => {
    this.setState({
      contentsState: contentsState
    });
  }

  updateContents = () => {
    this.refToContentsUpdate.current.updateContents();
  }

  render() {

    const { isAbout, contentsState } = this.state;
    
    return(
      <div className="background-left-div">
        <div className="left-panel-div">
          <div className="logo-container-div">
            <picture>
              <source media="(max-width: 768px)" srcSet={ backsideLogoMax768 } />
              <img className="backside-logo" src={ backsideLogo } alt="" />
            </picture>
          </div>
          { isAbout ? 
            <About /> 
            : 
            <LettersContent 
              { ...this.props }
              contentsState = { contentsState }
              beforeLettersContentsUnMount={ this.beforeLettersContentsUnMount }
              ref={ this.refToContentsUpdate }
            />
          }
          <Footer showAbout={ this.showAbout } isAbout={ isAbout } />
        </div>
      </div>
    );
  }
}

export default LeftPanel;