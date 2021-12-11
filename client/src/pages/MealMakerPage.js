/* Page to get meal recommendations and add conditions like ingredients, number of steps, time, nutrition
Different filters appear (nutrition vs ingredients/# steps/time) based on a "switch" feature -> refer to drawing
 */
import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllRecipes } from '../fetcher';


class MealMakerPage extends React.Component {

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
      window.location = `/recipes?id=${recipeId}`
    }
  
    // leagueOnChange(value) {
    //   // TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
    //   // then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
    //   getAllRecipes(null, null, value).then(res => {
    //     this.setState({ recipesResults: res.results })
    //   })
    // }
  
    render() {
  
      return (
        <div>
          <MenuBar />
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3>Meal Maker</h3>
          </div>
        </div>
      )
    }
  
  }
  
  export default MealMakerPage