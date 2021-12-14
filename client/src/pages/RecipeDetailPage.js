/* Page to show details about recipe (ingredients, name, steps, reviews(?))
Button to click that will show chopped episode likelihood in a modal 
 */
import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import { getRecipe } from '../fetcher';
import MenuBar from '../components/MenuBar';


class RecipeDetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRecipeId: window.location.pathname.split('/')[2],
            selectedRecipeDetails: null,

        }
    }

    componentDidMount() {
        console.log(this.state.selectedRecipeId)
        getRecipe(this.state.selectedRecipeId).then(res => {
            console.log(res.results)
            this.setState({ selectedRecipeDetails: res.results[0]})
        })
    }

    render() {
        return (

            <div>
                <MenuBar />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>Recipe Details</h3>
                </div>
            </div>
        )
    }
}

export default RecipeDetailPage