/* Page to search for Chopped episodes by episode & judge name or ingredients
Clicking on episode will show information about episode AND similar recipes to chopped episode
*/
import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import SearchBar from '../components/SearchBar';
import { getAllChopped } from '../fetcher';
import ChoppedEpisodeCard from '../components/ChoppedEpisodeCard.js';
import ChoppedModal from '../components/ChoppedModal';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';


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
          <SearchBar placeholder={"Find a Chopped episode"} 
                    errorMsg={"Please enter a Chopped episode number to search for!"}
                    onSubmit={this.handleSearch}
          />
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h1>Find some inspiration!</h1>
            <h3>Chopped Episodes</h3>
            
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