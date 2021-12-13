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
import RecipeCardList from '../components/RecipeCardList';
import SearchBar from '../components/SearchBar';
import Button from 'react-bootstrap/Button';

import { getAllRecipes, getRecipeFromNameSearch } from '../fetcher';
import queryString from 'query-string';

class RecipeResultPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        recipesResults: [],
        recipesPageNumber: 1,
        recipeSearchText: "",
        recipesPageSize: 10,
        pagination: null  
      }
      this.goToRecipe = this.goToRecipe.bind(this)
    }
  
    goToRecipe(recipeId) {
      window.location = `/recipe?id=${recipeId}`
    }
    
    componentDidMount() {
      let params = queryString.parse(window.location.search)
      this.setState({ recipeSearchText: params.s})
      getRecipeFromNameSearch(params.s, null, null).then(res => {
        console.log(res.results)
        this.setState({ recipesResults: res.results })
      })
    }
  
    render() {
  
      return (
        <div>
          <MenuBar />
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <div className="container search">
              <SearchBar />
              <RecipeCardList results={this.state.recipesResults}/>
            </div>
          </div>
        </div>
      )
    }
  
  }
  
  export default RecipeResultPage