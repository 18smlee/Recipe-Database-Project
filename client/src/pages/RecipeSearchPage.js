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

import { getAllRecipes } from '../fetcher';

class RecipeSearchPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        recipesResults: [],
        recipesPageNumber: 1,
        recipesPageSize: 10,
        pagination: null  
      }
      this.goToRecipe = this.goToRecipe.bind(this)
    }
  
  
    goToRecipe(recipeId) {
      window.location = `/recipe?id=${recipeId}`
    }

    displaySearchResults() {
      getAllRecipes().then(res => {
        this.setState({ recipesResults: res.results })
      })
    }
    
    componentDidMount() {
      getAllRecipes().then(res => {
        console.log(res.results)
        this.setState({ recipesResults: res.results })
      })
    }
  
    render() {
  
      return (
        <div>
          <MenuBar />
          
          <div style={{ width: '100vw', marginLeft: 'auto', marginRight: 'auto', marginTop: '30vh' }}>
            <Stack gap={3} className="col-md-5 mx-auto">
              <h3 class="d-flex justify-content-center">Search for your favorite recipes </h3>
              <SearchBar onSearch={getAllRecipes()}/>
            </Stack>
          </div>
        </div>
      )
    }
  
  }
  
  export default RecipeSearchPage