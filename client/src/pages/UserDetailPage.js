/* Page to show details about user (id, contributions, ratings) 
 */
import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
  Table,
  Pagination,
  Select,
  Slider,
  Row,
  Col
} from 'antd'

import { getAllUsersReviews, getAllUsersRecipes, getUser } from '../fetcher';
import MenuBar from '../components/MenuBar';
import ReviewCard from '../components/ReviewCard';
import RecipeCard from '../components/RecipeCard';
import UserCard from '../components/UserCard';
import { resolveOnChange } from 'antd/lib/input/Input';


class UserDetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.userId,
            recipesPage: 0,
            //selectedRecipeId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
            selectedUserDetails: null,
            recipesWritten: null,
            reviewsGiven: null,
        }
        this.nextRecipePage = this.nextRecipePage.bind(this)
    }

    nextRecipePage() {
        var newPage = this.state.recipesPage + 1
        console.log(newPage)
        
        getAllUsersRecipes(this.state.id, newPage, 10).then(res => {
            console.log(res.results)
            this.setState({recipesWritten: res.results, recipesPage: newPage})
        })
    }

    
    componentDidMount() {

        Promise.all([
            getUser(this.state.id),
            getAllUsersRecipes(this.state.id, this.state.recipesPage, null),
            getAllUsersReviews(this.state.id, null, null)
        ]).then(([res1, res2, res3]) => {
            // console.log(res1)
            
            this.setState({selectedUserDetails: res1.results[0], recipesWritten: res2.results, reviewsGiven: res3.results})
        })
    }

    render() {
        return (

            <div>
                <MenuBar />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>User Details</h3>
                    {
                        this.state.selectedUserDetails ?
                        <UserCard
                            key={this.state.selectedUserDetails.id}
                            id={'user_' + this.state.selectedUserDetails.id}
                            photo={"https://raw.githubusercontent.com/18smlee/Recipe-Database-Project/main/client/src/images/person_icon.png"}
                            avgRatingReceived={this.state.selectedUserDetails.avg_rating_received}
                            avgRatingGiven={this.state.selectedUserDetails.avg_rating_given}
                            numRecipes={this.state.selectedUserDetails.num_recipes}
                            numReviews={this.state.selectedUserDetails.numReviews}
                            handler = {null}
                            /> : null
                    }
                </div>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>User Recipes</h3>
                    {
                        // console.log(this.state.recipesWritten)
                        this.state.recipesWritten ? this.state.recipesWritten.map((recipe) => (
                            <RecipeCard 
                                key={recipe.recipe_id}
                                name={recipe.name}
                                minutes={recipe.rating}
                                n_steps={recipe.steps}
                                handler = {() => {
                                    window.location = `/recipe/${recipe.recipe_id}`
                                }}
                            />
                        )) : null
                    }
                    <Button onClick={this.nextRecipePage}> More Recipes </Button>
                </div>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>User Reviews</h3>
                    {
                        // console.log(this.state.reviewsGiven)
                        this.state.reviewsGiven ? this.state.reviewsGiven.map((review) => (
                                <ReviewCard 
                                    key={review.recipe_id}
                                    date={review.date}
                                    rating={review.rating}
                                    review={review.review}
                                    handler = {() => {
                                        window.location = `/recipe/${review.recipe_id}`
                                    }}
                                />
                            )) : null
                    }
                </div>
            </div>
        )
    }
}

export default UserDetailPage