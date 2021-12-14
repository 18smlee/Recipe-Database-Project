/* Page to get meal recommendations and add conditions like ingredients, number of steps, time, nutrition
Different filters appear (nutrition vs ingredients/# steps/time) based on a "switch" feature -> refer to drawing
 */
import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardHeader, CardImg, CardFooter, CardBody, CardTitle, Progress } from "shards-react";

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
        maxCalories: 2000,
        ingredient1: "",
        ingredient2: "",
        ingredient3: "",
        recipesResults: [],
        recipe1Name: "",
        recipe2Name: "",
        recipe3Name: "",
        recipe1CaloriesString: "",
        recipe2CaloriesString: "",
        recipe3CaloriesString: "",
        recipesPageNumber: 1,
        recipesPageSize: 10,
        pagination: null,
        currentStep: 0
      }
      this.goToRecipe = this.goToRecipe.bind(this)
      this.handleMaxCalorieChange = this.handleMaxCalorieChange.bind(this)
      this.searchRecipes = this.searchRecipes.bind(this)
    }
  
    goToRecipe(recipeId) {
      window.location = `/recipes?id=${recipeId}`
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
      getDailyMealPlanner(this.state.maxCalories, null, null).then(res => {
        console.log("meal plan search by nutrition")
        var calories1String = res.results[0].total_calories + " calories";
        var calories2String = res.results[1].total_calories + " calories";
        var calories3String = res.results[2].total_calories + " calories";
        console.log(res.results)
        this.setState({ recipesResults: res.results })
        this.setState({ recipe1CaloriesString: calories1String})
        this.setState({ recipe2CaloriesString: calories2String})
        this.setState({ recipe3CaloriesString: calories3String})

      })
    }
  
  
    render() {
  
      return (
        <div>
          <MenuBar />
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3>Meal Maker</h3>
          </div>
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
          <Divider />
          {this.state.recipesResults.length > 0 ? (
          <div>
          
          <Divider />
          <Row justify="space-around">
            <Col> Meal Plan 1</Col>
            <Col> Meal Plan 2</Col>
            <Col> Meal Plan 3</Col>
          </Row>
          <Row justify="space-around"> 
            <Col >
              <div style={{paddingLeft:"20px"}}>
                <Card>
                  <CardHeader>Meal 1</CardHeader>
                  <CardBody>
                    <CardTitle>{this.state.recipesResults[0].recipe1_name}</CardTitle>
                    <Button onClick={()=>window.location = `/recipe/${this.state.recipesResults[0].recipe1_id}`}>Go to Recipe &rarr;</Button>
                  </CardBody>
                </Card>
                </div>
              </Col>
              <Col>
              <div style={{paddingLeft:"20px"}}>
                <Card>
                  <CardHeader>Meal 1</CardHeader>
                  <CardBody>
                    <CardTitle>{this.state.recipesResults[1].recipe1_name}</CardTitle>
                    <Button onClick={()=>window.location = `/recipe/${this.state.recipesResults[1].recipe1_id}`}>Go to Recipe &rarr;</Button>
                  </CardBody>
                </Card>
                </div>
              </Col>
              <Col>
                <div style={{paddingLeft:"20px"}}>
                <Card>
                  <CardHeader>Meal 1</CardHeader>
                  <CardBody>
                    <CardTitle>{this.state.recipesResults[2].recipe1_name}</CardTitle>
                    <Button onClick={()=>window.location = `/recipe/${this.state.recipesResults[2].recipe1_id}`}>Go to Recipe &rarr;</Button>
                  </CardBody>
                </Card>
                </div>
              </Col>
          </Row>
          <br></br>
          <Row justify="space-around"> 
              <Col>
                <div style={{paddingLeft:"20px"}}>
                <Card>
                  <CardHeader>Meal 2</CardHeader>
                  <CardBody>
                    <CardTitle>{this.state.recipesResults[0].recipe2_name}</CardTitle>
                    <Button onClick={()=>window.location = `/recipe/${this.state.recipesResults[0].recipe2_id}`}>Go to Recipe &rarr;</Button>
                  </CardBody>
                </Card>
                </div>
              </Col>
              <Col>
                <div style={{paddingLeft:"20px"}}>
                <Card>
                  <CardHeader>Meal 2</CardHeader>
                  <CardBody>
                    <CardTitle>{this.state.recipesResults[1].recipe2_name}</CardTitle>
                    <Button onClick={()=>window.location = `/recipe/${this.state.recipesResults[1].recipe2_id}`}>Go to Recipe &rarr;</Button>
                  </CardBody>
                </Card>
                </div>
              </Col>
              <Col>
                <div style={{paddingLeft:"20px"}}>
                <Card>
                  <CardHeader>Meal 2</CardHeader>
                  <CardBody>
                    <CardTitle>{this.state.recipesResults[2].recipe2_name}</CardTitle>
                    <Button onClick={()=>window.location = `/recipe/${this.state.recipesResults[2].recipe2_id}`}>Go to Recipe &rarr;</Button>
                  </CardBody>
                </Card>
                </div>
              </Col>
          </Row>
          <br></br>
          <Row justify="space-around"> 
              <Col className="gutter-row" span={6}>
                <div style={{paddingLeft:"20px"}}>
                <Card>
                  <CardHeader>Meal 3</CardHeader>
                  <CardBody>
                    <CardTitle>{this.state.recipesResults[0].recipe3_name}</CardTitle>
                    <Button onClick={()=>window.location = `/recipe/${this.state.recipesResults[0].recipe3_id}`}>Go to Recipe &rarr;</Button>
                  </CardBody>
                </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={{paddingLeft:"20px"}}>
                <Card>
                  <CardHeader>Meal 3</CardHeader>
                  <CardBody>
                    <CardTitle>{this.state.recipesResults[1].recipe3_name}</CardTitle>
                    <Button onClick={()=>window.location = `/recipe/${this.state.recipesResults[1].recipe3_id}`}>Go to Recipe &rarr;</Button>
                  </CardBody>
                </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={{paddingLeft:"20px"}}>
                <Card>
                  <CardHeader>Meal 3</CardHeader>
                  <CardBody>
                    <CardTitle>{this.state.recipesResults[2].recipe3_name}</CardTitle>
                    <Button onClick={()=>window.location = `/recipe/${this.state.recipesResults[2].recipe3_id}`}>Go to Recipe &rarr;</Button>
                  </CardBody>
                </Card>
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
