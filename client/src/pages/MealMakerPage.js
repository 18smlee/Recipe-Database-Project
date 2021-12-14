/* Page to get meal recommendations and add conditions like ingredients, number of steps, time, nutrition
Different filters appear (nutrition vs ingredients/# steps/time) based on a "switch" feature -> refer to drawing
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
    Rate,
    Switch,
    Steps,
    Popover
} from 'antd';


import MenuBar from '../components/MenuBar';
import { getDailyMealPlanner, getRecipeFromIngredientSearch } from '../fetcher';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

const { Step } = Steps

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

class MealMakerPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        showResults: false,
        nutritionOn: false,
        maxCalories: 0,
        ingredient1: "",
        ingredient2: "",
        ingredient3: "",
        recipesResults: [],
        recipesPageNumber: 1,
        recipesPageSize: 10,
        pagination: null,
        currentStep: 0
      }
      this.goToRecipe = this.goToRecipe.bind(this)
      this.handleToggleChange = this.handleToggleChange.bind(this)
      this.handleMaxCalorieChange = this.handleMaxCalorieChange.bind(this)
      this.handleIngredient1Change = this.handleIngredient1Change.bind(this)
      this.handleIngredient2Change = this.handleIngredient2Change.bind(this)
      this.handleIngredient3Change = this.handleIngredient3Change.bind(this)
      this.searchRecipes = this.searchRecipes.bind(this)
    }
  
    goToRecipe(recipeId) {
      window.location = `/recipes?id=${recipeId}`
    }

    handleToggleChange() {
      this.setState({ nutritionOn: !this.state.nutritionOn})
      this.setState({ recipesResults: [] })
    }

    handleMaxCalorieChange(value) {
      this.setState({ maxCalories: value })
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

    searchRecipes() {
      console.log("searching")
      if (this.state.nutritionOn) {
        getDailyMealPlanner(this.state.maxCalories, null, null).then(res => {
          console.log("meal plan search by nutrition")
          console.log(res.results)
          this.setState({ recipesResults: res.results })
          })
      } else {
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
          getRecipeFromIngredientSearch(this.state.ingredient1, tempIngr2, tempIngr3, null, null)
          .then(res => {
            console.log(res.results)
            this.setState({ recipesResults: res.results })
          })
        }
      }
    }
  
  
    render() {
  
      return (
        <div>
          <MenuBar />
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3>Meal Maker</h3>
          </div>
          <Row justify="center">
            <Switch checkedChildren="Search by Nutrition" unCheckedChildren="Search by Ingredients" onChange={this.handleToggleChange}
            />
          </Row>
          {this.state.nutritionOn == true ? (
          <Form style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <div className="container search">
            <Row>
              <Col flex={2}>
                <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                  <label>Max Calories</label>
                  <Slider defaultValue={2000} min={1400} max={3200} step={10} onChange={this.handleMaxCalorieChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row justify="center"> 
              <Button style={{ marginTop: '2vh' }} onClick={this.searchRecipes}>Make My Meal Plan!</Button>
            </Row>
            </div>
          </Form>
          ) : 
          (
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
                <Button block style={{ marginTop: '2vh', span: "40px" }} onClick={this.searchRecipes}>Find me meals I can make!</Button>
              </Row>
            </div>
            </Form>
          )}
          <Divider />
          {this.state.recipesResults.length > 0 ? (
          <div>
          <Steps current={2} progressDot={customDot}>
            <Step title="Meal Plan 1" description="This is a description." />
            <Step title="Meal Plan 2" description="This is a description." />
            <Step title="Meal Plan 3" description="This is a description." />
          </Steps>
          <Divider />
          <Row> 
              <Col flex={2} offset={0}>
                <div style={{paddingLeft:"20px"}}>
                  
                </div>
              </Col>
              <Col flex={2} offset={8}>
                <div style={{paddingLeft:"20px"}}>

                </div>
              </Col>
              <Col flex={2} offset={8}>
                <div style={{paddingLeft:"20px"}}>

                </div>
              </Col>
          </Row>
          </div>
          ) : <></>}
        </div>
      )
    }
  
  }
  
  export default MealMakerPage
