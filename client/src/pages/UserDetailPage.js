/* Page to show details about user (id, contributions, ratings) 
 */
import React from 'react';
import { Form, FormInput, FormGroup, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
  Table,
  Pagination,
  Select,
  Slider,
  Row,
  Col
} from 'antd'
import {
    Button
} from "react-bootstrap"

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
            recipesPage: 1,
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
            getAllUsersRecipes(this.state.id, this.state.recipesPage, 10),
            getAllUsersReviews(this.state.id, null, null)
        ]).then(([res1, res2, res3]) => {
            console.log(res2)
            
            this.setState({selectedUserDetails: res1.results[0], recipesWritten: res2.results, reviewsGiven: res3.results})
        })
    }

    render() {
        return (

            <div>
                <MenuBar />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    {
                        this.state.selectedUserDetails ?
                        <UserCard
                            key={this.state.selectedUserDetails.id}
                            id={'user_' + this.state.selectedUserDetails.id}
                            photo={"https://raw.githubusercontent.com/18smlee/Recipe-Database-Project/main/client/src/images/person_icon.png"}
                            avgRatingReceived={this.state.selectedUserDetails.avg_rating_received}
                            avgRatingGiven={this.state.selectedUserDetails.avg_rating_given}
                            numRecipes={this.state.selectedUserDetails.num_recipes}
                            numReviews={this.state.selectedUserDetails.num_reviews}
                            handler = {null}
                            /> : null
                    }
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h4>Recipes by @user_{this.state.id}</h4>
                    {
                        // console.log(this.state.recipesWritten)
                        this.state.recipesWritten ? this.state.recipesWritten.map((recipe) => (
                            <RecipeCard 
                                key={recipe.id}
                                name={recipe.name}
                                minutes={recipe.minutes}
                                n_steps={recipe.n_steps}
                                submitted={recipe.submitted}
                                handler = {() => {
                                    window.location = `/recipe/${recipe.id}`
                                }}
                            />
                        )) : null
                    }
                    {
                        this.state.recipesWritten ? <Button style={{marginTop: "20px"}} variant="outline-secondary" onClick={this.nextRecipePage}> More Recipes </Button> : null
                    }
                    
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                <h4>Reviews written by @user_{this.state.id}</h4>
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
                    <br></br>
                </div>
                
            </div>
        )
    }
}

export default UserDetailPage