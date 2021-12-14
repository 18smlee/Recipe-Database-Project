/* Page to get meal recommendations and add conditions like ingredients, number of steps, time, nutrition
Different filters appear (nutrition vs ingredients/# steps/time) based on a "switch" feature -> refer to drawing
 */



import React from 'react';
import { Form, FormInput, FormGroup, CardHeader, CardImg, CardFooter, CardBody, CardTitle, Progress } from "shards-react";

import {
    // Table,
    Pagination,
    Select,
    // Row,
    // Col,
    Divider,
    Slider,
    Rate,
    Switch,
    Steps,
    Popover
} from 'antd';

import {
  Card,
  Row,
  Col,
  Table,
  Button
} from 'react-bootstrap'


import MenuBar from '../components/MenuBar';
import { getDailyMealPlanner, getRecipeFromIngredientSearch, findSimilarRecipe } from '../fetcher';



const { Step } = Steps
function capitalizeFirstLetters(string) {
  return string.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

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
        maxSugar: 100,
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
        recipe1SugarString: "",
        recipe2SugarString: "",
        recipe3SugarString: "",
        recipesPageNumber: 1,
        recipesPageSize: 10,
        pagination: null,
        currentStep: 0
      }
      this.goToRecipe = this.goToRecipe.bind(this)
      this.handleMaxCalorieChange = this.handleMaxCalorieChange.bind(this)
      this.handleMaxSugarChange = this.handleMaxSugarChange.bind(this)
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

    handleMaxSugarChange(value) {
      this.setState({ maxSugar: value })
    }

    searchRecipes() {
      console.log("searching")
      getDailyMealPlanner(this.state.maxCalories, this.state.maxSugar, null, null).then(res => {
        console.log("meal plan search by nutrition")
        console.log(res.results)
        console.log(res.results[0])
        const rec2Id = res.results[0].recipe2_id;
        const rec2Sugar = res.results[0].rec2sugar;
        const rec2Cals = res.results[0].rec2cals;
        findSimilarRecipe(rec2Id, rec2Cals, rec2Sugar, null, null).then(res2 => {
          console.log("meal planning 2x")
          console.log(res2.results[0])
          console.log(res2.results[1])
          var recipes = res.results
          const mealRep1 = res2.results[0]
          const mealRep2 = res2.results[1]
          var plan2json = {};
          plan2json['rec2cals'] = mealRep1.num_calories
          plan2json['rec2sugar'] = mealRep1.sugar
          plan2json['recipe1_id'] = res.results[1].recipe1_id
          plan2json['recipe1_name'] = res.results[1].recipe1_name
          plan2json['recipe2_id'] = mealRep1.id
          plan2json['recipe2_name'] = mealRep1.name
          plan2json['recipe3_id'] = res.results[1].recipe3_id
          plan2json['recipe3_name'] = res.results[1].recipe3_name
          plan2json['total_sugar'] = res.results[1].total_sugar - rec2Sugar + mealRep1.sugar
          plan2json['total_calories'] = res.results[1].total_calories - rec2Cals + mealRep1.num_calories
          var plan3json = {};
          plan3json['rec2cals'] = mealRep2.num_calories
          plan3json['rec2sugar'] = mealRep2.sugar
          plan3json['recipe1_id'] = res.results[2].recipe1_id
          plan3json['recipe1_name'] = res.results[2].recipe1_name
          plan3json['recipe2_id'] = mealRep2.id
          plan3json['recipe2_name'] = mealRep2.name
          plan3json['recipe3_id'] = res.results[2].recipe3_id
          plan3json['recipe3_name'] = res.results[2].recipe3_name
          plan3json['total_sugar'] = res.results[2].total_sugar - rec2Sugar + mealRep2.sugar
          plan3json['total_calories'] = res.results[2].total_calories - rec2Cals + mealRep2.num_calories
          recipes[1] = plan2json
          recipes[2] = plan3json
          console.log(recipes)
          var calories1String = recipes[0].total_calories + " cal";
          var calories2String = recipes[1].total_calories + " cal";
          var calories3String = recipes[2].total_calories + " cal";
          var sugar1String = recipes[0].total_sugar + "g";
          var sugar2String = recipes[1].total_sugar + "g";
          var sugar3String = recipes[2].total_sugar + "g";
          this.setState({ recipesResults: recipes })
          this.setState({ recipe1CaloriesString: calories1String})
          this.setState({ recipe2CaloriesString: calories2String})
          this.setState({ recipe3CaloriesString: calories3String})
          this.setState({ recipe1SugarString: sugar1String})
          this.setState({ recipe2SugarString: sugar2String})
          this.setState({ recipe3SugarString: sugar3String})
        })
      })
    }
  
  
    render() {
  
      return (
        <div>
          <MenuBar />
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3 class="text-center">Meal Maker</h3>
            <hr></hr>
            <p class="text-muted text-center"> Enter your preferred daily calorie intake and we will give you 3 meal plans consisting of 3 different recipes you can try!</p>
          </div>
          <Form style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <div className="container search">
            <Row>
              <Col flex={2}>
                <FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                  <label>Max Calories</label>
                  <Slider defaultValue={2000} min={1400} max={3200} step={10} onChange={this.handleMaxCalorieChange} />
                  <label>Max Sugar</label>
                  <Slider defaultValue={30} min={0} max={200} step={10} onChange={this.handleMaxSugarChange} />
                </FormGroup>
              </Col>
            </Row>
            {/* <Row justify="center">  */}
              <Button className="d-block mx-auto" style={{ marginTop: '2vh'}} onClick={this.searchRecipes}>Make My Meal Plan!</Button>
            {/* </Row> */}
            </div>
          </Form>
          <Divider />
          {this.state.recipesResults.length > 0 ? (
          <div>
            <div style={{margin: "50px"}}>
              
              <Table bordered>
                  <thead justify="center">
                    <tr>
                      <th style={{width: "33.33%"}} class="text-center">
                        <h3 style={{margin:"10px"}}>Meal Plan A</h3>
                        <p class="fw-light">Total Cal: {this.state.recipe1CaloriesString}</p>
                        <p class="fw-light">Total Sugar: {this.state.recipe1SugarString}</p>
                      </th>
                      <th style={{width: "33.33%"}} class="text-center">
                        <h3 style={{margin:"10px"}}>Meal Plan B</h3>
                        <p class="fw-light">Total Cal: {this.state.recipe2CaloriesString}</p>
                        <p class="fw-light">Total Sugar: {this.state.recipe2SugarString}</p>
                      </th>
                      <th style={{width: "33.33%"}} class="text-center">
                        <h3 style={{margin:"10px"}}>Meal Plan C</h3>
                        <p class="fw-light">Total Cal: {this.state.recipe3CaloriesString}</p>
                        <p class="fw-light">Total Sugar: {this.state.recipe3SugarString}</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center" onClick={()=>window.location = `/recipe/${this.state.recipesResults[0].recipe1_id}`}>
                        <h6>1. {capitalizeFirstLetters(this.state.recipesResults[0].recipe1_name)}</h6>
                      </td>
                      <td class="text-center" onClick={()=>window.location = `/recipe/${this.state.recipesResults[1].recipe1_id}`}>
                        <h6>1. {capitalizeFirstLetters(this.state.recipesResults[1].recipe1_name)}</h6>
                      </td>
                      <td class="text-center" onClick={()=>window.location = `/recipe/${this.state.recipesResults[2].recipe1_id}`}>
                        <h6>1. {capitalizeFirstLetters(this.state.recipesResults[2].recipe1_name)}</h6>
                      </td>
                    </tr>
                    <tr>
                    <td class="text-center" onClick={()=>window.location = `/recipe/${this.state.recipesResults[0].recipe2_id}`}>
                        <h6>2. {capitalizeFirstLetters(this.state.recipesResults[0].recipe2_name)}</h6>
                      </td>
                      <td class="text-center" onClick={()=>window.location = `/recipe/${this.state.recipesResults[1].recipe2_id}`}>
                        <h6>2. {capitalizeFirstLetters(this.state.recipesResults[1].recipe2_name)}</h6>
                      </td>
                      <td class="text-center" onClick={()=>window.location = `/recipe/${this.state.recipesResults[2].recipe2_id}`}>
                        <h6>2. {capitalizeFirstLetters(this.state.recipesResults[2].recipe2_name)}</h6>
                      </td>
                    </tr>
                    <tr>
                    <td class="text-center" onClick={()=>window.location = `/recipe/${this.state.recipesResults[0].recipe3_id}`}>
                        <h6>3. {capitalizeFirstLetters(this.state.recipesResults[0].recipe3_name)}</h6>
                      </td>
                      <td class="text-center" onClick={()=>window.location = `/recipe/${this.state.recipesResults[1].recipe3_id}`}>
                        <h6>3. {capitalizeFirstLetters(this.state.recipesResults[1].recipe3_name)}</h6>
                      </td>
                      <td class="text-center" onClick={()=>window.location = `/recipe/${this.state.recipesResults[2].recipe3_id}`}>
                        <h6>3. {capitalizeFirstLetters(this.state.recipesResults[2].recipe3_name)}</h6>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
          </div>
          ) : <></>}
        </div>
      )
    }
  
  }
  
  export default MealMakerPage
