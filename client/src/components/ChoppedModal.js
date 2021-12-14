
import React from "react";
import { getChoppedEpisodeIngredients, getChoppedSimilarRecipes } from '../fetcher';
import {
    Container,
    Row, 
    Col,
    Button,
    Badge
} from "react-bootstrap"

import person_icon from  '../images/logo.png';

class ChoppedModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            episodeNumber: this.props.seriesEpisode,
            choppedEpisode: this.props.choppedEpisode,
            similarRecipes: [],
            episodeIngredients: [],
            pagination: null,
        }
    }

    componentDidMount() {
        getChoppedSimilarRecipes(this.state.episodeNumber).then(res => {
          //console.log(res.results)
          this.setState({ similarRecipes: res.results })
        })

        getChoppedEpisodeIngredients(this.state.episodeNumber).then(res => {
            const ingredientsList = res.results.map((ingr) => ingr.ingredients)
            //console.log(ingredientsList)
            this.setState({ episodeIngredients: ingredientsList})
          })
      }


    render() {
        if (this.props.seriesEpisode == -1) {
            return (
                <div className="modal" style={{ margin: "20px", padding: "20px", position: "fixed", alignItems: "center", justifyContent: "center", left: 0, top: 0 }} onClick={this.props.handleClose}>
                <div className="modal-main" onClick={e => e.stopPropagation()}>
                    <h4>No information for this episode</h4>
                    <button type="button" onClick={this.props.handleClose}>
                        Close
                    </button>
                </div>
                </div>
            );
        } else {
            return (
                <div className="card" style={{ margin: "20px", padding: "20px", alignItems: "center", justifyContent: "center", left: 0, top: 0, right: 0, bottom: 0, width: "600px", height:"40%", display: "flex" }} onClick={this.props.handleClose}>
                  <div className="modal-main" style={{ margin: "10px", width: "500px" }} onClick={e => e.stopPropagation()}>
                  <h2>{this.props.choppedEpisode.episode_name} </h2>
                  <div style={{marginLeft:"20px"}}>
                    <Badge bg="info">Ep. {this.props.seriesEpisode}</Badge>{' '}
                    <Badge bg="light" text="dark">Aired on {this.props.choppedEpisode.air_date}</Badge>{' '}
                  </div>
                      <div>
                      
                        <h6 class="text-center" style={{margin: "25px"}}>Judges</h6>
                        <Container>
                        <Row>
                            <Col>
                            <img className="d-block mx-auto" src="https://raw.githubusercontent.com/18smlee/Recipe-Database-Project/sam_dev/client/src/images/person_icon.png" height="50" width="50"/>
                            </Col>
                            <Col>
                            <img className="d-block mx-auto" src="https://raw.githubusercontent.com/18smlee/Recipe-Database-Project/sam_dev/client/src/images/person_icon.png" height="50" width="50"/>
                            </Col>
                            <Col>
                            <img className="d-block mx-auto" src="https://raw.githubusercontent.com/18smlee/Recipe-Database-Project/sam_dev/client/src/images/person_icon.png" height="50" width="50"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p class="text-center">
                                    {this.props.choppedEpisode.Judge1}
                                </p>
                            </Col>
                            <Col>
                                <p class="text-center">
                                    {this.props.choppedEpisode.Judge2}
                                </p>
                            </Col>
                            <Col>
                                <p class="text-center">
                                    {this.props.choppedEpisode.Judge3}
                                </p>
                            </Col>
                        </Row>
                        </Container>
                      </div>
                      <div>
                        <h6 style={{marginTop: "20px"}}>Ingredients</h6>
                        <ul>
                         {this.state.episodeIngredients.map((ingr, ind) => {
                             return(<li key={ind}>{ingr}</li>);
                         })}
                        </ul>
                      </div>
                      <div>
                        {this.state.similarRecipes.length > 0 ? 
                        (         
                            <div>
                                <h6>Similar Recipes</h6>
                                    {this.state.similarRecipes.map((rec) => {
                                        var url = "/recipes/" + rec.id
                                        return(
                                            <Badge style={{margin: "10px"}} bg="light" key={rec.id} >
                                                <a href={url}>{rec.name}</a>
                                            </Badge>
                                        );
                                    })}
                            </div>               
                        ) 
                        : 
                        (<></>)
                        }
                      </div>
                      <Button style={{marginTop: "20px"}} variant="secondary" onClick={this.props.handleClose}>
                          Close
                      </Button>
                  </div>
                </div>
              );
        }
    }
}


export default ChoppedModal;