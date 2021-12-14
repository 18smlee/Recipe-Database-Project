/* Page to search for Chopped episodes by episode & judge name or ingredients
Clicking on episode will show information about episode AND similar recipes to chopped episode
*/
import React from 'react';

import MenuBar from '../components/MenuBar';
import { getAllChopped } from '../fetcher';
import ChoppedEpisodeCard from '../components/ChoppedEpisodeCard.js';
import ChoppedModal from '../components/ChoppedModal';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

import {
  Container,
  Row,
  Col,
  Stack,
  Button,
  Image,
  Card,
} from 'react-bootstrap';


class ChoppedPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        choppedResults: [],
        choppedPageNumber: 1,
        choppedPageSize: 10,
        clickedEpisode: -1,
        clickedChoppedEpisode: null,
        choppedSearchTerm: "",
        pagination: null,
        showModal: false
      }
      this.goToChoppedEpisode = this.goToChoppedEpisode.bind(this)
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }
  
  
    goToChoppedEpisode(choppedEpisodeId) {
      window.location = `/chopped?id=${choppedEpisodeId}`
    }

    showModal() {
        console.log("hi")
        this.setState({ showModal: true })
    }

    hideModal() {
        this.setState({ showModal: false })
    }

    handleSearch(searchTerm) {
        console.log("search")
        console.log(searchTerm)
        this.setState({ choppedSearchTerm: searchTerm })
    }
    
    componentDidMount() {
      getAllChopped().then(res => {
        //console.log(res.results)
        this.setState({ choppedResults: res.results })
      })
    }
  
  
    render() {
  
      return (
        <div>
          <MenuBar />
          <Image style={{height:'auto',width:'100%'}} src="https://raw.githubusercontent.com/18smlee/Recipe-Database-Project/sam_dev/client/src/images/chopped_logo.jpg" responsive />

          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h1>Find some inspiration</h1>
            <p class="text-left">
              Use your favorite chopped moments to find unique recipes to make in your own kitchen!
            </p>
            <p class="text-left">
              Enter ingredients you would like to include in your recipe, and we'll find chopped episodes that use those ingredients.
              If there is a match with a recipe in our database and the chopped episode, we'll direct you to similar recipes you can make.
            </p>

            <div className="col-md-5">
          </div>
            {/* <h3 style={{margin:"30px"}}>Chopped Episodes</h3> */}
            <div style={{ width: "50%", marginBottom: "50px" }}>
                {this.state.showModal ? (
                    <ChoppedModal handleClose = {this.hideModal} seriesEpisode={this.state.clickedEpisode} choppedEpisode={this.state.clickedChoppedEpisode} />
                ) : (
                    <> </>
                )}
            </div>
            {
                this.state.showModal ? (<> </>) :
                //change how results look if modal is showing
                (!this.state.choppedResults || this.state.choppedResults.length < 1) ? (
                     <>Oops... There's no matches.</>)
                :
                this.state.choppedResults.map((choppedEpisode) => (
                    <ChoppedEpisodeCard
                      key={choppedEpisode.series_episode}
                      id={choppedEpisode.series_episode}
                      episodeName={choppedEpisode.episode_name}
                      airDate={choppedEpisode.air_date}
                      seriesEpisode={choppedEpisode.series_episode}
                      modalFunc = {() => {
                          this.setState({ showModal: true });
                          this.setState({ clickedEpisode: choppedEpisode.series_episode });
                          this.setState({ clickedChoppedEpisode: choppedEpisode });
                        }
                      }/>
                ))
            }
          </div>
          
        </div>
      )
    }
  
  }
  
  export default ChoppedPage