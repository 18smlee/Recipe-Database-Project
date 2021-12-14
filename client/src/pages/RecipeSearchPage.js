/* Page to search and display all recipes and filter by conditions
Clicking on recipe will lead to recipe details page
 */
import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import SearchBar from '../components/SearchBar';
import {
  Container,
  Row,
  Col,
  Stack,
  Button,
} from 'react-bootstrap';
import queryString from 'query-string';

import { getAllRecipes } from '../fetcher';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class RecipeSearchPage extends React.Component {

    constructor(props) {
      super(props)
      
      this.state = {
        recipesResults: [],
        params: null,
        recipesPageNumber: 1,
        recipesPageSize: 10,
        pagination: null  
      }
      this.goToRecipe = this.goToRecipe.bind(this)
      this.handleSearch = this.handleSearch.bind(this);
    }
  
  
    goToRecipe(recipeId) {
      window.location = `/recipe?id=${recipeId}`
    }

    displaySearchResults() {
      getAllRecipes().then(res => {
        this.setState({ recipesResults: res.results })
      })
    }

    handleSearch(searchTerm) {
      console.log("search")
      console.log(searchTerm)
      //.props.history.push(`/search/recipes/?s=${searchTerm}`);
      window.location.href = `search/recipes/?s=${searchTerm}`;
    }
    
    componentDidMount() {
      // getAllRecipes().then(res => {
      //   //console.log(res.results)
      //   this.setState({ recipesResults: res.results })
      // })
    }
  
    render() {
  
      return (
        <div>
          <MenuBar />
          
          <div style={{ width: '100vw', marginLeft: 'auto', marginRight: 'auto', marginTop: '30vh' }}>
            <Stack gap={3} className="col-md-5 mx-auto">
              <h3 className="d-flex justify-content-center">Search for your favorite recipes </h3>
              <SearchBar placeholder={"Find a recipe"} 
                    errorMsg={"Please enter a recipe to search for!"}
                    onSubmit={this.handleSearch}
          />
            </Stack>
          </div>
        </div>
      )
    }
  
  }
  
  export default RecipeSearchPage