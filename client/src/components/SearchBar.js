import React from 'react';
import { useState } from "react";

import { 
  Form, 
  FormControl,
  Button,
} from 'react-bootstrap';

import { Route, Switch, withRouter } from "react-router-dom";

class SearchBar extends React.Component {
  
  state = {
        searchText: ""
  };

  handleSearchInput = event => {
      this.setState({
          searchText: event.target.value
      });
  };

  handleSearchSubmit = () => {
      if (this.state.searchText) {
          let text = this.state.searchText;
          this.setState({ searchText: "" })
          console.log(this.state.searchText);
          this.props.history.push({
              pathname: '/search/recipes/',
              state: { searchText: text }
          });
      } else {
          alert("Please enter a recipe to search for!");
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
            placeholder="Find Recipes"
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
