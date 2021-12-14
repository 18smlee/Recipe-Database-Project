/* Page to show details about recipe (ingredients, name, steps, reviews(?))
Button to click that will show chopped episode likelihood in a modal 
 */
import React from 'react';
import {
  Table,
  Pagination,
  Select, 
  Rate,
} from 'antd'

import {
    Card,
    Container,
    Row,
    Col,
    Badge
} from 'react-bootstrap'

import person_icon from  '../images/logo.png';
import { getRecipe, getRecipeChoppedLikelihood, getRecipeIngredients } from '../fetcher';
import MenuBar from '../components/MenuBar';

function capitalizeFirstLetters(string) {
    return string.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function capitalizeAfterPeriods(string) {
    var firstLetterCap = string.charAt(0).toUpperCase() + string.slice(1);
    return firstLetterCap.replace(/([.\?]\s+)(.)/g, function(data) {
        return data.toUpperCase();
     });
    
}

function stringToArray(string) {
    var finalString = string.replace("['", '');
    finalString = finalString.replace("']", '');
    const words = finalString.split("',");
    
    const finalWords = [];
    
    for (var word of words) {
        word = word.trim();
        
        if (word[0] == "'") {
            word = word.substring(1)
        }
        
        finalWords.push(capitalizeAfterPeriods(word));
    }
    return finalWords;
}

class RecipeDetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRecipeId: window.location.pathname.split('/')[2],
            selectedRecipeDetails: null,
            selectedRecipeIngredients: [],
            selectedRecipeIngrChoppedDetails: null
        }
    }

    componentDidMount() {
        Promise.all([
            getRecipe(this.state.selectedRecipeId),
            getRecipeChoppedLikelihood(this.state.selectedRecipeId),
            getRecipeIngredients(this.state.selectedRecipeId)
        ]).then(([res1, res2, res3]) => {
            console.log(res1)
            console.log(res2)
            console.log(res3)
            const recipeIngrs = res2.results.map((result) => result.ingredients)
            // const recipeIngrs = res3.results
            // console.log(recipeIngrs)
            this.setState({ selectedRecipeDetails: res1.results[0], selectedRecipeIngredients: recipeIngrs, selectedRecipeIngrChoppedDetails: res2.results})
        })
        // getRecipe(this.state.selectedRecipeId).then(res => {
        //     console.log(res.results)
        //     this.setState({ selectedRecipeDetails: res.results[0]})
        // })
    }

    render() {
        return (

            <div>
                <MenuBar />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    {
                        !this.state.selectedRecipeDetails ? (<>No recipe exists </>) :
                        (<>
                            <h1>{capitalizeFirstLetters(this.state.selectedRecipeDetails.name)}</h1>
                            <Rate disabled value={this.state.selectedRecipeDetails.avg_rating}></Rate>
                            <p style={{marginTop:"20px"}}>{capitalizeAfterPeriods(this.state.selectedRecipeDetails.description)}</p>
                            
                            <div style={{marginTop:"30px"}}>
                                <img style={{verticalAlign: 'middle'}} src="https://raw.githubusercontent.com/18smlee/Recipe-Database-Project/sam_dev/client/src/images/person_icon.png" height="40" width="40"/>
                                <p style={{verticalAlgin: 'middle', display:'inline', marginLeft:'15px'}}>By @user_{this.state.selectedRecipeDetails.contributor_id}</p>
                            </div>

                            <Card style={{marginTop:"20px"}}>
                                <div style={{margin:"20px"}}>
                                <h6>Ingredients:</h6>
                                <ul>
                                    {/* {(this.state.selectedRecipeIngredients).map((ingredient) => {
                                            return(
                                                <div style={{margin: "10px"}} bg="light">
                                                    <li key={ingredient.id}>{ingredient}</li>
                                                </div>
                                            );
                                        })} */}
                                </ul>
                                <p style={{margin:"20px"}}>{this.state.selectedRecipeDetails.ingredients}</p>
                                </div>
                            </Card>
                            <h6 style={{marginTop:"20px"}}>Directions:</h6>
                            <ol>
                                {stringToArray(this.state.selectedRecipeDetails.steps).map((step) => {
                                    return(
                                        <div style={{margin: "10px"}} bg="light"  key={step.id}>
                                            <li key={step.id}>{step}</li>
                                        </div>
                                    );
                                })}
                            </ol>
                            <hr></hr>
                            <Container style={{marginBottom:"60px"}}>
                                    <div style={{margin:"20px"}}>
                                        <h3 class="text-center">Nutrition Facts</h3>
                                    
                                        <div>
                                            {
                                                (this.state.selectedRecipeDetails.protein == null) ? (<></>) :
                                                (<>
                                                    <Badge bg="primary">protein {this.state.selectedRecipeDetails.protein}g</Badge> {' '}
                                                </>)
                                            }
                                            {
                                                (this.state.selectedRecipeDetails.sat_fat == null) ? (<></>) :
                                                (<>
                                                    <Badge bg="primary">sat fat {this.state.selectedRecipeDetails.sat_fat}g</Badge> {' '}
                                                </>)
                                            }
                                            {
                                                (this.state.selectedRecipeDetails.sodium == null) ? (<></>) :
                                                (<>
                                                    <Badge bg="primary">sodium {this.state.selectedRecipeDetails.sodium}g</Badge> {' '}
                                                </>)
                                            }
                                            {
                                                (this.state.selectedRecipeDetails.sugar == null) ? (<></>) :
                                                (<>
                                                    <Badge bg="primary">sugar {this.state.selectedRecipeDetails.sugar}g</Badge> {' '}
                                                </>)
                                            }
                                            {
                                                (this.state.selectedRecipeDetails.total_fat == null) ? (<></>) :
                                                (<>
                                                    <Badge bg="primary">total_fat {this.state.selectedRecipeDetails.total_fat}g</Badge> {' '}
                                                </>)
                                            }

                                            <h6 style={{marginTop: "20px"}}>Total Calories : {this.state.selectedRecipeDetails.num_calories}kCal</h6>
                                            
                                        </div>
                                    </div>
                            </Container>
                            <Row></Row>
                        </>)
                    }
                </div>
            </div>
        )
    }
}

export default RecipeDetailPage