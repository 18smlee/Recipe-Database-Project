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
import { getAllRecipes } from '../fetcher';

class RecipesPage extends React.Component {

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
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3>Recipes </h3>
          </div>
        </div>
      )
    }
  
  }
  
  export default RecipesPage