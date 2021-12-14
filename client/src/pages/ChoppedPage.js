/* Page to search for Chopped episodes by episode & judge name or ingredients
Clicking on episode will show information about episode AND similar recipes to chopped episode
*/
import React from 'react';

import MenuBar from '../components/MenuBar';
import { getAllChopped, getChoppedFromIngredientSearch, getChoppedFromEpisodeSearch } from '../fetcher';
import ChoppedEpisodeCard from '../components/ChoppedEpisodeCard.js';
import ChoppedModal from '../components/ChoppedModal';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

import { Form, FormInput, FormGroup, CardBody, CardTitle, Progress } from "shards-react";

import {
  Container,
  Row,
  Col,
  Stack,
  Image,
  Card,
  Button,
} from 'react-bootstrap';

import {
  Table,
  Pagination,
  Select,
  Divider,
  Slider,
  Switch,
  Rate 
} from 'antd'


class ChoppedPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        choppedResults: [],
        choppedPageNumber: 0,
        choppedPageSize: 10,
        clickedEpisode: -1,
        clickedChoppedEpisode: null,
        choppedSearchTerm: "",
        pagination: null,
        showModal: false,
        ingredientOn: false, // assume we search by guest first
        searched: false,

        // ingredients
        ingredient1: "",
        ingredient2: "",
        ingredient3: "",

        // judges
        judge1: "",
        judge2: "",
        judge3: "",
      }
      this.goToChoppedEpisode = this.goToChoppedEpisode.bind(this)
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleIngredient1Change = this.handleIngredient1Change.bind(this)
      this.handleIngredient2Change = this.handleIngredient2Change.bind(this)
      this.handleIngredient3Change = this.handleIngredient3Change.bind(this)
      this.handleJudge1Change = this.handleJudge1Change.bind(this)
      this.handleJudge2Change = this.handleJudge2Change.bind(this)
      this.handleJudge3Change = this.handleJudge3Change.bind(this)
      this.nextPage = this.nextPage.bind(this)
      this.handleToggleChange = this.handleToggleChange.bind(this)
      this.updateSearchResults = this.updateSearchResults.bind(this)
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
      getAllChopped(this.state.choppedPageNumber, this.state.choppedPageSize).then(res => {
        //console.log(res.results)
        this.setState({ choppedResults: res.results })
        this.setState({ searched: true })
        this.setState({ choppedPageNumber: this.state.choppedPageNumber + 1 })
      })
    }

    handleIngredient1Change(event) {
      this.setState({ ingredient1: event.target.value })
    }

    handleIngredient2Change(event) {
      this.setState({ ingredient2: event.target.value })
    }

    handleIngredient3Change(event) {
      this.setState({ ingredient3: event.target.value })
    }

    handleJudge1Change(event) {
      this.setState({ judge1: event.target.value })
    }

    handleJudge2Change(event) {
      this.setState({ judge2: event.target.value })
    }

    handleJudge3Change(event) {
      this.setState({ judge3: event.target.value })
    }

    handleToggleChange() {
      this.setState({ ingredientOn : !this.state.ingredientOn })
      this.setState({ choppedResults: [] })
      this.setState({ searched : false })
      this.setState({ choppedPageNumber : 0 })
      this.setState({ searched : false })
    }

    nextPage() {
      var newPage = this.state.choppedPageNumber + 1
      console.log(newPage)

      if (this.state.ingredientOn) {
        if (this.state.ingredient1 == '' && this.state.ingredient2 == '' && this.state.ingredient3 == '') {
          // by default just display all chopped episodes
          getAllChopped(this.state.choppedPageNumber, this.state.choppedPageSize).then(res => {
            //console.log(res.results)
            this.setState({ searched : true })
            this.setState({choppedResults: res.results, choppedPageNumber: newPage})
          })
        } else {
          console.log("GOT HERE")
          // search by ingredients
          getChoppedFromIngredientSearch(this.state.ingredient1, this.state.ingredient2, this.state.ingredient3, this.state.choppedPageNumber, this.state.choppedPageSize).then(res => {
            //console.log(res.results)
            this.setState({ searched : true })
            this.setState({choppedResults: res.results, choppedPageNumber: newPage})
          })
        }
      } else {
        if (this.state.judge1 == '' && this.state.judge2 == '' && this.state.judge3 == '') {
          // by default just display all chopped episodes
          getAllChopped(this.state.choppedPageNumber, this.state.choppedPageSize).then(res => {
            //console.log(res.results)
            this.setState({ searched : true })
            this.setState({choppedResults: res.results, choppedPageNumber: newPage})
          })
        } else {
          // search by judges
          getChoppedFromEpisodeSearch(this.state.judge1, this.state.judge2, this.state.judge3, this.state.choppedPageNumber, this.state.choppedPageSize).then(res => {
            //console.log(res.results)
            this.setState({ searched : true })
            this.setState({choppedResults: res.results, choppedPageNumber: newPage})
          })
        }
      }
      
      getAllChopped(this.state.choppedPageNumber, this.state.choppedPageSize).then(res => {
        console.log(res.results)
        this.setState({ searched : true })
        this.setState({choppedResults: res.results, choppedPageNumber: newPage})
      })
    }
  
    updateSearchResults() {
      this.setState({ choppedResults: [] })
      console.log(this)
      if (this.state.ingredientOn) {
        if (this.state.ingredient1 == '' && this.state.ingredient2 == '' && this.state.ingredient3 == '') {
          // by default just display all chopped episodes
          getAllChopped(0, this.state.choppedPageSize).then(res => {
            //console.log(res.results)
            this.setState({ searched : true })
            this.setState({ choppedResults: res.results })
            this.setState({ choppedPageNumber: 0 })
          })
        } else {
          console.log("GOT HERE")
          // search by ingredients
          getChoppedFromIngredientSearch(this.state.ingredient1, this.state.ingredient2, this.state.ingredient3, this.state.choppedPageNumber, this.state.choppedPageSize).then(res => {
            //console.log(res.results)
            this.setState({ searched : true })
            this.setState({ choppedResults: res.results })
            this.setState({ choppedPageNumber: 0 })
          })
        }
      } else {
        if (this.state.judge1 == '' && this.state.judge2 == '' && this.state.judge3 == '') {
          // by default just display all chopped episodes
          getAllChopped(0, this.state.choppedPageSize).then(res => {
            //console.log(res.results)
            this.setState({ searched : true })
            this.setState({ choppedResults: res.results })
            this.setState({ choppedPageNumber: 0 })
          })
        } else {
          // search by judges
          getChoppedFromEpisodeSearch(this.state.judge1, this.state.judge2, this.state.judge3, this.state.choppedPageNumber, this.state.choppedPageSize).then(res => {
            //console.log(res.results)
            this.setState({ searched : true })
            this.setState({ choppedResults: res.results })
            this.setState({ choppedPageNumber: 0 })
          })
        }
      }
    }
  
    render() {
  
      return (
        <div>
          <MenuBar />
          <Image style={{height:'auto',width:'100%'}} src="https://raw.githubusercontent.com/18smlee/Recipe-Database-Project/sam_dev/client/src/images/chopped_logo.jpg" responsive />

          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
              <h3 class="text-center">Inspired By Chopped</h3>
              <hr></hr>
              <p class="text-muted text-center"> Use your favorite chopped moments to find unique recipes to make in your own kitchen!</p>
              <p class="text-muted text-center">
              Enter ingredients you would like to include in your recipe, and we'll find chopped episodes that use those ingredients.
              If there is a match with a recipe in our database and the chopped episode, we'll direct you to similar recipes you can make.
            </p>
            </div>
            
            {
                this.state.showModal ? (<> </>) :
              (<Switch className="d-block mx-auto" checkedChildren="Search by Judges" unCheckedChildren="Search by Ingredients" onChange={this.handleToggleChange}
            />)}

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

            {(this.state.ingredientOn == true) ? (
            <Form style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <div className="container search">
            <Row>
                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>

                {
                this.state.showModal ?( <> </>) : (<FormInput placeholder="Ingredient 1" value={this.state.ingredient1} onChange={this.handleIngredient1Change} />)}
                  </FormGroup>
                </Col>

                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                  {
                this.state.showModal ?( <> </>) : (<FormInput placeholder="Ingredient 2" value={this.state.ingredient2} onChange={this.handleIngredient2Change} />)}
                  </FormGroup>
                </Col>

                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                {
                this.state.showModal ?( <> </>) : (<FormInput placeholder="Ingredient 3" value={this.state.ingredient3} onChange={this.handleIngredient3Change} />)}
                  </FormGroup>
                </Col>
              </Row>
              {
                this.state.showModal ? (<> </>) : (
              <Row justify="center"> 
                <Button block style={{ marginTop: '2vh', span: "40px" }} onClick={this.updateSearchResults}>Search</Button>
              </Row>
                )}
            </div>
            </Form>
          ) : ( 
            <Form style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <div className="container search">
            <Row>
                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                {
                this.state.showModal ?( <> </>) : (<FormInput placeholder="Judge 1" value={this.state.judge1} onChange={this.handleJudge1Change} />)}
                  </FormGroup>
                </Col>
                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                {
                this.state.showModal ?( <> </>) : (<FormInput placeholder="Judge 2" value={this.state.judge2} onChange={this.handleJudge2Change} />)}
                  </FormGroup>
                </Col>
                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                {
                this.state.showModal ?( <> </>) : (<FormInput placeholder="Judge 3" value={this.state.judge3} onChange={this.handleJudge3Change} />)}
                  </FormGroup>
                </Col>
              </Row>
              <Row justify="center"> 
              {
                this.state.showModal ?( <> </>) : (<Button block style={{ marginTop: '2vh', span: "40px" }} onClick={this.updateSearchResults}>Search</Button>)}
              </Row>
            </div>
            </Form>
          ) }
            {
                this.state.showModal ? (<> </>) :
                //change how results look if modal is showing
                (!this.state.choppedResults || this.state.choppedResults.length < 1) ? (
                     <> </>)
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


          
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            {
                ((!this.state.showModal) && (this.state.searched) && this.state.choppedResults.length >= 10) ? (
                <Button onClick={this.nextPage}> More Results </Button>) : (<> </>) }
          </div>
        </div>
      )
    }
  
  }
  
  export default ChoppedPage