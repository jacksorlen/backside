import React, { Component } from 'react';

import GarbageIcon from '../../icons/garbage-icon/GarbageIcon';
import preUploadImgLeave from '../../../resources/pre-upload-img-gray.svg';
import preUploadImgOn from '../../../resources/pre-upload-img-black.svg';

import { API_BASE_URL } from "../../../util/const";

import './ImgUploader.css'


class ImgUploader extends Component {

  state = {
    img: preUploadImgLeave,
    imgControlDisplay: "none"
  }

  componentWillReceiveProps(props) {
    if(props.pictureName !== null) {
      const pictureUrl = API_BASE_URL + "/public/pictures/" + props.pictureName;
      this.setState({
        img: pictureUrl
      });
    }
  }

  fileInputHandler = (event) => {
    const { target: { files } } = event;
    if (files.length === 1 && files[0].type === "image/jpeg") {
      this.setState({
          img: URL.createObjectURL(files[0])
      });
      this.props.handleImgChange(files[0]);
    }
  }

  onImgOver = () => {
    const { img } = this.state;

    if(img === preUploadImgLeave) {
      this.setState({
        img: preUploadImgOn
      });
    } else {
      this.setState({
        imgControlDisplay: "block"
      });
    }
  }

  onImgLeave = () => {
    const { img } = this.state;

    if(img === preUploadImgOn) {
      this.setState({
        img: preUploadImgLeave
      });
    } else {
      this.setState({
        imgControlDisplay: "none"
      });
    }
  }

  removeCurrentImg = () => {
    this.setState({
      img: preUploadImgLeave
    });
    this.props.handleImgChange(null);
  }

  render() {
    let { img, imgControlDisplay } = this.state;

    return (
      <div className="img-uploader-div">
        <div 
          className="img-control-div" 
          style={ { display: imgControlDisplay } }
          onMouseOver={ this.onImgOver }
          onMouseLeave={  this.onImgLeave }
        >
        <GarbageIcon 
          onClick={ this.removeCurrentImg } 
        />    
        </div>
        <input
          type="file"
          ref={ fileInput => this.fileInput = fileInput }
          onChange={ this.fileInputHandler }
        />
        <img
          className="upload-img"
          onClick={ () => this.fileInput.click() } 
          onMouseOver={ this.onImgOver }
          onMouseLeave={  this.onImgLeave }
          src={ img }
          alt=""
        />
      </div>
    );
  }
}

export default ImgUploader;