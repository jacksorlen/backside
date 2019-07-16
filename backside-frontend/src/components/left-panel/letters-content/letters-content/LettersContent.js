import React, { Component } from "react";
import { Link } from "react-router-dom";

import Title from "../title/Title";

import { uncheckTogleInput } from "./checkbox-controller";
import { getAllTitles, getPublicTitles } from "../../../../util/api";
import { LETTERS_CONTENT_MODE } from "../../../../util/const";

import "./LettersContent.css";


class LettersContent extends Component {

  chronology = [
    {value: "new", title: "последнее"},
    {value: "chronology", title: "хронология"}
  ];

  state = {
    titles: [],
    selectedTitleId: 0,
    selectedChronology: this.chronology[0],
    newLetterTitle: false
  }

  componentWillMount = async () => {
    const { contentsState, history, match, path, mode } = this.props;

    if(contentsState === null) {
      let titles = [];
      if(mode === LETTERS_CONTENT_MODE[0]) {
        await getAllTitles()
          .then(response => { titles = response.data });
        this.setState({newLetterTitle: true});
      } else if(mode === LETTERS_CONTENT_MODE[1]) {
        await getPublicTitles()
          .then(response => { titles = response.data });
      }
  
      titles = this.chronologySort(titles, this.chronology[0].value);

      if(match.params.id === "last") {
        const lastSelectedTitleId = titles[0].id;
        history.push(`${path}/${lastSelectedTitleId}`);
        this.setState({
          titles: titles,
          selectedTitleId: lastSelectedTitleId
        });
      } else {
        this.setState({
          titles: titles,
          selectedTitleId: parseInt(match.params.id)
        });
      }
    } else {
      this.setState({
        titles: contentsState.titles,
        selectedTitleId: contentsState.selectedTitleId,
        selectedChronology: contentsState.selectedChronology,
        newLetterTitle: contentsState.newLetterTitle
      });
    }
  }

  componentWillUnmount() {
    this.props.beforeLettersContentsUnMount(this.state);
  }

  handleChronologySelect = (props) => {
    const titles = this.chronologySort(this.state.titles, props.state);
    const selectedChronology = this.chronology.find(state => state.value === props.state);
    this.setState({
      titles: titles,
      selectedChronology: selectedChronology
    });
  }

  chronologySort = (titles, state) => {
    if(state === this.chronology[0].value) {
      titles.sort((a, b) => {
        if(a.dateOfPublication < b.dateOfPublication)
          return 1;
        if(a.dateOfPublication > b.dateOfPublication)
          return -1;
        else return -1
      });
      this.setState({
        titles: titles
      });
    } else if(state === this.chronology[1].value) {
      titles.sort((a, b) => {
        if(a.dateOfPublication > b.dateOfPublication)
          return 1;
        if(a.dateOfPublication < b.dateOfPublication)
          return -1;
        else return -1
      });
    }
    return titles;
  }

  handleTitleSelect = (props) => {
    this.setState({
      selectedTitleId: props.id
    });
    uncheckTogleInput();
  }

  updateContents = () => {
    const { history, path } = this.props;
    history.push(`${path}/new_letter`);
    this.componentWillMount();
  }

  render() {
    
    const { path } = this.props;
    const { selectedChronology, selectedTitleId, newLetterTitle } = this.state;
    
    return(
      <div>
        <input id="toggle-input" type="checkbox" />
        <label htmlFor="toggle-input" id="toggle-label">письма</label>
        <div className="letters-content-div animated">
          <div className="chronology-controller-div">
            { this.chronology.map((title, key) => {
              return(
                <span className="chronology-span" key={ key }>
                  <Title
                    title={ title.title } 
                    state={ title.value } 
                    isSelected={ selectedChronology.value === title.value }
                    handleTitleSelect={ this.handleChronologySelect } 
                  />
                </span>
              );
            }) }
          </div>
          <div className="content-list-div">
            { newLetterTitle ? 
              <Link to={ `${path}/new_letter` } className="react-router-link">
                <Title
                  id={ -100 } 
                  title={ "новое письмо" }
                  handleTitleSelect={ () => {} }
                /> 
              </Link>
             : null }
            { this.state.titles.map((title, key) => {
              return(
                <Link to={ `${path}/${title.id}` } className="react-router-link" key={ key }>
                  <Title 
                    id={ title.id }
                    title={ title.title }
                    dateOfPublication={ title.dateOfPublication }
                    state={ title.state }
                    isSelected={ selectedTitleId === title.id }
                    handleTitleSelect={ this.handleTitleSelect }
                  />
                </Link>
              )
            }) }
          </div>
        </div>
      </div>
    );
  }
}

export default LettersContent;