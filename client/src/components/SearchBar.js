import React from 'react';
import { useState } from "react";

import { 
  Form, 
  FormControl,
  Button,
} from 'react-bootstrap';

import { Route, Switch, withRouter } from "react-router-dom";

/*
props: url to render for results
       placeholder
       alert text
       onSubmit
*/

class SearchBar extends React.Component {
  
  state = {
        searchText: ""
  };

  onSubmit1(text) {
    this.props.history.push(`/search/recipes/?s=${text}`);
  }

  handleSearchInput = event => {
      this.setState({
          searchText: event.target.value
      });
  };

  handleSearchSubmit = e => {
      if (this.state.searchText) {
          let text = this.state.searchText;
          this.setState({ searchText: "" })
          console.log(this.state.searchText);
          // this.props.history.push(`/search/recipes/?s=${text}`);
          console.log(`${this.props.errorMsg}`)
          this.props.onSubmit(text);
          e.preventDefault();
      } else {
          alert(`${this.props.errorMsg}`);
      }
  };

  handleSearchKeyUp = event => {
      event.preventDefault();
      if (event.key === 'Enter' && event.keyCode === 13) {
          this.handleSearchSubmit();
      }
  }

  handleFormSubmit = e => e.preventDefault();
  
  render() {
    return (
      <>
      <Form className="d-flex">
        <FormControl
            onChange={this.handleSearchInput}
            value={this.state.searchText}
            onKeyUp={this.handleSearchKeyUp}
            type="Search"
            placeholder={this.props.placeholder}
            className="mr-sm-2"
        />
        <Button onClick={this.handleSearchSubmit} variant="outline">
          <img src="https://img.icons8.com/material-outlined/24/000000/search--v1.png"/>
        </Button>
      </Form>
      </>

    );
  }
}

export default withRouter(SearchBar)
