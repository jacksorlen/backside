import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import LetterDate from '../../letter/letter-date/LetterDate';
import ImgUploader from '../img-uploader/ImgUploader.js'

import { getAnyLetterById, savePicture, saveLetter, deleteLetter } from '../../../util/api';
import { autoresize } from './autoresize.js';

import './LetterTemplate.css';


class LetterTemplate extends Component {

  letterStates = [
    { value: 'PUBLIC', label: 'паблик', className: "dropdowns" },
    { value: 'DRAFT', label: 'черновик', className: "dropdowns" }
  ];

  state = {
    id: null,
    title: '',
    dateOfPublication: new Date(),
    htmlText: '',
    picture: null,
    pictureName: null,
    letterState: this.letterStates[1],
    isBeforeRemovingPopUp: false
  }

  componentDidMount = async () => {
    if(this.props.match.params.id !== "new_letter") {
      getAnyLetterById(parseInt(this.props.match.params.id))
        .then(response => {
          const { id, title, dateOfPublication, htmlText, pictureName, state } = response.data;
            this.setState({
              id: id,
              title: title,
              dateOfPublication: new Date(dateOfPublication),
              htmlText: htmlText,
              pictureName: pictureName,
              letterState: this.letterStates.find(letterState => letterState.value === state)
            });
        });
    }
  }

  componentDidUpdate = () => {
    autoresize("textarea-input");
  }

  saveLetter = async (event) => { 
    event.preventDefault(); 

    const { id, title, dateOfPublication, htmlText, 
                    picture, pictureName, letterState } = this.state;

    let letter = {
      id: id,
      title: title,
      dateOfPublication: dateOfPublication,
      htmlText: htmlText,
      state: letterState.value
    };

    if(id === null || picture !== null) {
      const fileName = await this.savePicture();
      letter.pictureName = fileName;
    } else if(id !== null && picture === null) {
      letter.pictureName = pictureName;
    }
    
    saveLetter(letter)
      .then(response => {
        if(response.status === 200) {
          this.props.cellContentsUpdate();
        }
      });
    
  }

  showBeforeRemovingPopUp = () => {
    this.setState({
      isBeforeRemovingPopUp: !this.state.isBeforeRemovingPopUp
    });
  }

  allowRemoving = () => {
    const { id } = this.state;
    if(id !== null) {
      deleteLetter(id)
      .then(response => {
        if(response.status === 200) {
          this.setState({
            isBeforeRemovingPopUp: false
          });
          this.props.cellContentsUpdate();
        }
      });
    }
  }

  savePicture = async () => {
    const formData = new FormData();
    formData.append("pictureFile", this.state.picture);

    const response = await savePicture(formData);
    if(response.status === 200) {
      return response.data.fileName
    } else {
      // !!! //
    }
  }

  handleTitleChange = (event) => {
    const value = event.target.value;
    this.setState({
      title: value
    });
  }

  handleHtmlTextChange = (event) => {
    autoresize(event.target.id);
    const value = event.target.value;
    this.setState({
      htmlText: value
    });
  }

  handleDropDownSelect = (letterState) => {
    this.setState({
      letterState: letterState
    });
  }

  handleImgChange = (picture) => {
    if (picture !== null) {
      this.setState({
        picture: picture
      });
    } else {
      this.setState({
        picture: null,
        pictureName: null
      });
    }
  }

  render() { 
    const { title, dateOfPublication, htmlText, pictureName, isBeforeRemovingPopUp } = this.state;

    return(
      <div className="background-letter-editor-div">
        <div className="letter-editor">
          <input
            id="title-input"
            className="input-authorship-field"
            type="text"
            placeholder="Заглавие"
            value={ title }
            onChange={ this.handleTitleChange }
          />
          <LetterDate date={ dateOfPublication } />
          <div>
            <textarea
              id="textarea-input"
              className="input-authorship-field"
              type="text"
              value={ htmlText }
              onChange={ this.handleHtmlTextChange }
            />
            <ImgUploader
              pictureName={ pictureName }
              handleImgChange={ this.handleImgChange }
            />
            <div id="letter-save-div">
              <Dropdown
                options={ this.letterStates }
                onChange={ this.handleDropDownSelect }
                value={ this.state.letterState }
                className='dropdown-selector'
                placeholderClassName='dropdown-placeholder'
                controlClassName='control-dropdown-selector'
                menuClassName='menu-dropdown-selector'
                arrowClassName='arrow-dropdown-selector'
              />
              <div className="save-delete-div">
                <button className="save-button" onClick={ this.saveLetter }>сохранить</button>
                <button className="delete-button" onClick={ this.showBeforeRemovingPopUp }>удалить</button>
              </div>
              <button className="logout-button" onClick={ () => this.props.onLogOut(this.props.history) }>выйти</button>
            </div>
          </div>
        </div>
        { isBeforeRemovingPopUp ? 
          <PopUpBeforeDeleting 
            allowRemoving={ this.allowRemoving } 
            showPopUp={ this.showBeforeRemovingPopUp }
          /> : null }
      </div>
    );
  }
}

const PopUpBeforeDeleting = ({ ...props }) => {
  return(
    <div>
      <div className="popup-background" />
      <div className="popup-context-div">
        <div className="message">
          Ты действительно хочешь удалить письмо?
        </div>
        <button 
          className="choice-button"
          onClick={ props.allowRemoving }>да</button>
        <button 
          className="choice-button" 
          onClick={ props.showPopUp }>нет</button>
      </div>
    </div>
  );
};

export default LetterTemplate;