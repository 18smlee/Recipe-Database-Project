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
        maxNumStepsQuery: 500,
        minTimeToCookQuery: 0,
        maxTimeToCookQuery: 500,
        minAvgRatingQuery: 0,
        maxAvgRatingQuery: 5,
        selectedRecipeId: window.location.search,
        selectedRecipeDetails: null,

      }
      this.updateSearchResults = this.updateSearchResults.bind(this)
      this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
      this.handleNumStepsChange = this.handleNumStepsChange.bind(this)
      this.handleTimeToCookChange = this.handleTimeToCookChange.bind(this)
      this.handleAvgRatingChange = this.handleAvgRatingChange.bind(this)
      this.goToRecipe = this.goToRecipe.bind(this)
      // this.handleSearch = this.handleSearch.bind(this);
    }
  
    goToRecipe(recipeId) {
      window.location = `/recipe?id=${recipeId}`
    }

    displaySearchResults() {
      getAllRecipes().then(res => {
        this.setState({ recipesResults: res.results })
      })
    }

    handleNameQueryChange(event) {
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
      // call getRecipesFromTraitsSearch and update recipesResults in state
      console.log("search name: " + this.state.nameQuery)
      console.log("min steps: " + this.state.minNumStepsQuery)
      console.log("max steps: " + this.state.maxNumStepsQuery)
      console.log("min time: " + this.state.minTimeToCookQuery)
      console.log("max time: " + this.state.maxTimeToCookQuery)
      console.log("min rate: " + this.state.minAvgRatingQuery)
      console.log("max rate: " + this.state.maxAvgRatingQuery)
      getRecipeFromTraitSearch(this.state.nameQuery, this.state.minTimeToCookQuery, this.state.maxTimeToCookQuery, this.state.minNumStepsQuery, this.state.maxNumStepsQuery, this.state.minAvgRatingQuery, this.state.maxAvgRatingQuery, null, null).then(res => {
        console.log(res.results)
        this.setState({ recipesResults: res.results })
      })
    }

    componentDidMount() {
      // getRecipeFromTraitSearch(this.state.nameQuery, this.state.minNumStepsQuery, this.state.maxNumStepsQuery, this.state.minTimeToCookQuery, this.state.maxTimeToCookQuery, this.state.minAvgRatingQuery, this.state.maxAvgRatingQuery, null, null).then(res => {
      //   this.setState({ recipesResults: res.results })
      // })
    }
  
    render() {
  
      return (
        <div>
          <MenuBar />
          <Form style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h1>Find a Recipe!</h1>

            {/* <div className="container search"> */}
            <Row>
            <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Search by Keyword</label>
                            <FormInput placeholder="Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                        </FormGroup></Col>
            </Row>
            <br></br>
            <br></br>
                <Row>
                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Number of Steps</label>
                            <Slider range defaultValue={[0, 100]} max={100} onChange={this.handleNumStepsChange} />
                        </FormGroup></Col> 
                </Row>

                <Row>
                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Time to Cook</label>
                            <Slider range defaultValue={[0, 500]} max={500} onChange={this.handleTimeToCookChange} />
                        </FormGroup></Col>
                </Row>

                <Row>
                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Average Rating</label>
                            <Slider range defaultValue={[0, 5]} max={5} onChange={this.handleAvgRatingChange} />
                        </FormGroup></Col>
                </Row>

                <Row>
                <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                </Row>
            </Form>
            <Divider />
            <div style={{ width: "70%", marginBottom: "50px" , marginLeft: "200px"}}>
            {(!this.state.recipesResults || this.state.recipesResults.length < 1) ? (
              // happens when the list is super long... so made it a "loading" rather than "no matches found"
                     <>Warming up your meal...</>)
                :
                this.state.recipesResults.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    name = {recipe.name}
                    contributor_id = {recipe.contributor_id}
                    n_steps = {recipe.n_steps}
                    minutes = {recipe.minutes}/>
                )
                )
              }
            </div>

        </div>
      )
    }
  
  }
  
  export default RecipeResultPage