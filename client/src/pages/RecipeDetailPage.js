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
} from 'react-bootstrap'

import person_icon from  '../images/logo.png';
import { getRecipe } from '../fetcher';
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
        }
    }

    componentDidMount() {
        
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
                                <p style={{margin:"20px"}}>{this.state.selectedRecipeDetails.ingredients}</p>
                                </div>
                            </Card>
                            <h6 style={{marginTop:"20px"}}>Steps:</h6>
                            <ol>
                                {stringToArray(this.state.selectedRecipeDetails.steps).map((step) => {
                                    return(
                                        <div style={{margin: "10px"}} bg="light"  key={step.id}>
                                            <li key={step.id}>{step}</li>
                                        </div>
                                    );
                                })}
                            </ol>
                        </>)
                    }

                    
                    
                </div>
            </div>
        )
    }
}

export default RecipeDetailPage