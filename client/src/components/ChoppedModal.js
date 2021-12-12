
import React from "react";
import { getChoppedEpisodeIngredients, getChoppedSimilarRecipes } from '../fetcher';

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
          console.log(res.results)
          this.setState({ similarRecipes: res.results })
        })

        getChoppedEpisodeIngredients(this.state.episodeNumber).then(res => {
            const ingredientsList = res.results.map((ingr) => ingr.ingredients)
            console.log(ingredientsList)
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
                  <div className="modal-main" style={{ margin: "20px", width: "500px" }} onClick={e => e.stopPropagation()}>
                      <h4>{this.props.seriesEpisode} : {this.props.choppedEpisode.episode_name} </h4>
                      <h5>{this.props.choppedEpisode.air_date}</h5>
                      <div>
                        <h6>Judges</h6>
                        <ol>
                          <li key={1}>{this.props.choppedEpisode.Judge1}</li>
                          <li key={2}>{this.props.choppedEpisode.Judge2}</li>
                          <li key={3}>{this.props.choppedEpisode.Judge3}</li>
                        </ol>
                      </div>
                      <div>
                        <h6>Ingredients</h6>
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
                                <ul>
                                    {this.state.similarRecipes.map((rec) => {
                                        var url = "/recipes/" + rec.id
                                        return(<li key={rec.id}><a href={url}>{rec.name}</a></li>);
                                    })}
                                </ul>
                            </div>               
                        ) 
                        : 
                        (<></>)
                        }
                      </div>
                      <button type="button" onClick={this.props.handleClose}>
                          Close
                      </button>
                  </div>
                </div>
              );
        }
    }
}


export default ChoppedModal;