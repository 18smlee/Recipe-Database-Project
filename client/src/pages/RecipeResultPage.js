/* Page to search recipe by name. Clicking on recipe will lead to a single search bar, 
which will lead to recipe details page where users can re-search and add filters
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

import { getAllRecipes, getRecipeFromNameSearch, getRecipeFromTraitSearch} from '../fetcher';
import queryString from 'query-string';

class RecipeResultPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        recipesResults: [],
        recipesPageNumber: 1,
        recipeSearchText: "",
        recipesPageSize: 10,
        pagination: null, 

        // traits
        nameQuery: '',
        minNumStepsQuery: 0,
        maxNumStepsQuery: 9999999,
        minTimeToCookQuery: 0,
        maxTimeToCookQuery: 9999999,
        minAvgRatingQuery: 0,
        maxAvgRatingQuery: 5,
        selectedRecipeId: window.location.search,
        selectedRecipeDetails: null,

      }
      this.updateSearchResults = this.updateSearchResults.bind(this)
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleNumStepsChange = this.handleNumStepsChange.bind(this)
      this.handleTimeToCookChange = this.handleTimeToCookChange.bind(this)
      this.handleAvgRatingChange = this.handleAvgRatingChange.bind(this)
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

    handleNameChange(event) {
      this.setState({ nameQuery: event.target.value })
    }

    handleNumStepsChange(value) {
      this.setState({ minNumStepsQuery: value[0] })
      this.setState({ maxNumStepsQuery: value[1] })
    }

    handleTimeToCookChange(value) {
      this.setState({ minTimeToCookQuery: value[0] })
      this.setState({ maxTimeToCookQuery: value[1] })
    }
    
    handleAvgRatingChange(value) {
      this.setState({ minAvgRatingQuery: value[0] })
      this.setState({ maxAvgRatingQuery: value[1] })
    }

    updateSearchResults() {
      console.log("update search")
      // call getRecipesFromTraitsSearch and update recipesResults in state
      getRecipeFromTraitSearch(this.state.nameQuery, this.state.minNumStepsQuery, this.state.maxNumStepsQuery, this.state.minTimeToCookQuery, this.state.maxTimeToCookQuery, this.state.minAvgRatingQuery, this.state.maxAvgRatingQuery, null, null).then(res => {
          console.log(res.results)
          this.setState({ recipesResults: res.results })
      })
    }

    componentDidMount() {
      let params = queryString.parse(window.location.search)
      this.setState({ nameQuery: params.s})
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
            <SearchBar placeholder={"Find recipes"}
            errorMsg={"Please enter a recipe to search for!"}
            onSubmit={this.props.history.push(`/search/recipes/?s=${text}`)}
            />
              <RecipeCardList results={this.state.recipesResults}/>
            </div>
          </div>
        </div>
      )
    }
  
  }
  
  export default RecipeResultPage