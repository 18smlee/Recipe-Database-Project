/* Page to search recipe by name. Clicking on recipe will lead to a single search bar, 
which will lead to recipe details page where users can re-search and add filters
*/
import React from 'react';

import { Form, FormInput, FormGroup, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Switch,
    Rate 
} from 'antd'

import {
  Button
} from 'react-bootstrap'

import MenuBar from '../components/MenuBar';
import RecipeCard from '../components/RecipeCard.js';
import RecipeCardList from '../components/RecipeCardList';
import SearchBar from '../components/SearchBar';
// import Button from 'react-bootstrap/Button';

import rocket_taco from '../images/rocket_taco.gif';
import { getAllRecipes, getRecipeFromNameSearch, getRecipeFromTraitSearch, getRecipeFromIngredientSearch} from '../fetcher';
import queryString from 'query-string';

class RecipeResultPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        recipesResults: [],
        searched: false,
        recipesPageNumber: 0,
        recipeSearchText: "",
        recipesPageSize: 10,
        pagination: null, 
        ingredientOn: true,
        showResults: false,

        // ingredients
        ingredient1: "",
        ingredient2: "",
        ingredient3: "",

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
      this.handleToggleChange = this.handleToggleChange.bind(this)
      this.handleIngredient1Change = this.handleIngredient1Change.bind(this)
      this.handleIngredient2Change = this.handleIngredient2Change.bind(this)
      this.handleIngredient3Change = this.handleIngredient3Change.bind(this)
      this.nextPage = this.nextPage.bind(this)
      // this.handleSearch = this.handleSearch.bind(this);
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

    handleToggleChange() {
      this.setState({ ingredientOn: !this.state.ingredientOn})
      this.setState({ recipesResults: [] })
      this.setState({ searched : false })
    }

    handleIngredient1Change(event) {
      this.setState({ ingredient1: event.target.value })
    }

    handleIngredient2Change(event) {
      this.setState({ ingredient2: event.target.value })
    }

    handleIngredient3Change(event) {
      this.setState({ ingredient3: event.target.value })
    }

    updateSearchResults() {
      if (this.state.ingredientOn) {
        if (this.state.ingredient1 == '' && this.state.ingredient2 == '' && this.state.ingredient3 == '') {
          alert('Please fill out Ingredient 1 at the very least')
        } else {
          var tempIngr2 = this.state.ingredient2;
          var tempIngr3 = this.state.ingredient3;
          if (tempIngr2 == '') {
            tempIngr2 = null;
          }
          if (tempIngr3 == '') {
            tempIngr3 = null;
          }
          getRecipeFromIngredientSearch(this.state.ingredient1, tempIngr2, tempIngr3, this.state.recipesPageNumbeer, this.state.recipesPageSize)
          .then(res => {
            console.log(res.results)
            this.setState({ recipesResults: res.results })
            this.setState({ recipesPageNumber: 0 })
          })
        }
      } else {
        // call getRecipesFromTraitsSearch and update recipesResults in state
        console.log("search name: " + this.state.nameQuery)
        console.log("min steps: " + this.state.minNumStepsQuery)
        console.log("max steps: " + this.state.maxNumStepsQuery)
        console.log("min time: " + this.state.minTimeToCookQuery)
        console.log("max time: " + this.state.maxTimeToCookQuery)
        console.log("min rate: " + this.state.minAvgRatingQuery)
        console.log("max rate: " + this.state.maxAvgRatingQuery)
        this.setState({ searched: true })
        getRecipeFromTraitSearch(this.state.nameQuery, this.state.minTimeToCookQuery, this.state.maxTimeToCookQuery, this.state.minNumStepsQuery, this.state.maxNumStepsQuery, this.state.minAvgRatingQuery, this.state.maxAvgRatingQuery, this.state.recipesPageNumber, this.state.recipesPageSize).then(res => {
          console.log(res.results)
          this.setState({ recipesResults: res.results })
          this.setState({ recipesPageNumber: 0 })
        })
      }
    }

    nextPage() {
      var newPage = this.state.recipesPageNumber + 1
      console.log(newPage)



      if (this.state.ingredientOn) {
        if (this.state.ingredient1 == '') {
          alert('Please fill out Ingredient 1 at the very least')
        } else {
          var tempIngr2 = this.state.ingredient2;
          var tempIngr3 = this.state.ingredient3;
          if (tempIngr2 == '') {
            tempIngr2 = null;
          }
          if (tempIngr3 == '') {
            tempIngr3 = null;
          }
          getRecipeFromIngredientSearch(this.state.ingredient1, tempIngr2, tempIngr3, this.state.recipesPageNumbeer, this.state.recipesPageSize)
          .then(res => {
            console.log(res.results)
            this.setState({ recipesResults: res.results })
            this.setState({ recipesPageNumber: this.state.recipesPageNumber + 1 })
          })
        }
      } else {
        // call getRecipesFromTraitsSearch and update recipesResults in state
        this.setState({ searched: true })
        getRecipeFromTraitSearch(this.state.nameQuery, this.state.minTimeToCookQuery, this.state.maxTimeToCookQuery, this.state.minNumStepsQuery, this.state.maxNumStepsQuery, this.state.minAvgRatingQuery, this.state.maxAvgRatingQuery, this.state.recipesPageNumber, this.state.recipesPageSize).then(res => {
          console.log(res.results)
          this.setState({ recipesResults: res.results })
          this.setState({ recipesPageNumber: this.state.recipesPageNumber + 1})
        })
      }
    }

    componentDidMount() {
      this.setState({ recipesPageNumber: this.state.recipesPageNumber + 1 })
      // getRecipeFromTraitSearch(this.state.nameQuery, this.state.minNumStepsQuery, this.state.maxNumStepsQuery, this.state.minTimeToCookQuery, this.state.maxTimeToCookQuery, this.state.minAvgRatingQuery, this.state.maxAvgRatingQuery, null, null).then(res => {
      //   this.setState({ recipesResults: res.results })
      // })
    }
  
    render() {
  
      return (
        <div>
          <MenuBar />
          <Form style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3 class="text-center">Discover New Recipes</h3>
            <hr></hr>
            <p class="text-muted text-center">Search for new recipes by ingredients, or keywords and other recipe attributes. Our database has over 15,000 recipes to choose from!</p>
          </div>

            <Row justify="center">
              <Switch checkedChildren="Search by Ingredient" unCheckedChildren="Search by Recipe" onChange={this.handleToggleChange}
            />
          </Row>
          {this.state.ingredientOn == true ? (
            <Form style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <div className="container search">
            <Row>
                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                  <FormInput placeholder="Ingredient 1" value={this.state.ingredient1} onChange={this.handleIngredient1Change} />
                  </FormGroup>
                </Col>
                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                  <FormInput placeholder="Ingredient 2" value={this.state.ingredient2} onChange={this.handleIngredient2Change} />
                  </FormGroup>
                </Col>
                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                  <FormInput placeholder="Ingredient 3" value={this.state.ingredient3} onChange={this.handleIngredient3Change} />
                  </FormGroup>
                </Col>
              </Row>
              <Row justify="center"> 
                <Button block style={{ marginTop: '2vh', span: "40px" }} onClick={this.updateSearchResults}>Search</Button>
              </Row>
            </div>
            </Form>
          ) : (
            <Form>
              <br></br>
            <Row>
              <Col className="d-flex align-items-center justify-content-center" flex={2}>
                <FormGroup style={{ width: '30vw' }}>
                    <label style={{marginBottom:"10px"}}>Search by Keyword</label>
                    <FormInput placeholder="Enter a keyword" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                </FormGroup>
              </Col>
              <Col>
                <Row>
                  <Col flex={2}>
                    <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Number of Steps</label>
                        <Slider range defaultValue={[0, 100]} max={100} onChange={this.handleNumStepsChange} />
                    </FormGroup>
                  </Col> 
                </Row>
                <Row>
                  <Col flex={2}>
                    <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Time to Cook</label>
                        <Slider range defaultValue={[0, 500]} max={500} onChange={this.handleTimeToCookChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col flex={2}>
                        <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Average Rating</label>
                            <Slider range defaultValue={[0, 5]} max={5} onChange={this.handleAvgRatingChange} />
                        </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="center">
              <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
            </Row>
            </Form>
          )}
          </Form>
            <Divider />
            <div style={{ width: "70%", marginBottom: "50px" , marginLeft: "200px"}}>
            {(this.state.searched && (!this.state.recipesResults || this.state.recipesResults.length < 1)) ? (
              // happens when the list is super long... so made it a "loading" rather than "no matches found"
                     <>
                     <Row justify="center">
                     <img
                        alt=""
                        src={rocket_taco}
                        width="100"
                        height="100"
                        className="align-top"
                    />{' '}
                     </Row>
                     <Row justify="center">
                     <p class="text-muted">Warming up your meal...</p>
                     </Row>
                     </>)
                :
                this.state.recipesResults.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    name = {recipe.name}
                    contributor_id = {recipe.contributor_id}
                    n_steps = {recipe.n_steps}
                    minutes = {recipe.minutes}
                    submitted = {recipe.submitted}
                    handler = {() => {
                      window.location = `/recipe/${recipe.id}`
                    }}
                    />
                ))

              }
            </div>

            {(this.state.searched) ? (<div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <Button style={{marginBottom: "50px"}} variant='outline-secondary' onClick={this.nextPage}> More Results </Button>
          </div>
          </div> ) : ( <> </>)
            
          }

        </div>
      )
    }
  
  }
  
  export default RecipeResultPage