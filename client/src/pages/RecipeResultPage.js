/* Page to search recipe by name. Clicking on recipe will lead to a single search bar, 
which will lead to recipe details page where users can re-search and add filters
*/
import React from 'react';

import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate 
} from 'antd'

import MenuBar from '../components/MenuBar';
import RecipeCard from '../components/RecipeCard.js';
import RecipeCardList from '../components/RecipeCardList';
import SearchBar from '../components/SearchBar';
// import Button from 'react-bootstrap/Button';

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
      this.handleSearch = this.handleSearch.bind(this);
    }
  
    goToRecipe(recipeId) {
      window.location = `/recipe?id=${recipeId}`
    }

    displaySearchResults() {
      getAllRecipes().then(res => {
        this.setState({ recipesResults: res.results })
        console.log("none")
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

    handleSearch(searchTerm) {
      console.log("search")
      console.log(searchTerm)
      this.setState({ nameQuery: searchTerm })
      
      // fix url
    }

    updateSearchResults() {
      console.log("update search")
      // call getRecipesFromTraitsSearch and update recipesResults in state
      getRecipeFromTraitSearch(this.state.nameQuery, this.state.minNumStepsQuery, this.state.maxNumStepsQuery, this.state.minTimeToCookQuery, this.state.maxTimeToCookQuery, this.state.minAvgRatingQuery, this.state.maxAvgRatingQuery, null, null).then(res => {
          console.log("length: " + res.results.length)
          this.setState({ recipesResults: res.results })
      })
      if (this.state.recipesResults.length < 1) {
        console.log('no results')
      }
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
          <Form style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h1>Find a Recipe!</h1>

            <div className="container search">
            {/* <SearchBar placeholder={"Find recipes"}
            errorMsg={"Please enter a recipe to search for!"}
            onSubmit={this.handleSearch}
            /> */}
            <Row>
              <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                <label>Name</label>
                <FormInput placeholder="Name" value={this.state.nameQuery} onChange={this.handleNameChange} />
                </FormGroup>
              </Col>
            </Row>
            <br></br>
            <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Number of Steps</label>
                            <Slider range defaultValue={[0, 500]} max={500} onChange={this.handleNumStepsChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Time to Cook</label>
                            <Slider range defaultValue={[0, 500]} max={500} onChange={this.handleTimeToCookChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Average Rating</label>
                            <Slider range defaultValue={[0, 5]} max={5} onChange={this.handleAvgRatingChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
            </div>
            </Form>
            <Divider />
            <div style={{ width: "70%", marginBottom: "50px" , marginLeft: "200px"}}>
            {(!this.state.recipesResults || this.state.recipesResults.length < 1) ? (
              // happens when the list is super long... so made it a "loading" rather than "no matches found"
                     <>Warming up your meal...</>)
                :
                this.state.recipesResults.map((recipe) => (
                  <RecipeCard
                    key={recipe.recipeId}
                    name = {recipe.name}
                    contributor_id = {recipe.contributor_id}
                    n_steps = {recipe.n_steps}
                    minutes = {recipe.minutes}/>
                ))

              }
            </div>

          </div>
      )
    }
  
  }
  
  export default RecipeResultPage